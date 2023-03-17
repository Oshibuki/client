import { io } from "socket.io-client";
import {clickSound,connectedSound,kickedSound} from './audios.js'
import useSiteStatusStore from '../stores/siteStatus.js'
import useMatchStatusStore from '../stores/match.js'
import router from '@/router'
// "undefined" means the URL will be computed from the `window.location` object

const siteStatusStore = useSiteStatusStore()
const matchStatusStore = useMatchStatusStore()


// this store argv is userStore
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
        matchStatusStore.$reset()
        store.socketConnected = true
        connectedSound.muted = siteStatusStore.muted
        connectedSound.play()
    });
    
    socket.on("disconnect", () => {
        store.socketConnected = false
        store.chatList.push({
            senderName: "Server",
            timeStamp: new Date(),
            message: `${store.region} - ${store.username} has disconnected`
        })
        connectedSound.muted = siteStatusStore.muted
        connectedSound.play()
        matchStatusStore.$reset()
        router.push('/')
    });

    socket.on("chatMsg", (data) => {
        store.chatList.push(data)
        clickSound.muted = siteStatusStore.muted
        clickSound.play()
    });

    socket.on("playerkicked", (data) => {
        store.chatList.push(data)
        kickedSound.muted = siteStatusStore.muted
        kickedSound.play()
    });

    socket.on("currentCount",(data)=>{
        siteStatusStore.updateStatus(data)
    })

    socket.on("canjoinlobby", (data) => {
        matchStatusStore.updateLobbyInfo(data)
        router.push('/waitlobby')
    });

    socket.on("joinlobby", ({msg}) => {
        window.alert(msg)
    });

    socket.on("canexitlobby", () => {
        matchStatusStore.$reset()
        router.push('/play')
    });

    socket.on("updatequeue", (players) => {
        matchStatusStore.$patch((state)=>{
            state.currentLobby = players.sort((a,b)=>a.mmr>b.mmr)
        })
    });

    socket.on("squeezeOut", () => {
        store.logout()
        alert("账户在其它地方登陆，会话已断开！")
        router.push('/login')
      })
    
    //   socket.on("matchstarted", () => {
        //update lobbyStore
    //     router.push('/matchStarted')
    //   })
    

    store.socket = socket
}
