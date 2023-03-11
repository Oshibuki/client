import { io } from "socket.io-client";
import {clickSound,connectedSound} from './audios.js'
import useSiteStatusStore from '../stores/siteStatus.js'
import router from '@/router'

// "undefined" means the URL will be computed from the `window.location` object

const siteStatusStore = useSiteStatusStore()

export default function initSocket(store){
    const socket = io("http://localhost",{
        // autoConnect: false,
        auth:{
            token:store.uid
        },
        reconnectionDelay: 10000, // defaults to 1000
        reconnectionDelayMax: 10000 // defaults to 5000
      });

    socket.on("connect", () => { 
        store.socketConnected = true
        connectedSound.play()
    });
    
    socket.on("disconnect", () => {
        store.socketConnected = false
    });

    socket.on("chatMsg", (data) => {
        store.chatList.push(data)
        clickSound.play()
    });

    socket.on("currentCount",(data)=>{
        siteStatusStore.updateOnlineUsers(data)
    })

    socket.on("squeezeOut", () => {
        store.logout()
        alert("账户在其它地方登陆，会话已断开！")
        router.push('/login')
      })
    

    store.socket = socket
}
