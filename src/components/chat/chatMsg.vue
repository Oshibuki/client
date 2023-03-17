<template>
    <div class="direct-chat-msg right" v-if="chat.senderName!='Server'">
        <div class="direct-chat-info clearfix"><span class="direct-chat-name pull-right">SA -
                {{ chat.senderName }}</span><span class="direct-chat-timestamp pull-left">{{ chat.timeStamp }}</span>
        </div>
        <img class="direct-chat-img" :src="rankImgUrl(chat.senderRank)" alt="User rank image">
        <div class="direct-chat-text" style="background-color:#9b7841;border-color:#9b7841;">{{chat.message}}</div>
    </div>
    <div class="direct-chat-msg left" v-else>
        <div class="direct-chat-info clearfix"><span class="direct-chat-name pull-left">SERVER
            </span><span class="direct-chat-timestamp pull-right">{{ chat.timeStamp }}</span></div>
        <img class="direct-chat-img" src="@/assets/img/wbmm_icon.png" alt="User rank image">

        <div style="background-color:#1C1C1C;border-color:#1C1C1C;color:#9b7841;"
            class="direct-chat-text direct-chat-text-server"><big>{{ chat.message }}</big></div>
    </div>
</template>

<script>
import rankImgUrl from '@/utils/getRankImg'
export default {
    props:['chat'],

    methods:{
        rankImgUrl
    }
}
</script>

<style lang="scss" scoped>

</style>
