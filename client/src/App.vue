<script setup>
import { RouterView } from 'vue-router'
import { ref } from "vue";

import NavBar from './components/NavBar.vue'
import Modal from './components/Modal.vue'

import chatbotSVG from './assets/chatbot.svg'
import crossSVG from './assets/cross.svg'

import NotifsView from './components/NotifsView.vue';

const showModal = ref(false)

const openModal = () => {
    showModal.value = !showModal.value
}

const closeModal = () => {
    showModal.value = false
}
</script>

<template>
    
  <NavBar />

  <RouterView />
  <notification-banner />
  
  <div class="chatbot" @click="closeModal" v-if="showModal">
    <img :src="crossSVG" alt="crossChatbot">
  </div>

  <div class="chatbot" @click="openModal" v-else="showModal">
    <img :src="chatbotSVG" alt="chatbot">
  </div>
  
  <Modal :showModal="showModal" title="Vieux motard que jamais !" :close="closeModal">
    <p>Contenu du modal</p>
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