<script>
import {getConseillers} from '../services/api.js'
import axios from 'axios'

const conseillers = await getConseillers()

export default {
  name: 'ListConseillersView',
  data () {
    return {
      conseillers
    }
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
      if (response.data.success) {
        window.location.reload()
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

</style>