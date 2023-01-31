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
var input = document.getElementById('input');

const openModal = () => {
  showModal.value = !showModal.value
  // socket.emit('connection');
  // le ligne ci-dessous permet de se connecter au serveur socket.io et de recevoir les messages du serveur socket.io
  // "open" est un événement qui est émis par socket.io quand la connexion est établie avec le serveur socket.io
  socket.addEventListener("open", () => {
    console.log('Message from server ');
    // send a message to the server
    // socket.send(JSON.stringify({
    //   type: "hello from client",
    //   content: [ 3, "4" ]
    // }));
    if (input.value) {
      socket.emit('message', input.value);
      console.log('Message from server ', data);
      input.value = '';
    }
  });

  // receive a message from the server
  socket.addEventListener("message", ({ data }) => {

  console.log('Message from server ', data);
  const packet = JSON.parse(data);

  switch (packet.type) {
    case "hello from server":
      // ...
      break;
  }
  });
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
    <input v-model="text" type="text" id="input">
    <button v-on:click="onclick" name="button"></button>
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