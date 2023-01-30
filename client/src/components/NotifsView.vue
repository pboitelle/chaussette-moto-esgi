<template>
    <div class="notification-banner" v-if="notifications.length > 0">
      <ul>
        <li v-if="notification in notifications">
          {{ notification.message }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        notifications: []
      };
    },
    created() {
      // Récupération des notifications à partir de l'API
    }
  };
  </script>
  
  <style>
  .notification-banner {
    background-color: lightgray;
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 10px;
  }
  </style>