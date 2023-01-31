<script>
import {getConseillers} from '../services/api.js'
import {io} from 'socket.io-client'
import {ref} from 'vue'
import axios from 'axios'

const socket = io('http://localhost:9000')

const conseillers = await getConseillers()

export default {
  name: 'ContactView',
  data () {
    return {
      conseillers
    }
  },
  mounted () {


    
    socket.on('message', (message) => {
      console.log(message)
      const messages = document.getElementById('messages')
      const messageElement = document.createElement('div')
      messageElement.innerText = message
      messages.appendChild(messageElement)
    })

    const sendButton = document.getElementById('send')
    sendButton.addEventListener('click', () => {
      const message = document.getElementById('message')
      socket.emit('message', message.value)
      message.value = ''
    })

    
  },
  setup () {
    const handleContact = async (conseiller) => {
      const response = await axios.post('http://localhost:9000/api/demande/contact', JSON.stringify({
        conseiller: conseiller
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if (response.data.success) {
        
      }
    }

    return {
      handleContact
    }
  }
}

</script>

<template>
<main class="main">
  <div class="container">
    <h1>Contacter un conseiller de vente.</h1>
    <p>Vous pouvez contacter un conseiller de vente pour obtenir des informations sur nos produits.</p>

    <div class="conseillers mt-5 mb-5">
      <div v-for="conseiller in conseillers" :key="conseiller.id">
        <h2>{{ conseiller.nom }}</h2>
        <p>{{ conseiller.prenom }}</p>

        <div v-if="conseiller.disponible" class="disponible">🟢</div>
        <div v-else class="disponible">🔴</div>

        <button v-if="conseiller.disponible" class="btn btn-primary" @click="handleContact(conseiller.id)">Contacter</button>

      </div>
    </div>

    <div id="communication">
      <div id="messages">
        
      </div>
      <div id="sendbox">
        <input type="text" id="message" />
        <button id="send">Envoyer</button>
      </div>
      
    </div>

  </div>
</main>
</template>

<style scoped>
.contact {
  padding: 20px;
}

.conseillers {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.disponible {
  font-size: 2rem;
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