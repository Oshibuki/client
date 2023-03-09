// sound effects
var connectedSound = document.createElement("audio");
connectedSound.src = "src/assets/sounds/connected.mp3";
connectedSound.volume = 0.25;
connectedSound.autoPlay = false;
connectedSound.preLoad = true;
connectedSound.controls = false;

var clickSound = document.createElement("audio");
clickSound.src = "src/assets/sounds/click.mp3";
clickSound.volume = 0.25;
clickSound.autoPlay = false;
clickSound.preLoad = true;
clickSound.controls = false;

var chimeSound = document.createElement("audio");
chimeSound.src = "src/assets/sounds/chime.mp3";
chimeSound.volume = 0.25;
chimeSound.autoPlay = false;
chimeSound.preLoad = true;
chimeSound.controls = false;

var acceptSound = document.createElement("audio");
var acceptSoundSrc = [
    "src/assets/sounds/accept_1.mp3",
    "src/assets/sounds/accept_2.mp3",
    "src/assets/sounds/accept_3.mp3",
    "src/assets/sounds/accept_4.mp3",
    "src/assets/sounds/accept_5.mp3",
    "src/assets/sounds/accept_6.mp3",
];
acceptSound.src = "src/assets/sounds/accept_1.mp3";
acceptSound.volume = 0.25;
acceptSound.autoPlay = false;
acceptSound.preLoad = true;
acceptSound.controls = false;

var captainSound = document.createElement("audio");
var captainSoundSrc = [
    "src/assets/sounds/captain_1.mp3",
    "src/assets/sounds/captain_2.mp3",
    "src/assets/sounds/captain_3.mp3",
    "src/assets/sounds/captain_4.mp3",
    "src/assets/sounds/captain_5.mp3",
];
captainSound.src = "src/assets/sounds/captain_1.mp3";
captainSound.volume = 0.25;
captainSound.autoPlay = false;
captainSound.preLoad = true;
captainSound.controls = false;

var achievementSound = document.createElement("audio");
var achievementSoundSrc = [
    "src/assets/sounds/achievement_1.mp3",
    "src/assets/sounds/achievement_2.mp3",
];
achievementSound.src = "src/assets/sounds/achievement_1.mp3";
achievementSound.volume = 0.10;
achievementSound.autoPlay = false;
achievementSound.preLoad = true;
achievementSound.controls = false;

var invitationSound = document.createElement("audio");
invitationSound.src = "src/assets/sounds/invitation.mp3";
invitationSound.volume = 0.25;
invitationSound.autoPlay = false;
invitationSound.preLoad = true;
invitationSound.controls = false;

var notificationSound = document.createElement("audio");
notificationSound.src = "src/assets/sounds/notification.mp3";
notificationSound.volume = 0.25;
notificationSound.autoPlay = false;
notificationSound.preLoad = true;
notificationSound.controls = false;

var friendSound = document.createElement("audio");
friendSound.src = "src/assets/sounds/friend_request.mp3";
friendSound.volume = 0.25;
friendSound.autoPlay = false;
friendSound.preLoad = true;
friendSound.controls = false;

var kickedSound = document.createElement("audio");
kickedSound.src = "src/assets/sounds/player_kicked.mp3";
kickedSound.volume = 0.25;
kickedSound.autoPlay = false;
kickedSound.preLoad = true;
kickedSound.controls = false;

var cancelledSound = document.createElement("audio");
cancelledSound.src = "src/assets/sounds/match_cancelled.mp3";
cancelledSound.volume = 0.25;
cancelledSound.autoPlay = false;
cancelledSound.preLoad = true;
cancelledSound.controls = false;

var startedSound = document.createElement("audio");
startedSound.src = "src/assets/sounds/match_started.mp3";
startedSound.volume = 0.25;
startedSound.autoPlay = false;
startedSound.preLoad = true;
startedSound.controls = false;

var endedSound = document.createElement("audio");
endedSound.src = "src/assets/sounds/match_ended.mp3";
endedSound.volume = 0.25;
endedSound.autoPlay = false;
endedSound.preLoad = true;
endedSound.controls = false;

var adminSound = document.createElement("audio");
adminSound.src = "src/assets/sounds/admin_action.mp3";
adminSound.volume = 0.25;
adminSound.autoPlay = false;
adminSound.preLoad = true;
adminSound.controls = false;

export {
    connectedSound,clickSound,chimeSound,acceptSound,captainSound,achievementSound,invitationSound,notificationSound,
    friendSound,kickedSound,cancelledSound,startedSound,endedSound,adminSound
}
