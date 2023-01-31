<script>
import {getSalons} from '../../services/api.js'
import axios from 'axios'
import {ref} from 'vue'


const salons = await getSalons()

export default {
  name: 'salons',
  data() {
    return {
      salons
    }
  },
  setup () {
    const nb_max = ref('')
    const nom = ref('')

    const handleCreateSalon =  async () => {
      const response = await axios.post('http://localhost:9000/api/salon/create', JSON.stringify({
        nom: nom.value,
        nb_max: nb_max.value
      }), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(response)
      if(response.data.success) {
        alert('Salon créé !')
      }
    }

    const handleDeleteSalon = async (id) => {
      const response = await axios.delete(`http://localhost:9000/api/salon/delete/${id}`)
      console.log(response)
      if(response.data.success) {
        alert('Salon supprimé !')
      }
    }

    return {
      nb_max,
      nom,
      handleCreateSalon,
      handleDeleteSalon
    }
  }
}
</script>

<template>
  <div>
    <h2>Créer un salon</h2>
    <form id="sendbox" @submit.prevent="handleCreateSalon" class="mb-5">
      <div class="form-group">
        <label for="nom">Nom</label>
        <input type="text" class="form-control" id="nom" name="nom" v-model="nom" placeholder="Nom du salon">
      </div>
      <div class="form-group">
        <label for="nb_max">Nombre max de clients</label>
        <input type="number" class="form-control" id="nb_max" v-model="nb_max" name="nb_max" placeholder="Nombre max de clients">
      </div>
      <button type="submit" class="btn btn-primary">Créer</button>
    </form>


    <h1>Liste des salons</h1>
    <table class="table">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Salon</th>
          <th scope="col">Nombre max clients</th>
          <th scope="col">Delete</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="salon in salons" :key="salon.id">
          <td>{{ salon.id }}</td>
          <td>{{ salon.nom }}</td>
          <td>{{ salon.nb_max }}</td>
          <td><button class="btn btn-danger" @click="handleDeleteSalon(salon.id)">Delete</button></td>
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