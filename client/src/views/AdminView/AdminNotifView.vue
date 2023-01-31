  
  <script>
  import axios from "axios";
  import { getNotifications, postNotifications } from "../../services/api.js";
  const newNotif = async (e) => {
  const formData = new FormData(e.target);
  console.log("formData", formData);
  const data = formData.get("message");
  try {
    const response = await postNotifications({
      message: data,
    });
    console.log(response);
    const result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};
  console.log(Notification);
  export default {
    data() {
      return {
        message: "",
        notifications: [],
      };
    },
    async created() {
      this.notifications = await getNotifications();
    },
    methods: {
      newNotif,
    },
  };
  </script >

<template>
    <div>
      <h1>Notifications</h1>
      <form @submit="newNotif">
      <input type="text" name="message" v-model="message" />
      <button type="submit">Envoyer</button>
    </form>
    <h2>Toutes les notifications</h2>
      <ul>
        <li v-for="notification in notifications" :key="notification.id">
          {{ notification.message }}
        </li>        
      </ul>
    </div>
  </template>
