import { io } from "socket.io-client";
import {clickSound} from './audios.js'
import useSiteStatusStore from '../stores/siteStatus.js'

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
    

    store.socket = socket
}
