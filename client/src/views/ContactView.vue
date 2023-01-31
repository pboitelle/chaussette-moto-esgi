<script>
import {checkDemande} from '../services/api.js'
import ListeConseillers from '../components/ListeConseillers.vue'
import chatConseiller from '../components/chatConseiller.vue'

const demande = await checkDemande()

export default {
  name: 'ContactView',
  components: {
    ListeConseillers,
    chatConseiller
  },
  data () {
    return {
      demande
    }
  }
}
</script>

<template>
<main class="main">
  <div class="container">
    
      <ListeConseillers v-if="!demande" />
      <chatConseiller v-else />

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