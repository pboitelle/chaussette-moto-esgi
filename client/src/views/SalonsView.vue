<script>
import {getSalons} from '../services/api.js'
import {io} from 'socket.io-client'

const socket = io('ws://localhost:9000')

const salons = await getSalons()

socket.on("messageSalon", ({client, message}) => {
  console.log(message)
  const messages = document.getElementById('messages')

  if (!messages) {
      throw new Error("Messages container not found")
  }

  const messageElement = document.createElement('div')
  messageElement.innerText = `[${client}] ${message}`
  messages.appendChild(messageElement)
})

socket.on("joinSalon", data => {
    const identifier = data.identifier
    const salon_id = document.getElementById("salon-id")
    salon_id.innerText = identifier
    const chat = document.getElementById("chat")
    chat.style.display = "block";
})
socket.on("leaveSalon", room => {
    const messages = document.getElementById("messages")
    messages.innerHTML = ""
    const chat = document.getElementById("chat")
    chat.style.display = "none";
})

export default {
    name: 'SalonsView',
    data () {
        return {
            salons
        }
    },
    setup () {

        const joinSalon = (id_salon) => {
            socket.emit('joinSalon', id_salon)
        }

        return {
            joinSalon
        }
    },
    mounted () {

        const messageForm = document.getElementById('sendbox')

        if (!messageForm) {
            throw new Error("Message form not found")
        }

        const leave = document.getElementById("leaveSalon")

        if (!leave) {
            throw new Error("Leave button not found")
        }

        messageForm.addEventListener('submit', (e) => {

            const messagesContainer = document.getElementById('messages')

            if (!messagesContainer) {
                throw new Error("Messages container not found")
            }

            const messageContent = document.getElementById('content')

            if (!messageContent) {
                throw new Error("Message content not found")
            }

            const message = messageContent.value

            const messageElement = document.createElement('div')
            messageElement.innerText = `[Amin] ${message}`
            messagesContainer.appendChild(messageElement)

            const id_salon = document.getElementById("salon-id").innerText

            socket.emit('messageSalon', {
                id_salon: id_salon, 
                message
            })

            e.preventDefault()
        })

        leave.addEventListener("click", event => {
            event.preventDefault()
            const room = document.getElementById("salon-id").innerText
            if (!room) {
                throw new Error("Room id not found")
            }
            socket.emit("leaveSalon", room)
        })
    },
}
</script>

<template>
<main class="main">
  <div class="container">
    <h1>Liste des salons</h1>
    <div class="row">
        <div class="col-md-4" v-for="salon in salons" :key="salon.id">
            <div class="card mb-4 shadow-sm">
                <div class="card-body" style="color: black;">
                    <h5 class="card-title">{{salon.nom}}</h5>
                    <p class="card-text">Max salon : {{salon.nb_max}} clients</p>
                    <p class="card-text">Client dans le salon : </p>
                    <div class="d-flex justify-content-between align-items-center">
                        <button type="button" class="btn btn-sm btn-outline-secondary" @click="joinSalon(salon.id)">Rejoindre</button>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <div id="chat" style="display: none;">
        <h2>Salon n° <span id="salon-id"></span></h2>
        <p>Vous pouvez discuter entre clients.</p>
        <div id="communication">

            <div id="messages">
            </div>

            <form id="sendbox">
                <input type="text" id="content" name="content" />
                <button type="submit" id="send" class="btn btn-primary">Envoyer</button>
            </form>
            
        </div>
        <button id="leaveSalon" class="btn btn-warning">Quitter le salon</button>
    </div>

  </div>
</main>
</template>

<style scoped>

#communication {
  width: 100%;
  height: 50vh;
  border: 1px solid black;
}

#messages {
  width: 100%;
  height: 80%;
  overflow: scroll;
  color: white;
}

#sendbox {
  width: 100%;
  height: 20%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

#sendbox input {
  width: 80%;
  height: 100%;
  padding: 10px;
}

#sendbox button {
  width: 20%;
  height: 100%;
  padding: 10px;
}
</style>