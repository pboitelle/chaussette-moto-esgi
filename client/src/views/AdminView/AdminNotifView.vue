<template>
    <div>
        <h1>Créer notifications</h1>
        <form @submit.prevent="submitNotification">
            <label>
                Message :
                <textarea v-model="message"></textarea>
            </label>
            <button type="submit">Envoyer</button>
        </form>

        <h1>Liste des notifications</h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Message</th>
                    <th scope="col">Date</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="notification in notifications" :key="notification.id">
                    <td>{{ notification.message }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

  
<script>
export default {
  data() {
    return {
      message: ""
    };
  },
  methods: {
    async submitNotification() {
      // Connectez-vous à la base de données MySQL
      const connection = await mysql.createConnection({
        host: "127.0.0.1:8080",
        user: "chaussettes",
        password: "password",
        database: "notifications"
      });
      // Insérez la notification dans la base de données
      await connection.execute(
        "INSERT INTO notifications (message, timestamp) VALUES (?, ?)",
        [this.message, Date.now()]
      );
      // Fermez la connexion à la base de données
      connection.close();
      // Effacez le message après l'envoi
      this.message = "";
    }
  }
};
</script>

  
<style scoped>
th {
  color: #f5f5f5;
}

td {
  color: #f5f5f5;
}
</style>