$(function () {

    


    // websocket variable.
    var websocket = NaN
    // count failed attempts
    var websocket_fail_count = 0
    // to limit failed reconnection attempts, set this to a number.
    var websocket_fail_limit = NaN
    // to offer more or less space between reconnection attempts, set this interval in miliseconds.
    var websocket_reconnect_interval = 250
    // ping-pong to keep connection alive
    var ping_msg = 'ping', ping_interval = null, missed_pings = 0;
    // current selected page
    var current_page = NaN;

    function RemovePadding(str) {
        return str.replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
    }

    function b64EncodeUnicode(str) {
        // first we use encodeURIComponent to get percent-encoded UTF-8,
        // then we convert the percent encodings into raw bytes which
        // can be fed into btoa.
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    }

    function b64DecodeUnicode(str) {
        // Going backwards: from bytestream, to percent-encoding, to original string.
        return decodeURIComponent(atob(str).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));
    }

    function init_websocket() {


        // check login status before attempting websocket connection
        $.get("procedures/logged_status.php", function (returnCode) {

            if (returnCode == 1) {

                if (websocket && websocket.readyState == 1) return true; // no need to renew socket connection

                $('#connection_status').css({ "color": "#F39C12" });
                $("#connection_status").html('Connecting to server...');

                // check if session still active with personal ID and hash
                if (sessionStorage.getItem("UID") === null || sessionStorage.getItem("hash") === null) {
                    $(location).attr("href", "procedures/logout.php");
                    return true;
                }

                // connect and attempt to authenticate through websocket
                websocket = new WebSocket("wss://warbandmatchmaking.com:5005/sgc/auth/url/" + sessionStorage.getItem("UID") + "/" + window.btoa(sessionStorage.getItem("hash")));
                websocket.onopen = function (e) {


                    // keep connection alive
                    if (ping_interval === null) {
                        missed_pings = 0;
                        ping_interval = setInterval(function () {
                            try {
                                missed_pings++;
                                if (missed_pings >= 3)
                                    throw new Error("Too many missed pings.");
                                websocket.send(ping_msg);
                            } catch (e) {
                                clearInterval(ping_interval);
                                ping_interval = null;
                                websocket.close();
                            }
                        }, 5000);
                    }

                    // reset the count.
                    websocket_fail_count = 0;

                    //$("#connection_img").attr("src","dist/img/connected.gif").css({'opacity':0}).animate({'opacity':1});
                    $('#connection_status').css({ "color": "#00A65A" });
                    $("#connection_status").html('<span>Connected</span>');

                    connectedSound.play();
                    sessionStorage.setItem("gamemode", "12");

                };

                websocket.onclose = function (e) {
                    //  reopen the websocket if it closes
                    if (!isNaN(websocket_fail_limit) && websocket_fail_count >= websocket_fail_limit) {
                        return
                    };
                    //  reopen the websocket if it closes.
                    if (isNaN(websocket_fail_limit) || (websocket_fail_count <= websocket_fail_limit)) {
                        // update the count
                        websocket_fail_count += 1;
                        // try to reconnect
                        setTimeout(init_websocket(), websocket_reconnect_interval);
                    };
                    //$("#connection_img").attr("src","dist/img/disconnected.gif").css({'opacity':0}).animate({'opacity':1});;
                    $('#connection_status').css({ "color": "#DD4B39" });
                    $("#connection_status").html('<span>Connection closed:</span> ' + e.code);
                };
                websocket.onerror = function (e) {
                    // update the count.
                    websocket_fail_count += 1

                    //$("#connection_img").attr("src","dist/img/disconnected.gif").css({'opacity':0}).animate({'opacity':1});;
                    $('#connection_status').css({ "color": "#DD4B39" });
                    $("#connection_status").html('<span>Connection closed:</span> ' + e.code);
                };
                websocket.onmessage = function (e) {

                    var return_msg = e.data.split(":");
                    var chat_msg;

                    // check ping-pong message
                    if (return_msg[0] === ping_msg) {


                        if ($("#online_users").length) {
                            //$("#online_users").html(return_msg[1] + " <small>ONLINE USERS</small>");
                            $("#online_users").load("templates/online_users.php");
                        }

                        if ($("#chat_users").length) {
                            $("#chat_users").html(return_msg[1] + " <small>USERS</small>");
                        }

                        // reset the counter for missed pings
                        missed_pings = 0;
                        return;    
                    }


                    if (return_msg[0] === "chatmsg") {

                        chat_msg = e.data.slice(return_msg[0].length + return_msg[1].length + return_msg[2].length + return_msg[3].length + return_msg[4].length + 5);
                    }

                    if (return_msg[0] === "canjoinlobby" || return_msg[0] === "matchstarted" || return_msg[0] === "canexitlobby" || return_msg[0] === "updatequeue") {

                        $("#wbmm_lobby_status").load("templates/players_count.php").css({ 'opacity': 0 }).animate({ 'opacity': 1 });

                        if (return_msg[0] === "canjoinlobby" || current_page === "wbmm_play") {

                            $.ajax({
                                url: "templates/play.php",
                                type: "POST",
                                data: {
                                    gamemode: sessionStorage.getItem("gamemode")
                                }
                            }).done(function (response) {


                                if (return_msg[0] === "matchstarted") {

                                    // Update lobby status menu
                                    $("#wbmm_lobby_status").removeClass().addClass('glow-text-green hidden-xs');
                                    $('#wbmm_lobby_status').css({ "color": "#00AE5C" });


                                } else {

                                    // Update lobby status menu
                                    $("#wbmm_lobby_status").removeClass().addClass('hidden-xs');
                                    $('#wbmm_lobby_status').css({ "color": "#FFFFFF" });

                                }

                                // Choosing class element fix
                                if ($("#class_type")[0]) {

                                    if (($("#class_type").css('display') == 'none')) {
                                        $("#content").html(response);
                                        selectPage('wbmm_play');
                                    }

                                } else {
                                    $("#content").html(response);
                                    selectPage('wbmm_play');
                                }

                            });
                        }


                    } else if (return_msg[0] === "updatematchtimer") {


                        if (return_msg[1] == '30') {
                            var rand = Math.floor(Math.random() * acceptSoundSrc.length);
                            acceptSound.src = acceptSoundSrc[rand];
                            acceptSound.play();

                            // Update lobby status menu
                            $("#wbmm_lobby_status").removeClass().addClass('glow-text-yellow hidden-xs');
                            $('#wbmm_lobby_status').css({ "color": "#F49C12" });

                            $("#content").load("templates/play.php", function () {

                                selectPage('wbmm_play');

                            }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
                        }

                        if ($("#lobby_status")[0]) {
                            $("#lobby_status").html("<h2>YOU HAVE " + return_msg[1] + " SECONDS LEFT TO ACCEPT THE MATCH</h2>");
                            $('#lobby_status').css({ "color": "#DD4B39" });
                        }


                    } else if (return_msg[0] === "updatepicktimer") {

                        if ((return_msg[2] == '20' || return_msg[2] == '30') && (return_msg[3] == '1'))
                            chimeSound.play();

                        if ($("#lobby_status")[0]) {
                            $("#lobby_status").html('<h4><span class="glow-text-green"  style="font-weight:900;color:#00A65A;"><b>' + return_msg[1] + '</b> is picking now (' + return_msg[2] + 's left)</span></h4>');
                        }


                    } else if (return_msg[0] === "requeue") {

                        websocket.send(window.btoa("joinlobby:" + sessionStorage.getItem("gamemode")));

                    } else if (return_msg[0] === "announcementnotify") {

                        var notificationMsg = return_msg[1];

                        $.ajax({
                            url: "templates/notification.php",
                            type: "POST",
                            data: {
                                type: "announcementnotification",
                                message: notificationMsg
                            }
                        }).done(function (response) {

                            // update notification counter
                            $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) + 1)

                            var oldNotifications = $('#wbmm_notifications').html();

                            // append notification
                            $('#wbmm_notifications').html(response + oldNotifications);

                            // show notification menu
                            if ($('#notifications_menu').find('.dropdown-menu').is(":hidden")) {
                                $('#notifications_toggle').dropdown('toggle');
                            }

                            notificationSound.play();

                        });

                    } else if (return_msg[0] === "reportnotify") {

                        var notificationMsg = return_msg[1];

                        $.ajax({
                            url: "templates/notification.php",
                            type: "POST",
                            data: {
                                type: "reportnotification",
                                message: notificationMsg
                            }
                        }).done(function (response) {

                            // update notification counter
                            $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) + 1)

                            var oldNotifications = $('#wbmm_notifications').html();

                            // append notification
                            $('#wbmm_notifications').html(response + oldNotifications);

                            // show notification menu
                            if ($('#notifications_menu').find('.dropdown-menu').is(":hidden")) {
                                $('#notifications_toggle').dropdown('toggle');
                            }

                            notificationSound.play();

                        });

                    } else if (return_msg[0] === "warnnotify") {

                        var notificationMsg = return_msg[1];

                        $.ajax({
                            url: "templates/notification.php",
                            type: "POST",
                            data: {
                                type: "warnnotification",
                                message: notificationMsg
                            }
                        }).done(function (response) {

                            // update notification counter
                            $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) + 1)

                            var oldNotifications = $('#wbmm_notifications').html();

                            // append notification
                            $('#wbmm_notifications').html(response + oldNotifications);

                            // show notification menu
                            if ($('#notifications_menu').find('.dropdown-menu').is(":hidden")) {
                                $('#notifications_toggle').dropdown('toggle');
                            }

                            adminSound.play();

                        });

                    } else if (return_msg[0] === "mutenotify") {

                        var notificationMsg = return_msg[1];

                        $.ajax({
                            url: "templates/notification.php",
                            type: "POST",
                            data: {
                                type: "mutenotification",
                                message: notificationMsg
                            }
                        }).done(function (response) {

                            // update notification counter
                            $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) + 1)

                            var oldNotifications = $('#wbmm_notifications').html();

                            // append notification
                            $('#wbmm_notifications').html(response + oldNotifications);

                            // show notification menu
                            if ($('#notifications_menu').find('.dropdown-menu').is(":hidden")) {
                                $('#notifications_toggle').dropdown('toggle');
                            }

                            adminSound.play();

                        });

                    } else if (return_msg[0] === "namenotify") {

                        var notificationMsg = return_msg[1];

                        $.ajax({
                            url: "templates/notification.php",
                            type: "POST",
                            data: {
                                type: "changenotification",
                                message: notificationMsg
                            }
                        }).done(function (response) {

                            // update notification counter
                            $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) + 1)

                            var oldNotifications = $('#wbmm_notifications').html();

                            // append notification
                            $('#wbmm_notifications').html(response + oldNotifications);

                            // show notification menu
                            if ($('#notifications_menu').find('.dropdown-menu').is(":hidden")) {
                                $('#notifications_toggle').dropdown('toggle');
                            }

                            notificationSound.play();

                        });

                    } else if (return_msg[0] === "bannotify") {

                        var notificationMsg = return_msg[1];

                        $.ajax({
                            url: "templates/notification.php",
                            type: "POST",
                            data: {
                                type: "bannotification",
                                message: notificationMsg
                            }
                        }).done(function (response) {

                            // update notification counter
                            $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) + 1)

                            var oldNotifications = $('#wbmm_notifications').html();

                            // append notification
                            $('#wbmm_notifications').html(response + oldNotifications);

                            // show notification menu
                            if ($('#notifications_menu').find('.dropdown-menu').is(":hidden")) {
                                $('#notifications_toggle').dropdown('toggle');
                            }

                            adminSound.play();

                        });

                    } else if (return_msg[0] === "friendinvite") {

                        var friendName = return_msg[1];
                        var gameMode = return_msg[2];

                        $.ajax({
                            url: "templates/notification.php",
                            type: "POST",
                            data: {
                                type: "friendinvite",
                                friendname: friendName,
                                gamemode: gameMode
                            }
                        }).done(function (response) {

                            // update notification counter
                            $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) + 1)

                            var oldNotifications = $('#wbmm_notifications').html();

                            // append notification
                            $('#wbmm_notifications').html(response + oldNotifications);

                            // show notification menu
                            if ($('#notifications_menu').find('.dropdown-menu').is(":hidden")) {
                                $('#notifications_toggle').dropdown('toggle');
                            }


                            invitationSound.play();

                            //remove notification after a small period of time
                            setTimeout(function () {

                                if ($('#' + friendName).length) {
                                    $('#' + friendName).remove();
                                    $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) - 1);

                                }

                            }, 10000);


                        });


                    } else if (return_msg[0] === "friendrequest") {

                        var friendName = return_msg[1];

                        $.ajax({
                            url: "templates/notification.php",
                            type: "POST",
                            data: {
                                type: "friendrequest",
                                friendname: friendName
                            }
                        }).done(function (response) {

                            // update notification counter
                            $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) + 1)

                            var oldNotifications = $('#wbmm_notifications').html();

                            // append notification
                            $('#wbmm_notifications').html(response + oldNotifications);

                            // show notification menu
                            if ($('#notifications_menu').find('.dropdown-menu').is(":hidden")) {
                                $('#notifications_toggle').dropdown('toggle');
                            }

                            friendSound.play();

                        });


                    } else if (return_msg[0] === "achievementnotify") {

                        var achievementType = return_msg[1];

                        if (achievementType === "early_kill")
                            achievementSound.src = achievementSoundSrc[0];
                        else
                            achievementSound.src = achievementSoundSrc[1];

                        achievementSound.play();

                    } else if (return_msg[0] === "chatmsg") {

                        $.ajax({
                            url: "templates/chat.php",
                            type: "POST",
                            data: {
                                region: return_msg[1],
                                name: return_msg[2],
                                rank: return_msg[3],
                                action: return_msg[4],
                                message: chat_msg
                            }
                        }).done(function (response) {

                            var oldMessages = $('#wbmm_chat').html();

                            // append chat message
                            $('#wbmm_chat').html(response + oldMessages);

                            if (return_msg[2] == 'server') {
                                if ($("#servers_count").length) {
                                    $("#servers_count").load("templates/active_matches.php");
                                }
                            }

                            if (return_msg[3] !== 'wbmm_icon' && clickSound.muted === false)
                                clickSound.play();
                            else if (return_msg[4] === 'playerkicked' && clickSound.muted === false)
                                kickedSound.play();
                            else if (return_msg[4] === 'matchcancelled' && clickSound.muted === false)
                                cancelledSound.play();
                            else if (return_msg[4] === 'matchended' && clickSound.muted === false)
                                endedSound.play();
                            else if (return_msg[4] === 'matchstarted' && clickSound.muted === false)
                                startedSound.play();

                        });

                    } else if (return_msg[0] === "requestfriendinvite") {


                        $('#modal_title').html("Friend invite");
                        $('#modal_status').html("<b>" + return_msg[2] + "</b>");

                        if (return_msg[1] === "1") {

                            $('#modal_status').css({ "color": "#00A65A" });
                            $('#wbmm_modal').modal('show');

                        } else {

                            $('#modal_status').css({ "color": "#DD4B39" });
                            $('#wbmm_modal').modal('show');
                        }

                    } else if (return_msg[0] === "unpairfriend") {


                        $('#modal_title').html("Unpair friend");
                        $('#modal_status').html("<b>" + return_msg[2] + "</b>");

                        if (return_msg[1] === "1") {

                            $('#modal_status').css({ "color": "#00A65A" });

                            if (current_page === 'wbmm_friends') {

                                $("#content").load("templates/friends.php", function () {

                                    $('#wbmm_modal').modal('show');

                                }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

                            } else if (current_page === 'wbmm_play') {

                                $("#content").load("templates/play.php", function () {

                                    selectPage('wbmm_play');

                                    $('#wbmm_modal').modal('show');

                                }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
                            }

                        } else {

                            $('#modal_status').css({ "color": "#DD4B39" });
                            $('#wbmm_modal').modal('show');
                        }

                    } else if (return_msg[0] === "addfriend") {

                        $('#modal_title').html("Add friend");
                        $('#modal_status').html("<b>" + return_msg[2] + "</b>");

                        if (return_msg[1] === "1") {


                            $("#content").load("templates/friends.php", function () {

                                $('#modal_status').css({ "color": "#00A65A" });
                                $('#wbmm_modal').modal('show');

                            }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

                        } else {

                            $('#modal_status').css({ "color": "#DD4B39" });
                            $('#wbmm_modal').modal('show');
                        }

                    } else if (return_msg[0] === "acceptfriendinvite") {

                        $('#modal_title').html("Friend invite");
                        $('#modal_status').html("<b>" + return_msg[2] + "</b>");
                        if (return_msg[1] === "1") {

                            $('#modal_status').css({ "color": "#00A65A" });
                            $('#wbmm_modal').modal('show');

                        } else {

                            $('#modal_status').css({ "color": "#DD4B39" });
                            $('#wbmm_modal').modal('show');
                        }

                    } else if (return_msg[0] === "joinlobby") {

                        $('#modal_title').html("Matchmaking");
                        $('#modal_status').html("<b>" + return_msg[2] + "</b>");
                        if (return_msg[1] === "1") {

                            $('#modal_status').css({ "color": "#00A65A" });
                            $('#wbmm_modal').modal('show');

                        } else {

                            $('#modal_status').css({ "color": "#DD4B39" });
                            $('#wbmm_modal').modal('show');
                        }

                    } else if (return_msg[0] === "report") {

                        $('#modal_title').html("Report player");
                        $('#modal_status').html("<b>" + return_msg[2] + "</b>");

                        if (return_msg[1] === "1") {


                            $("#content").load("templates/home.php", function () {

                                $('#modal_status').css({ "color": "#00A65A" });
                                $('#wbmm_modal').modal('show');

                            }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
                        } else {

                            $('#modal_status').css({ "color": "#DD4B39" });
                            $('#wbmm_modal').modal('show');

                        }


                    } else if (return_msg[0] === "adminpanel") {

                        $('#modal_title').html("Administer");
                        $('#modal_status').html("<b>" + return_msg[2] + "</b>");

                        if (return_msg[1] === "1") {


                            $("#content").load("templates/admin_users.php", function () {

                                $('#modal_status').css({ "color": "#00A65A" });
                                $('#wbmm_modal').modal('show');

                            }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
                        } else {

                            $('#modal_status').css({ "color": "#DD4B39" });
                            $('#wbmm_modal').modal('show');

                        }

                    }
                };
            }

        });
    }


    // setup the websocket connection once the page is done loading
    window.addEventListener("load", init_websocket(), true);

    function selectPage(page) {
        current_page = page;

        $(".sidebar-menu li").removeClass("active");
        $(".sidebar-menu li").find('#' + page).parent("li").addClass('active');

        if (page == "wbmm_play") {


            if ($(".modal-backdrop").length) {
                $("body").removeClass("modal-open");
                $('.modal-backdrop').remove();
            }
            if ($(".slick-maps").length) {

                $('#content').css('background-image', 'url(dist/img/wbmm_bg.png)');
                $('input[name=match_timer]').val('false');

            }

            if (sessionStorage.getItem("gamemode") > 6) {
                $("#groupfight_gamemode").removeClass('active');
                $("#battle_gamemode").addClass('active');
            } else {
                $("#battle_gamemode").removeClass('active');
                $("#groupfight_gamemode").addClass('active');
            }

        } else
            $('#content').css('background-image', 'url(dist/img/wbmm_bg.png)');
    }

    $(document).on('click', '#wbmm_register', function (e) {
        e.preventDefault();

        $("#content").load("templates/register.php", function () {

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#wbmm_login', function (e) {
        e.preventDefault();

        $("#content").load("templates/login.php", function () {

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('submit', '#wbmm_register_form', function (e) {
        e.preventDefault();

        var post_url = $(this).attr("action");
        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: post_url,
            type: request_method,
            data: form_data
        }).done(function (response) {
            var returnCode = response.split(":"); // result : message

            if (returnCode[0] == 0) {

                $('#wbmm_register_status').css({ "color": "#DD4B39" });
                $('#wbmm_register_status').html(returnCode[1]);

            } else if (returnCode[0] == 1) {

                $("#content").load("templates/login.php", function () {

                    $('#wbmm_login_status').css({ "color": "#00A65A" });
                    $('#wbmm_login_status').html(returnCode[1]);

                }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

            }

        });

        return false;
    });


    $(document).on('submit', '#wbmm_login_form', function (e) {
        e.preventDefault();

        var post_url = $(this).attr("action");
        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: post_url,
            type: request_method,
            data: form_data
        }).done(function (response) {
            var returnCode = response.split(":"); // result : message


            // returnCode 0 = Login failed | returnCode 1 = Login success
            if (returnCode[0] == 0) {
                $('#wbmm_login_status').css({ "color": "#DD4B39" });
                $('#wbmm_login_status').html("<b>" + returnCode[1] + "</b>").css({ 'opacity': 0 }).animate({ 'opacity': 1 });
            } else if (returnCode[0] == 1) {
                $('#wbmm_login_status').css({ "color": "#00A65A" });
                $('#wbmm_login_status').html("<b>Authentication successful!</b>").css({ 'opacity': 0 }).animate({ 'opacity': 1 });

                sessionStorage.setItem("UID", returnCode[1]);
                sessionStorage.setItem("hash", returnCode[3]);

                // Load profile page
                setTimeout(function () {
                    location.reload();
                }, 2000);

            }

        });

        return false;
    });

    $(document).on('submit', '#poll_post', function (e) {
        e.preventDefault();

        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: "procedures/poll.php", //admin_search
            type: "POST",
            data: form_data
        }).done(function (response) {

            $("#content").load("templates/home.php", function () {

                selectPage('wbmm_home');

                $('#rank-system-box').boxWidget({
                    animationSpeed: 300,
                    collapseTrigger: '#rank-system-collapse-button',
                    collapseIcon: 'fa-minus',
                    expandIcon: 'fa-plus'
                })

            }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        });

        return false;
    });

    $(document).on('click', '#view_profile_leaderboard', function (e) {
        e.preventDefault();

        var UID = $(this).find('input[name="playeruid"]').val();

        $.ajax({
            url: "templates/view_profile.php",
            type: "POST",
            data: {
                playeruid: UID
            }
        }).done(function (response) {

            $('#profile_modal_title').html("Player profile");
            $("#profile_modal_content").html(response);
            $('#wbmm_profile_modal').modal('show');

        });

        return false;
    });


    $(document).on('submit', '#kick_player', function (e) {
        e.preventDefault();

        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: "procedures/admin/remotecommand.php",
            type: "POST",
            data: form_data + '&type=kick'
        }).done(function (response) {

            $('#modal_title').html("Remote Command");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;
    });


    $(document).on('click', '#ban_player', function (e) {
        e.preventDefault();

        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: "procedures/admin/remotecommand.php",
            type: "POST",
            data: form_data + '&type=ban'
        }).done(function (response) {

            $('#modal_title').html("Remote Command");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;
    });

    $(document).on('click', '#mute_player', function (e) {
        e.preventDefault();

        //var UID = $(this).closest("div").find('input[name="playeruid"]').val();
        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: "procedures/admin/remotecommand.php",
            type: "POST",
            data: form_data + '&type=mute'
            /*data: {
              playeruid: UID,
              type: "mute"
            }*/
        }).done(function (response) {

            $('#modal_title').html("Remote Command");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;
    });


    $(document).on('click', '#admin_cancel_match', function (e) {
        e.preventDefault();

        var LobbyID = $(this).closest("div.btn-group").find('input[name="lobbyid"]').val();

        $.ajax({
            url: "procedures/admin/remotecommand.php",
            type: "POST",
            data: {
                type: "CANCEL",
                lobbyid: LobbyID
            }
        }).done(function (response) {

            $('#modal_title').html("Remote Command");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;
    });


    $(document).on('click', '#admin_finish_match', function (e) {
        e.preventDefault();

        var LobbyID = $(this).closest("div.btn-group").find('input[name="lobbyid"]').val();

        $.ajax({
            url: "procedures/admin/remotecommand.php",
            type: "POST",
            data: {
                type: "FINISH",
                lobbyid: LobbyID
            }
        }).done(function (response) {

            $('#modal_title').html("Remote Command");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;
    });

    $(document).on('click', '#admin_change_map', function (e) {
        e.preventDefault();

        var Map = prompt("Please enter the map name.", "");
        var LobbyID = $(this).closest("div.btn-group").find('input[name="lobbyid"]').val();

        $.ajax({
            url: "procedures/admin/remotecommand.php",
            type: "POST",
            data: {
                type: "MAPCHANGE",
                map: Map,
                lobbyid: LobbyID
            }
        }).done(function (response) {

            $('#modal_title').html("Remote Command");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;
    });


    // Queue - START -

    $(document).on('click', '#battle_gamemode', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/gamemode.php",
            type: "POST",
            data: {
                gamemode: "battle",
            }
        }).done(function (response) {
            $("#gamemode_settings").html(response);
            $("#groupfight_gamemode").removeClass('active');
            $("#battle_gamemode").addClass('active');
        });

        sessionStorage.setItem("gamemode", "12");

        return false;
    });

    $(document).on('click', '#groupfight_gamemode', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/gamemode.php",
            type: "POST",
            data: {
                gamemode: "groupfight",
            }
        }).done(function (response) {
            $("#gamemode_settings").html(response);
            $("#battle_gamemode").removeClass('active');
            $("#groupfight_gamemode").addClass('active');
        });

        sessionStorage.setItem("gamemode", "6");

        return false;
    });

    $(document).on('click', '#duel_gamemode', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/gamemode.php",
            type: "POST",
            data: {
                gamemode: "duel",
            }
        }).done(function (response) {
            $("#gamemode_settings").html(response).css({ 'opacity': 0 }).animate({ 'opacity': 1 });
        });

        sessionStorage.setItem("gamemode", "2");

        return false;
    });

    $(document).on('click', '#wbmm_join_queue', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/queuestatus.php",
            type: "POST"
        }).done(function (response) {

            var return_msg = response.split(":");

            if (return_msg[0] == 'disabled') {

                $('#modal_title').html("Server Lobby");
                $('#modal_status').css({ "color": "#fff" });
                $('#modal_status').html(return_msg[1]);
                $('#wbmm_modal').modal('show');

            } else if (return_msg[0] == 'enabled') {
                websocket.send(window.btoa("joinlobby:" + sessionStorage.getItem("gamemode")));
            }

        });


        return false;
    });

    $(document).on('click', 'li.select_class', function (e) {
        e.preventDefault();

        var selectedClass = $(this).attr("data-class-type");
        websocket.send(window.btoa("selectclass:" + selectedClass));

        if (selectedClass == 0)
            selectedClass = 'Infantry';
        else if (selectedClass == 1)
            selectedClass = 'Cavalry';
        else if (selectedClass == 2)
            selectedClass = 'Ranger';

        $('#selected_class').html(selectedClass + '<span class="fa fa-caret-down"></span>');
        $(this).parent('.dropdown-menu').toggle();

        return false;
    });

    $(document).on('click', '#accept_match', function (e) {
        e.preventDefault();

        websocket.send(window.btoa("acceptmatch"));
        $('#accept_match').prop("disabled", true);

        return false;
    });

    $(document).on('click', '#exit_queue', function (e) {
        e.preventDefault();

        selectPage('wbmm_play');

        websocket.send(window.btoa("exitlobby"));

        return false;
    });

    // Admin panel - START -

    $(document).on('click', '#admin_broadcast', function (e) {
        e.preventDefault();

        var broadcastMessage = prompt("Please enter the broadcast message (200 chars. max).", "");

        if (broadcastMessage) {
            websocket.send(window.btoa("globalannouncement:" + broadcastMessage));
        }

        return false;
    });

    $(document).on('submit', '#admin_search', function (e) {
        e.preventDefault();

        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: "templates/admin_search.php",
            type: "POST",
            data: form_data
        }).done(function (response) {

            $('#admin_users_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#sort_newusers', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/admin_search.php",
            type: "POST",
            data: {
                sort: "new_users",
            }
        }).done(function (response) {

            $('#admin_users_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#sort_admins', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/admin_search.php",
            type: "POST",
            data: {
                sort: "admins",
            }
        }).done(function (response) {

            $('#admin_users_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#sort_recent', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/admin_recent.php",
            type: "POST",
            data: {
                sort: "recent_actions",
            }
        }).done(function (response) {

            $('#admin_users_table').html(response);

        });

        return false;
    });


    $(document).on('submit', '#view_report', function (e) {
        e.preventDefault();

        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: "templates/view_report.php",
            type: "POST",
            data: form_data
        }).done(function (response) {

            $('#history_modal_title').html("Report");
            $("#profile_modal_content").html(response);
            $('#wbmm_profile_modal').modal('show');

        });

        return false;
    });

    $(document).on('submit', '#administer', function (e) {
        e.preventDefault();

        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();


        $.ajax({
            url: "templates/administer.php",
            type: "POST",
            data: form_data
        }).done(function (response) {

            $('#history_modal_title').html("Administer");
            $("#profile_modal_content").html(response);
            $('#wbmm_profile_modal').modal('show');

        });

        return false;
    });

    $(document).on('click', '#admin_editname', function (e) {
        e.preventDefault();

        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();
        var newName = prompt("Please enter a new name.", "");

        if (newName) {
            websocket.send(window.btoa("editusername:" + UID + ":" + newName));
        }

        return false;
    });

    $(document).on('click', '#admin_warn', function (e) {
        e.preventDefault();

        var reportId = $(this).closest("div.btn-group").find('input[name="report_id"]').val();
        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();
        var warningMessage = prompt("Please enter the warning message.", "");

        if (warningMessage) {
            websocket.send(window.btoa("warnplayer:" + UID + ":" + warningMessage + ":" + reportId));
        }

        return false;
    });

    $(document).on('click', '#admin_promote', function (e) {
        e.preventDefault();

        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();
        websocket.send(window.btoa("promoteuser:" + UID));

        return false;
    });

    $(document).on('click', '#admin_setrealname', function (e) {
        e.preventDefault();

        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();
        var newName = prompt("Please enter a real name.", "");

        if (newName) {
            websocket.send(window.btoa("setrealname:" + UID + ":" + newName));
        }

        return false;
    });

    $(document).on('click', '#admin_setpassword', function (e) {
        e.preventDefault();

        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();
        var newpassword = prompt("Please enter a new password.", "");

        if (newpassword) {
            $.ajax({
                url: "procedures/admin/setpassword.php",
                type: "POST",
                data: {
                    playeruid: UID,
                    newpassword: newpassword
                }
            }).done(function (response) {

                $('#modal_title').html("Change Password");
                $('#modal_status').css({ "color": "#fff" });
                $('#modal_status').html(response);
                $('#wbmm_modal').modal('show');

            });
        }

        return false;
    });

    $(document).on('click', '#admin_whitelist', function (e) {
        e.preventDefault();

        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();

        $.ajax({
            url: "procedures/admin/whitelist_ea.php",
            type: "POST",
            data: {
                playeruid: UID
            }
        }).done(function (response) {

            $('#modal_title').html("Whitelisted");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });


        return false;
    });

    $(document).on('click', '#admin_ban_temp', function (e) {
        e.preventDefault();

        var reportId = $(this).closest("div.btn-group").find('input[name="report_id"]').val();
        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();
        var banReason = prompt("Please enter the ban reason.", "");

        if (banReason) {
            var banDuration = prompt("Please enter the ban duration in hours.", "");
            if (banDuration) {
                websocket.send(window.btoa("banplayer:" + UID + ":" + banReason + ":" + banDuration + ":" + "0" + ":" + reportId));
            }
        }

        return false;
    });

    $(document).on('click', '#admin_mute_temp', function (e) {
        e.preventDefault();

        var reportId = $(this).closest("div.btn-group").find('input[name="report_id"]').val();
        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();
        var muteReason = prompt("Please enter the mute reason.", "");

        if (muteReason) {
            var muteDuration = prompt("Please enter the mute duration in hours.", "");
            if (muteDuration) {
                websocket.send(window.btoa("muteplayer:" + UID + ":" + muteReason + ":" + muteDuration + ":" + "0" + ":" + reportId));
            }
        }

        return false;
    });

    $(document).on('click', '#admin_ban_perm', function (e) {
        e.preventDefault();

        var reportId = $(this).closest("div.btn-group").find('input[name="report_id"]').val();
        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();
        var banReason = prompt("Please enter the ban reason.", "");

        if (banReason) {
            websocket.send(window.btoa("banplayer:" + UID + ":" + banReason + ":" + "0" + ":" + "1" + ":" + reportId));
        }

        return false;
    });

    $(document).on('click', '#admin_unban', function (e) {
        e.preventDefault();

        var UID = $(this).closest("div.btn-group").find('input[name="player_id"]').val();
        var unbanReason = prompt("Please enter the unban reason.", "");

        if (unbanReason) {
            websocket.send(window.btoa("unbanplayer:" + UID + ":" + unbanReason));
        }

        return false;
    });


    $(document).on('click', '#admin_ignore_report', function (e) {
        e.preventDefault();

        var reportId = $(this).closest("div.btn-group").find('input[name="report_id"]').val();

        websocket.send(window.btoa("ignorereport:" + reportId));

        return false;
    });

    $(document).on('submit', '#review_report', function (e) {
        e.preventDefault();

        $("#content").load("templates/admin_reports.php", function () {

            $('#notifications_toggle').dropdown('toggle');
        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });


        return false;
    });

    $(document).on('click', '#admin_enable_queue', function (e) {
        e.preventDefault();

        if (confirm('Are you sure you want to enable the queue?')) {
            $.ajax({
                url: "procedures/admin/manage_queue.php",
                type: "POST",
                data: {
                    action: "enable"
                }
            }).done(function (response) {

                var returnCode = response.split(":");

                $('#modal_title').html("Queue");
                $('#modal_status').html("<b>" + returnCode[1] + "</b>");

                if (returnCode[0] == 1) {

                    $("#content").load("templates/servers.php", function () {

                        $('#modal_status').css({ "color": "#00A65A" });
                        $('#wbmm_modal').modal('show');

                    }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

                } else {

                    $('#modal_status').css({ "color": "#DD4B39" });
                    $('#wbmm_modal').modal('show');
                }

            });

        }

        return false;
    });

    $(document).on('click', '#admin_disable_queue', function (e) {
        e.preventDefault();

        if (confirm('Are you sure you want to disable the queue?')) {

            var queueReason = prompt("Please enter the reason.", "");

            $.ajax({
                url: "procedures/admin/manage_queue.php",
                type: "POST",
                data: {
                    action: "disable",
                    reason: queueReason
                }
            }).done(function (response) {

                var returnCode = response.split(":");

                $('#modal_title').html("Queue");
                $('#modal_status').html("<b>" + returnCode[1] + "</b>");

                if (returnCode[0] == 1) {

                    $("#content").load("templates/servers.php", function () {

                        $('#modal_status').css({ "color": "#00A65A" });
                        $('#wbmm_modal').modal('show');

                    }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

                } else {

                    $('#modal_status').css({ "color": "#DD4B39" });
                    $('#wbmm_modal').modal('show');
                }

            });

        }

        return false;
    });

    $(document).on('submit', '#manage_server', function (e) {
        e.preventDefault();

        if (confirm('Are you sure you want to restart the server?')) {

            var form_data = $(this).serialize();

            $.ajax({
                url: "procedures/admin/manage_server.php",
                type: "POST",
                data: form_data
            }).done(function (response) {

                $("#content").load("templates/servers.php", function () {

                    $('#modal_title').html("Servers");
                    $('#modal_status').css({ "color": "#fff" });
                    $('#modal_status').html(response);
                    $('#wbmm_modal').modal('show');

                }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });


            });
        }
        return false;
    });

    $(document).on('submit', '#server_logs', function (e) {
        e.preventDefault();

        var form_data = $(this).serialize();

        $.ajax({
            url: "templates/view_server_logs.php",
            type: "POST",
            data: form_data
        }).done(function (response) {

            $('#modal_title').html("Server Logs");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;
    });

    $(document).on('submit', '#server_lobby', function (e) {
        e.preventDefault();

        var form_data = $(this).serialize();

        $.ajax({
            url: "templates/admin_matches.php",
            type: "POST",
            data: form_data
        }).done(function (response) {

            $('#server_modal_title').html("Server Lobby");
            $("#server_modal_content").html(response);
            $('#wbmm_server_modal').modal('show');

        });

        return false;
    });



    $(document).on('click', '#maps_btnLeft', function (e) {
        e.preventDefault();

        var e = document.getElementById("lstBox2");
        var map = e.options[e.selectedIndex].value;

        var selectedOpts = $('#lstBox2 option:selected');
        if (selectedOpts.length == 0) {
            alert("Nothing to move.");
            e.preventDefault();
        }
        $('#lstBox1').append($(selectedOpts).clone());
        $(selectedOpts).remove();

        $.ajax({
            url: "procedures/admin/maps.php",
            type: "POST",
            data: {
                type: "remove",
                map: map
            }
        }).done(function (response) {

            $('#modal_title').html("Map");
            $('#modal_status').css({
                "color": "#000000"
            });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;

    });

    $(document).on('click', '#maps_btnRight', function (e) {
        e.preventDefault();

        var e = document.getElementById("lstBox1");
        var map = e.options[e.selectedIndex].value;

        var selectedOpts = $('#lstBox1 option:selected');
        if (!selectedOpts) {
            alert(selectedOpts);
            e.preventDefault();
        }
        $('#lstBox2').append($(selectedOpts).clone());
        $(selectedOpts).remove();

        $.ajax({
            url: "procedures/admin/maps.php",
            type: "POST",
            data: {
                type: "add",
                map: map
            }
        }).done(function (response) {
            $('#modal_title').html("Administer");
            $('#modal_status').css({
                "color": "#000000"
            });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');
        });

        return false;
    });

    $(document).on('submit', '#admin_history', function (e) {
        e.preventDefault();

        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: "templates/admin_history.php",
            type: "POST",
            data: form_data
        }).done(function (response) {

            $('#modal_title').html("History");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;
    });

    $(document).on('submit', '#admin_nameedit_approve', function (e) {
        e.preventDefault();

        var UID = $(this).find('input[name="player_id"]').val();
        var newName = $(this).find('input[name="requested_name"]').val();

        websocket.send(window.btoa("editusername:" + UID + ":" + newName));

        var request_id = $(this).find('input[name="request_id"]').val();

        $.ajax({
            url: "templates/request_namechange.php",
            type: "POST",
            data: {
                status: "accepted",
                request_id: request_id,
                player_uid: UID
            }
        });

        return false;
    });

    $(document).on('submit', '#admin_nameedit_deny', function (e) {
        e.preventDefault();

        var reason = prompt("Please enter a reason.", "");
        var request_id = $(this).find('input[name="request_id"]').val();

        $.ajax({
            url: "templates/request_namechange.php",
            type: "POST",
            data: {
                status: "denied",
                request_id: request_id,
                reason: reason
            }
        }).done(function (response) {

            $('#modal_title').html("Namechange approval");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');

        });

        return false;
    });

    // Userpanel - START -

    $(document).on('click', '#editname', function (e) {
        e.preventDefault();

        var newName = $("input[name='editusername']").val();

        if ((newName.length >= 3) && (newName.length <= 15)) {
            $.ajax({
                url: "templates/request_namechange.php",
                type: "POST",
                data: {
                    newName: newName
                }
            }).done(function (response) {
                $('#modal_title').html("Namechange request");
                $('#modal_status').css({ "color": "##00A65A" });
                $('#modal_status').html(response);
                $('#wbmm_modal').modal('show');
            });
        } else {
            $('#modal_title').html("Namechange request");
            $('#modal_status').css({ "color": "##DD4B39" });
            $('#modal_status').html("<b>Your username has to be between 3 and 15 chars!</b>");
            $('#wbmm_modal').modal('show');
        }

        return false;
    });


    $(document).on('click', '#removeaccount', function (e) {
        e.preventDefault();

        if (confirm('Are you sure you want to delete your account?')) {
            $(location).attr("href", "procedures/remove.php");
        }


        return false;
    });

    $(document).on('click', '#changepass', function (e) {
        e.preventDefault();

        var newpassword = $("input[name='editnewpassword']").val();
        var newpasswordretype = $("input[name='editnewpasswordretype']").val();

        $.ajax({
            url: "procedures/usermanagement.php",
            type: "POST",
            data: {
                newPass: newpassword,
                newPassRe: newpasswordretype
            }
        }).done(function (response) {
            $('#modal_title').html("Namechange");
            $('#modal_status').css({ "color": "#fff" });
            $('#modal_status').html(response);
            $('#wbmm_modal').modal('show');
        });

        return false;
    });

    // Friends - START -

    $(document).on('submit', '#view_friend_profile', function (e) {
        e.preventDefault();

        var form_data = $(this).serialize();

        $.ajax({
            url: "templates/view_profile.php",
            type: "POST",
            data: form_data
        }).done(function (response) {

            $('#profile_modal_title').html("Player profile");
            $("#profile_modal_content").html(response);
            $('#wbmm_profile_modal').modal('show');

        });

        return false;

    });

    $(document).on('click', '#search_friend', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/friends.php",
            type: "POST",
            data: {
                action: "add"
            }
        }).done(function (response) {
            $("#content").html(response);
        });

        return false;
    });


    $(document).on('submit', '#remove_friend', function (e) {
        e.preventDefault();

        var form_data = $(this).serialize();
        if (confirm('Are you sure you want to remove this friend?')) {


            $.ajax({
                url: "procedures/friends.php",
                type: "POST",
                data: form_data + '&action=delete'
            }).done(function (response) {

                var returnCode = response.split(":");

                $('#modal_title').html("Friends");
                $('#modal_status').html("<b>" + returnCode[1] + "</b>");

                if (returnCode[0] == 1) {

                    $("#content").load("templates/friends.php", function () {

                        $('#modal_status').css({ "color": "#00A65A" });
                        $('#wbmm_modal').modal('show');

                    }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

                } else {

                    $('#modal_status').css({ "color": "#DD4B39" });
                    $('#wbmm_modal').modal('show');
                }

            });

        }

        return false;

    });

    $(document).on('submit', '#accept_friend', function (e) {
        e.preventDefault();

        var request_method = $(this).attr("method");
        var form_data = $(this).serialize();

        $.ajax({
            url: "procedures/friends.php",
            type: "POST",
            data: form_data + '&action=accept'
        }).done(function (response) {

            var returnCode = response.split(":");

            $('#modal_title').html("Friend");
            $('#modal_status').html("<b>" + returnCode[1] + "</b>");

            if (returnCode[0] == 1) {

                $("#content").load("templates/friends.php", function () {

                    $('#wbmm_modal').modal('show');

                }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

            } else {

                $('#modal_status').css({ "color": "#DD4B39" });
                $('#wbmm_modal').modal('show');
            }

        });

        return false;
    });


    $(document).on('submit', '#accept_queue_request', function (e) {
        e.preventDefault();

        var friendName = $(this).find('input[name="friendname"]').val();
        var gameMode = $(this).find('input[name="gamemode"]').val();

        websocket.send(window.btoa("acceptqueuerequest:" + friendName + ":" + gameMode));
        $('#notifications_menu').find('#' + friendName).remove();
        $('#notifications_count').text(parseInt($('#notifications_count').text(), 10) - 1);

        return false;
    });

    $(document).on('submit', '#invite_friend', function (e) {
        e.preventDefault();

        var friendName = $(this).find('input[name="friendname"]').val();
        websocket.send(window.btoa("invitefriend:" + friendName + ":" + sessionStorage.getItem("gamemode")));

        return false;
    });


    $(document).on('submit', '#add_friend', function (e) {
        e.preventDefault();

        var playerName = $(this).find('input[name="playername"]').val();
        websocket.send(window.btoa("addfriend:" + playerName));

        return false;
    });

    $(document).on('submit', '#unpair_friend', function (e) {
        e.preventDefault();

        var friendName = $(this).find('input[name="friendname"]').val();
        websocket.send(window.btoa("unpairfriend:" + friendName));

        return false;
    });


    $(document).on('click', '#pick_player', function (e) {
        e.preventDefault();

        var playerUID = $(this).find('input[name="playeruid"]').val();
        websocket.send(window.btoa("pickplayer:" + playerUID));
        $(this).addClass('highlight').siblings().removeClass('highlight');


        return false;
    });


    // Chat - START -

    $(document).on('click', '#wbmm_chat_send', function (e) {
        e.preventDefault();

        var chatMessage = b64EncodeUnicode($('#wbmm_chat_text').val());
        websocket.send(window.btoa("chatsend:" + chatMessage));
        $('#wbmm_chat_text').data("emojioneArea").setText("");

        return false;
    });


    $("#wbmm_chat_text").emojioneArea({
        pickerPosition: "top",
        filtersPosition: "bottom",
        tones: true,
        autocomplete: true,
        inline: true,
        hidePickerOnBlur: false,
        events: {
            keyup: function (editor, event) {
                if (event.which == 13) {
                    var chatMessage = b64EncodeUnicode($('#wbmm_chat_text').data("emojioneArea").getText());
                    websocket.send(window.btoa("chatsend:" + chatMessage));
                    $('#wbmm_chat_text').data("emojioneArea").setText("");
                }
            }
        }
    });


    $(document).on('click', '#wbmm_chat_mute', function (e) {
        e.preventDefault();

        if (clickSound.muted == true) {
            clickSound.muted = false;
            $(this).html('<i class="fa fa-volume-up" style="color:#00A65A;"></i>');
            $(this).attr('title', 'Mute sound');
        } else {
            clickSound.muted = true;
            $(this).html('<i class="fa fa-volume-off" style="color:#DD4B39;"></i>');
            $(this).attr('title', 'Unmute sound');
        }

        return false;
    });

    // Report - START -

    $(document).on('click', '#send_report', function (e) {
        e.preventDefault();
        var playerName = $('input:text[name=username]').val();
        var reportReason = $("#reasondropdownlist option:selected").text();
        var reportEvidence = window.btoa($('textarea#evidence').val());
        var reportDescription = window.btoa($('textarea#description').val());
        var reportServer = $("#serverdropdownlist option:selected").text();
        var reportTimeold = $('input:text[name=time]').val();

        var reportTime = reportTimeold.replace(":", "-");

        websocket.send(window.btoa("reportplayer:" + playerName + ":" + reportReason + ":" + reportEvidence + ":" + reportDescription + ":" + reportServer + ":" + reportTime));

        return false;
    });

    // Match presentation - START -

    $(document).on('click', '#view_profile', function (e) {
        e.preventDefault();

        var playeruid = $(this).find('input[name="player_id"]').val();

        if ((playeruid != null)) {
            $.ajax({
                url: "templates/view_profile.php",
                type: "POST",
                data: {
                    playeruid: playeruid
                }
            }).done(function (response) {

                $('#profile_modal_title').html("Player profile");
                $("#profile_modal_content").html(response);
                $('#wbmm_profile_modal').modal('show');

            });

        }

        return false;
    });

    $(document).on('click', '#profile_general', function (e) {
        e.preventDefault();

        var playeruid = $(this).find('input[name="playeruid"]').val();

        $.ajax({
            url: "templates/player_profile.php",
            type: "POST",
            data: {
                type: "general",
                playeruid: playeruid
            }
        }).done(function (response) {

            $('#player_profile_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#profile_groupfight', function (e) {
        e.preventDefault();

        var playeruid = $(this).find('input[name="playeruid"]').val();

        $.ajax({
            url: "templates/player_profile.php",
            type: "POST",
            data: {
                type: "groupfight",
                playeruid: playeruid
            }
        }).done(function (response) {

            $('#player_profile_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#profile_battle', function (e) {
        e.preventDefault();

        var playeruid = $(this).find('input[name="playeruid"]').val();

        $.ajax({
            url: "templates/player_profile.php",
            type: "POST",
            data: {
                type: "battle",
                playeruid: playeruid
            }
        }).done(function (response) {

            $('#player_profile_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#admin_profile_info', function (e) {
        e.preventDefault();

        var playeruid = $(this).find('input[name="playeruid"]').val();

        $.ajax({
            url: "templates/player_profile.php",
            type: "POST",
            data: {
                type: "info",
                playeruid: playeruid
            }
        }).done(function (response) {

            $('#player_profile_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#admin_profile_warning', function (e) {
        e.preventDefault();

        var playeruid = $(this).find('input[name="playeruid"]').val();

        $.ajax({
            url: "templates/player_profile.php",
            type: "POST",
            data: {
                type: "warning",
                playeruid: playeruid
            }
        }).done(function (response) {

            $('#player_profile_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#admin_profile_ban', function (e) {
        e.preventDefault();

        var playeruid = $(this).find('input[name="playeruid"]').val();

        $.ajax({
            url: "templates/player_profile.php",
            type: "POST",
            data: {
                type: "ban",
                playeruid: playeruid
            }
        }).done(function (response) {

            $('#player_profile_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#admin_profile_mute', function (e) {
        e.preventDefault();

        var playeruid = $(this).find('input[name="playeruid"]').val();

        $.ajax({
            url: "templates/player_profile.php",
            type: "POST",
            data: {
                type: "mute",
                playeruid: playeruid
            }
        }).done(function (response) {

            $('#player_profile_table').html(response);

        });

        return false;
    });

    $(document).on('click', '#admin_profile_stats', function (e) {
        e.preventDefault();

        var playeruid = $(this).find('input[name="playeruid"]').val();

        $.ajax({
            url: "templates/player_profile.php",
            type: "POST",
            data: {
                type: "stats",
                playeruid: playeruid
            }
        }).done(function (response) {

            $('#player_profile_table').html(response);

        });

        return false;
    });


    // Match results - START -

    $(document).on('click', '#history_table tr', function (e) {
        e.preventDefault();

        var matchId = $(this).find('input[name="matchid"]').val();
        var date = $(this).find('input[name="matchdate"]').val();

        if ((matchId != null)) {
            $.ajax({
                url: "templates/results.php",
                type: "POST",
                data: {
                    matchid: matchId
                }
            }).done(function (response) {

                $('#history_modal_title').html("Match results - " + date);
                $("#history_modal_content").html(response);
                $('#wbmm_history_modal').modal('show');

            });

        }

        return false;
    });

    $(document).on("mouseenter", ".results-tooltips", function (e) {
        var id = this.id;
        var split_id = id.split('_');
        var matchId = split_id[0].substr(1);
        var UID = split_id[1];

        $(this).tooltipster({
            content: 'Loading...',
            animation: 'slide',
            theme: 'tooltipster-borderless',
            plugins: ['sideTip', 'scrollableTip'],
            contentAsHTML: true,
            functionBefore: function (instance, helper) {
                var $origin = $(helper.origin);
                if ($origin.data('loaded') !== true) {

                    $.ajax({
                        url: "templates/statistics.php",
                        type: "POST",
                        data: {
                            matchid: matchId,
                            uid: UID
                        }
                    }).done(function (data) {

                        instance.content(data);
                        $origin.data('loaded', true);

                    });

                }
            }
        });

        $(this).tooltipster('show');
    });

    // Menu pages - Start -

    $(document).on('click', '#wbmm_home', function (e) {
        e.preventDefault();

        $("#content").load("templates/home.php", function () {

            selectPage('wbmm_home');

            $('#rank-system-box').boxWidget({
                animationSpeed: 300,
                collapseTrigger: '#rank-system-collapse-button',
                collapseIcon: 'fa-minus',
                expandIcon: 'fa-plus'
            })

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#wbmm_profile', function (e) {
        e.preventDefault();

        $("#content").load("templates/profile.php", function () {

            selectPage('wbmm_profile');

            $('#my-profile-settings-box').boxWidget({
                animationSpeed: 500,
                collapseTrigger: '#my-profile-settings-collapse-button',
                collapseIcon: 'fa-minus',
                expandIcon: 'fa-plus'
            })

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#wbmm_profile_cs', function (e) {
        e.preventDefault();

        $("#content").load("templates/casual/profile.php", function () {

            selectPage('wbmm_profile_cs');

            $('#my-profile-settings-box').boxWidget({
                animationSpeed: 500,
                collapseTrigger: '#my-profile-settings-collapse-button',
                collapseIcon: 'fa-minus',
                expandIcon: 'fa-plus'
            })

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#battle_stats', function (e) {
        e.preventDefault();

        $("#content").load("templates/profile.php").css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#groupfighting_stats', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/profile.php",
            type: "POST",
            data: {
                type: "groupfighting"
            }
        }).done(function (response) {

            $("#content").html(response).css({ 'opacity': 0 }).animate({ 'opacity': 1 });;

        });

        return false;
    });

    $(document).on('click', '#duel_stats', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/profile.php",
            type: "POST",
            data: {
                type: "duel"
            }
        }).done(function (response) {


            $("#content").html(response).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        });

        return false;
    });

    $(document).on('click', '#wbmm_play', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/play.php",
            type: "POST",
            data: {
                gamemode: sessionStorage.getItem("gamemode")
            }
        }).done(function (response) {

            $("#content").html(response).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

            selectPage('wbmm_play');


        });

        return false;
    });


    $(document).on('click', '#wbmm_leaderboards', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/leaderboards.php",
            type: "POST",
            data: {
                type: "battle"
            }
        }).done(function (response) {

            $("#content").html(response).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

            selectPage('wbmm_leaderboards');

        });

        return false;
    });

    $(document).on('click', '#wbmm_leaderboards_cs', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/casual/leaderboards.php",
            type: "POST"
        }).done(function (response) {

            $("#content").html(response).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

            selectPage('wbmm_leaderboards_cs');

        });

        return false;
    });

    $(document).on('click', '#duels_leaderboard', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/leaderboards.php",
            type: "POST",
            data: {
                type: "duel"
            }
        }).done(function (response) {

            $("#content").html(response).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        });

        return false;
    });

    $(document).on('click', '#groupfighting_leaderboard', function (e) {
        e.preventDefault();

        $.ajax({
            url: "templates/leaderboards.php",
            type: "POST",
            data: {
                type: "groupfighting"
            }
        }).done(function (response) {

            $("#content").html(response).css({ 'opacity': 0 }).animate({ 'opacity': 1 });;

        });

        return false;
    });

    $(document).on('click', '#wbmm_history', function (e) {
        e.preventDefault();

        $("#content").load("templates/history.php", function () {

            selectPage('wbmm_history');

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });


    $(document).on('click', '#wbmm_friends', function (e) {
        e.preventDefault();

        $("#content").load("templates/friends.php", function () {

            selectPage('wbmm_friends');

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#wbmm_rules', function (e) {
        e.preventDefault();

        $("#content").load("templates/rules.php", function () {

            selectPage('wbmm_rules');

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });


    $(document).on('click', '#wbmm_regulations', function (e) {
        e.preventDefault();

        $('#modal_title').html("Rules and Regulations");

        $("#modal_status").load("templates/regulations.php", function () {

            $('#modal_status').css({ "color": "#fff" });
            $('#wbmm_modal').modal('show');

        });

        return false;
    });


    $(document).on('click', '#wbmm_policy', function (e) {
        e.preventDefault();

        $('#modal_title').html("Privacy Policy");

        $("#modal_status").load("templates/policy.php", function () {

            $('#modal_status').css({ "color": "#fff" });
            $('#wbmm_modal').modal('show');

        });

        return false;
    });

    $(document).on('click', '#wbmm_report', function (e) {
        e.preventDefault();

        $("#content").load("templates/report.php", function () {

            selectPage('wbmm_report');

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#wbmm_users', function (e) {
        e.preventDefault();

        $("#content").load("templates/admin_users.php", function () {

            selectPage('wbmm_users');

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#wbmm_reports', function (e) {
        e.preventDefault();

        $("#content").load("templates/admin_reports.php", function () {

            selectPage('wbmm_reports');

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#wbmm_servers', function (e) {
        e.preventDefault();

        $("#content").load("templates/servers.php", function () {

            selectPage('wbmm_servers');

            $('#map-pool-box').boxWidget({
                animationSpeed: 300,
                collapseTrigger: '#map-pool-collapse-button',
                collapseIcon: 'fa-minus',
                expandIcon: 'fa-plus'
            })

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });


    $(document).on('click', '#wbmm_roadmap', function (e) {
        e.preventDefault();

        $("#content").load("templates/roadmap.php", function () {

            selectPage('wbmm_roadmap');

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#wbmm_about', function (e) {
        e.preventDefault();

        $("#content").load("templates/about.php", function () {

            selectPage('wbmm_about');

        }).css({ 'opacity': 0 }).animate({ 'opacity': 1 });

        return false;
    });

    $(document).on('click', '#wbmm_discord', function (e) {
        e.preventDefault();

        window.open("https://kaihei.co/BTx4Ax");

        return false;
    });

    $(document).on('click', '#wbmm_forums', function (e) {
        e.preventDefault();

        window.open("https://bbs.mountblade.com.cn/thread-2072356-1-1.html");

        return false;
    });

    $(document).on('click', '#wbmm_logout', function (e) {
        e.preventDefault();

        $(location).attr("href", "procedures/logout.php");

        return false;
    });

    $(document).on('click', '#wbmm_region_eu', function (e) {
        e.preventDefault();

        $(location).attr("href", "https://warbandmatchmaking.com/webmm/eu");

        return false;
    });

    $(document).on('click', '#wbmm_region_na', function (e) {
        e.preventDefault();

        $(location).attr("href", "https://warbandmatchmaking.com/webmm/na");

        return false;
    });

    $(document).on('click', '#wbmm_region_oc', function (e) {
        e.preventDefault();

        $(location).attr("href", "https://warbandmatchmaking.com/webmm/oc");

        return false;
    });

    $(document).on('click', '#wbmm_region_sa', function (e) {
        e.preventDefault();

        $(location).attr("href", "https://warbandmatchmaking.com/webmm/sa");

        return false;
    });


    // Menu pages - END -

});

function controlSidebarToggle() {
    $(".control-sidebar").toggle();
}

function region_locked() {
    alert("This region is locked.");
    $(location).attr("href", "https://warbandmatchmaking.com");
}
