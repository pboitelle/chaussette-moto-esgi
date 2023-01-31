<script setup>
import { RouterView } from 'vue-router'
import { ref } from "vue";

import NavBar from './components/NavBar.vue'
import Modal from './components/Modal.vue'

import chatbotSVG from './assets/chatbot.svg'
import crossSVG from './assets/cross.svg'
import io from 'socket.io-client'

var socket = io("http://localhost:9000");

const showModal = ref(false)

const openModal = () => {
  showModal.value = !showModal.value
  var input = document.getElementById('input');
  var button = document.getElementById('button');
  var modal = document.getElementById('modal');
  // quand j'ouvre la modal je veux qu'un message soit envoyé au serveur
  // socket.emit('message', text);

  socket.on("messageConseiller", ({data}) => {
    console.log(data);
    const messages = document.getElementById('modal')

    if (!messages) {
        throw new Error("Messages container not found")
    }

    const messageElement = document.createElement('div')
    messageElement.innerText = `${text}`
    messages.appendChild(messageElement)
  })
  
  button.addEventListener('click', function() {
    const text = input.value;
    socket.emit('message', text);

    // création d'un élément div pour afficher le message de l'utilisateur dans la modal qui a pour id="modal"
    var div = document.createElement('div');
    div.innerHTML = text;
    modal.appendChild(div);
    input.value = '';

  });

  // recupere le message du server dans server.js qui correspond a la variable response et affiche la en créant un élément div dans la modal
  socket.on("response", (response) => {
    console.log(response);
    const messages = document.getElementById('modal')

    if (!messages) {
        throw new Error("Messages container not found")
    }

    const messageElement = document.createElement('div')
    messageElement.innerText = `${response}`
    messages.appendChild(messageElement)
  })
}

const closeModal = () => {
    showModal.value = false
}

</script>

<template>
    
  <NavBar />

  <RouterView />
  
  <div class="chatbot" @click="closeModal" v-if="showModal">
    <img :src="crossSVG" alt="crossChatbot">
  </div>

  <div class="chatbot" @click="openModal" v-else="showModal">
    <img :src="chatbotSVG" alt="chatbot">
  </div>
  
  <Modal :showModal="showModal" title="Vieux motard que jamais !" :close="closeModal">
    <div id="modal">
      <p>Salut, je suis le chatbot de l'application. Je suis là pour t'aider à trouver des motards près de chez toi.</p>
      <p>Comment je peux t'aider ?</p>
      <p>Je souhaiterais des l'entretien sur mon véhicule</p>
      <p>Si le client souhaite des informations sur les véhicules</p>
      <p>Si le client souhaite des informations de contact</p>
      <p>Si le client souhaite arrêter le workflow</p>
    </div>
    <input v-model="text" type="text" id="input">
    <button v-on:click="onclick" id="button"></button>
  </Modal>
  
</template>

<style scoped>
.chatbot {
  cursor: pointer;
  background-color: #39d87b;
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px; 
}
.chatbot img {
  width: 50px;
  height: 50px;
}
</style>