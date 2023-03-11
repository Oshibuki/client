<template >
    <!--MAGIC CHAT SECTION-->

    <aside id="chat-sidebar" class="control-sidebar bg-gray-dark" style="">

        <div class="box box-primary direct-chat direct-chat-primary bg-default-light" style="margin-bottom:0;">

            <div id="wbmm_chat_header" class="box-header with-border bg-gray-darker" style="display: inline-block;">
                <div>
                    <h3 class="box-title" style="vertical-align: middle;">Chat</h3>
                    <i class="far fa-comment-dots" style="vertical-align: top; margin-left:4px; font-size:14px;"></i>
                    <div class="box-tools pull-right">
                        <span id="chat_users" data-toggle="tooltip" title="Chat Users" class="badge bg-brown">{{ siteStatusStore.onLineUsers }}
                            <small>USERS</small></span>
                    </div>
                </div>
            </div>


            <div id="wbmm_chat_body" class="box-body">
                <div id="wbmm_chat" class="direct-chat-messages">
                    <chat-msg :chat="chat" v-for="chat in userStore.chatList" :key="chat.timeStamp"></chat-msg>
                </div>
            </div>
            <div id="wbmm_chat_footer" class="box-footer bg-gray-darker" style="position: fixed; bottom: 0; width: 340px;">
                <div class="input-group">
                    <input required="true" type="text" name="message" placeholder="Type Message ..." class="form-control" v-model="chatData.chatMsg" @keyup.enter="onSubmitChat">
                    <span class="input-group-btn">
                        <button type="button" class="btn btn-success btn-flat" @click.stop="onSubmitChat">Send</button>
                    </span>
                </div>
            </div>
        </div>
    </aside>
    <div class="control-sidebar-bg"></div>

    <!--END OF MAGIC CHAT SECTION-->
</template>
<script setup>
import { reactive } from 'vue'
import useUserStore from "@/stores/user"
import useSeasonStore from '@/stores/seasonStatus'
import useSiteStatusStore from '@/stores/siteStatus'


const chatData = reactive({
    chatMsg:""
})
// 实例化 store
const userStore = useUserStore()
const seasonStore = useSeasonStore()
const siteStatusStore = useSiteStatusStore()

const onSubmitChat = async () => {
    if(chatData.chatMsg=="")return;
    const chatInfo = {msg:chatData.chatMsg,senderName:userStore.username,senderRank:seasonStore.BRank,timeStamp:new Date()}
    await userStore.socket.emit("chatMsg",chatInfo,()=>{
        chatData.chatMsg=""
    })
}

</script>
<style lang="">

</style>
