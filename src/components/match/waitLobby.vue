<template>
    <section id="content" class="content container-fluid" style="opacity: 1;">
        <!-- Lobby -->
        <div class="row">
            <div class="col-lg-12">
                <div class="box box-primary bg-default-light">

                    <div class="box-header with-border bg-brown">
                        <h3 class="box-title"><b>Lobby - {{ matchStatusStore.lobbyInfo.lobbyID }}</b></h3>
                        <!-- <div class="box-tools pull-right">
              <span class="label text-white">Total friends: 0</span>
            </div> -->
                    </div>

                    <div class="box-body">

                        <div class="row">
                            <div class="col-lg-12">
                                <div id="lobby_status" class="text-center">
                                    <h2>{{ matchStatusStore.lobbyCaption }}</h2>
                                </div>
                            </div>
                            <button
                             v-if="!matchStatusStore.myLobbyStatus.lobbyStatus && matchStatusStore.lobbyInfo.lobbyFull"
                             id="accept_match" type="submit"
                             class="btn btn-success btn-block btn-flat btn-lg visible-xs"><b>Accept</b></button>
                            <button v-if="!matchStatusStore.lobbyInfo.lobbyFull" @click="onExitQueue" id="exit_queue" type="submit"
                             class="btn btn-danger btn-block btn-flat btn-lg visible-xs"><b>Exit Queue</b></button>

                        </div>

                        <div id="lobby_players" class="row">

                            <div class="col-lg-12" style="float:none;margin: 0 auto;">
                                <div id="cards" class="text-center">
                                    <card-player :key="player.uid" :player="player"
                                        v-for="player in matchStatusStore.currentLobby">
                                    </card-player>
                                    <card-default :key="n" v-for="n in matchStatusStore.emptyItems">
                                    </card-default>
                                </div>
                            </div>

                        </div>


                    </div>
                    <button v-if="!matchStatusStore.myLobbyStatus.lobbyStatus && matchStatusStore.lobbyInfo.lobbyFull"
                     id="accept_match" type="submit" @click="onAcceptQueue"
                     class="btn btn-success btn-block btn-flat btn-lg hidden-xs">
                        <b>Accept</b>
                    </button>
                    <button v-if="!matchStatusStore.lobbyInfo.lobbyFull" @click="onExitQueue" id="exit_queue" type="submit"
                     class="btn btn-danger btn-block btn-flat btn-lg hidden-xs"><b>Exit Queue</b>
                    </button>
                </div>

            </div>

        </div>


    </section>
</template>

<script setup>
import useMatchStatusStore from '../../stores/match.js'
import useUserStore from '../../stores/user.js'
import cardDefault from '../common/cardDefault.vue';
import cardPlayer from '../common/cardPlayer.vue';

const matchStatusStore = useMatchStatusStore()
const userStore = useUserStore()

const onExitQueue = function(){
    userStore.socket.emit("exitlobby")
}

const onAcceptQueue = function(){
    userStore.socket.emit("acceptmatch")
}

</script>

<style lang="scss" scoped>
</style>
