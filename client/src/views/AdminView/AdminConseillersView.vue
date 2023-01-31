<script>
import {getConseillers} from '../../services/api.js'
import axios from 'axios'
import {io} from 'socket.io-client'
import {ref} from 'vue'

const socket = io('ws://localhost:9000')

const conseillers = await getConseillers()

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
  name: 'demandes',
  data() {
    return {
        conseillers
    }
  },
  setup () {

    const join = (id_conseiller, name_conseiller) => {
        socket.emit('join', id_conseiller)

        const input_id_conseiller = document.getElementById('id_conseiller')
        const input_name_conseiller = document.getElementById('name_conseiller')

        input_id_conseiller.value = id_conseiller
        input_name_conseiller.value = name_conseiller
    }

    return {
      join
    }
  },
  mounted () {
    const messageForm = document.getElementById('sendbox')

    if (!messageForm) {
        throw new Error("Message form not found")
    }

    messageForm.addEventListener('submit', (e) => {

        const id_conseiller = document.getElementById('id_conseiller').value
        const name_conseiller = document.getElementById('name_conseiller').value

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
        messageElement.innerText = `[${name_conseiller}] ${message}`
        messagesContainer.appendChild(messageElement)

        socket.emit('messageConseiller', {
          id_conseiller: id_conseiller, 
          message
        })

        e.preventDefault()
    })
  }

}
</script>

<template>
  <div>
    <h1>Liste des conseillers</h1>
    <table class="table">
      <thead>
        <tr>
            <th scope="col">ID</th>
            <th scope="col">Conseiller</th>
            <th scope="col">Disponible</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="conseiller in conseillers" :key="conseiller.id">
            <td>{{ conseiller.id }}</td>
            <td>{{ conseiller.nom + " " + conseiller.prenom }}</td>
            <td v-if="conseiller.disponible">
                <span class="badge badge-success">Oui</span>
            </td>
            <td v-else>
                <button class="btn btn-primary" @click="join(conseiller.id, conseiller.nom)">Discuter avec le client</button>
            </td>
        </tr>
      </tbody>
    </table>

    <div class="contact">
        <h2>Chat</h2>
        <p>Vous pouvez discuter avec le client.</p>
        <div id="communication">

            <div id="messages">
            </div>

            <form id="sendbox">
                <input type="text" id="content" name="content" />
                <input type="hidden" id="id_conseiller" name="id_conseiller" />
                <input type="hidden" id="name_conseiller" name="name_conseiller" />
                <button type="submit" id="send" class="btn btn-primary">Envoyer</button>
            </form>
          
        </div>
    </div>
  </div>
</template>

<style scoped>
table {
  color: white;
}

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
}
</style>