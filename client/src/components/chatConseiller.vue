<script>
import {checkDemande} from '../services/api.js'
import {io} from 'socket.io-client'

const socket = io('ws://localhost:9000')

const demande = await checkDemande()

socket.on("messageConseiller", ({client, message}) => {
  console.log(message)
  const messages = document.getElementById('messages')

  if (!messages) {
      throw new Error("Messages container not found")
  }

  const messageElement = document.createElement('div')
  messageElement.innerText = `[${client}] ${message}`
  messages.appendChild(messageElement)
})

export default {
    name: 'chatConseillerView',
    mounted () {

      socket.emit('join', demande.id_conseiller)

      const messageForm = document.getElementById('sendbox')

      if (!messageForm) {
        throw new Error("Message form not found")
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

          socket.emit('messageConseiller', {
            id_conseiller: demande.id_conseiller, 
            message
          })

          e.preventDefault()
      })
    },

    setup () {
      return {
        demande
      }
    }
}

</script>

<template>
<main class="main">
  <div class="container">
    <h1>En communication avec {{ demande.nom + " " + demande.prenom }}</h1>
    <p>Vous communiquez avec un conseillé pour l'entretien de votre moto.</p>

    <div v-if="demande.isAccepted" class="contact">
        <h2>Chat</h2>
        <p>Vous pouvez discuter avec le conseiller de vente.</p>
        <div id="communication">

            <div id="messages">
            </div>

            <form id="sendbox">
                <input type="text" id="content" name="content" />
                <button type="submit" id="send" class="btn btn-primary">Envoyer</button>
            </form>
          
        </div>
    </div>

    <div v-else class="contact">
        <h2>En attente</h2>
        <p>Vous êtes en attente d'un conseiller de vente...</p>
    </div>

  </div>
</main>
</template>

<style scoped>
.contact {
  padding: 20px;
}


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