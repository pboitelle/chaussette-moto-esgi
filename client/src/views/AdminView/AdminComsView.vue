<script>
import {getDemandes} from '../../services/api.js'
import axios from 'axios'

const demandes = await getDemandes()

export default {
  name: 'demandes',
  data() {
    return {
      demandes
    }
  },
  setup () {
    const handleAccepted = async (id_demande, id_conseiller) => {
      const response = await axios.post('http://localhost:9000/api/demande/accepted', JSON.stringify({
        id_demande: id_demande,
        id_conseiller: id_conseiller
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      if (response.data.success) {
        window.location.reload()
      }
    }

    const handleRefused = async (id_demande, id_conseiller) => {
      const response = await axios.post('http://localhost:9000/api/demande/refused', JSON.stringify({
        id_demande: id_demande,
        id_conseiller: id_conseiller
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
      handleAccepted,
      handleRefused
    }
  }
}
</script>

<template>
  <div>
    <h1>Liste des demandes de communications</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">User</th>
          <th scope="col">Conseiller</th>
          <th scope="col">Accepté</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="demande in demandes" :key="demande.id">
          <td>{{ demande.id }}</td>
          <td>{{ demande.email }}</td>
          <td>{{ demande.nom + " " + demande.prenom }}</td>
          <td v-if="!demande.isAccepted">
            <button class="btn btn-success" @click="handleAccepted(demande.id, demande.id_conseiller)">Accepter</button>
            <button class="btn btn-danger" @click="handleRefused(demande.id, demande.id_conseiller)">Refuser</button>
          </td>
          <td v-else>
            <div style="color: orange;">En communication <button class="btn btn-danger" @click="handleRefused(demande.id)">Stop</button></div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  color: white;
}
</style>