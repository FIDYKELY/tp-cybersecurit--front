<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border border-gray-200">
      <div class="rounded-t bg-white text-blueGray-700 mb-0 px-6 py-6">
        <div class="text-center flex justify-between items-center">
          <h6 class="text-xl font-bold text-blueGray-700">Gestion des Localisations des Conducteurs</h6>
          <button @click="openModal" class="bg-blueGray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105">Ajouter une Localisation</button>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <!-- Liste des localisations -->
        <div class="overflow-x-auto mt-4 max-h-screen" style="max-height: 70vh;">
          <table class="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead class="bg-blueGray-100 text-blueGray-700">
              <tr>
                <th class="py-3 px-4 uppercase font-semibold text-sm">ID</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Conducteur</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Latitude</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Longitude</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="location in driverLocations" :key="location.id" class="text-blueGray-700 hover:bg-gray-100 transition duration-200">
                <td class="py-2 px-4 border-b">{{ location.id }}</td>
                <td class="py-2 px-4 border-b">{{ location.driver_id }}</td>
                <td class="py-2 px-4 border-b">{{ location.latitude }}</td>
                <td class="py-2 px-4 border-b">{{ location.longitude }}</td>
                <td class="py-2 px-4 border-b flex space-x-2">
                  <button @click="editLocation(location.id)" class="bg-yellow-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:bg-yellow-400 transition-all duration-200 ease-in-out">Modifier</button>
                  <button @click="deleteLocation(location.id)" class="bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">Supprimer</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Modal for adding/updating location -->
      <div v-if="showModal" class="modal">
        <div class="modal-content">
          <span @click="closeModal" class="close">&times;</span>
          <h3>{{ isEdit ? 'Modifier' : 'Ajouter' }} une Localisation</h3>
          <form @submit.prevent="saveLocation">
            <label for="driver_id">Conducteur</label>
            <select v-model="location.driver_id" required>
              <option value="" disabled>Sélectionnez un conducteur</option>
              <option v-for="driver in drivers" :key="driver.id" :value="driver.id">
                {{ driver.first_name }} <!-- Assurez-vous que 'name' correspond au nom du conducteur -->
              </option>
            </select>
  
            <label for="latitude">Latitude</label>
            <input v-model="location.latitude" type="text" required />
  
            <label for="longitude">Longitude</label>
            <input v-model="location.longitude" type="text" required />
  
            <button type="submit" class="bg-green-500 text-white py-2 px-4 rounded">{{ isEdit ? 'Modifier' : 'Ajouter' }}</button>
            <button type="button" @click="closeModal" class="bg-gray-500 text-white py-2 px-4 rounded ml-2">Annuler</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        driverLocations: [],
        drivers: [], // Liste des conducteurs
        showModal: false,
        isEdit: false,
        location: {
          driver_id: '',
          latitude: '',
          longitude: ''
        },
      };
    },
    methods: {
      openModal() {
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
        this.resetForm();
      },
      resetForm() {
        this.location = {
          driver_id: '',
          latitude: '',
          longitude: ''
        };
        this.isEdit = false;
      },
      async fetchDriverLocations() {
        try {
          const response = await axios.get('http://localhost:8000/api/deliveries/driver-locations');
          this.driverLocations = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des localisations des conducteurs:', error);
        }
      },
      async fetchDrivers() {
        try {
          const response = await axios.get('http://localhost:8000/api/drivers/all'); // Mettez à jour l'URL avec votre endpoint des conducteurs
          this.drivers = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération des conducteurs:', error);
        }
      },
      async saveLocation() {
        if (this.isEdit) {
          await axios.put(`http://localhost:8000/api/deliveries/driver-locations/${this.location.id}`, this.location);
        } else {
          await axios.post('http://localhost:8000/api/deliveries/driver-locations', this.location);
        }
        this.closeModal();
        this.fetchDriverLocations();
      },
      async deleteLocation(id) {
        await axios.delete(`http://localhost:8000/api/deliveries/driver-locations/${id}`);
        this.fetchDriverLocations();
      },
      editLocation(id) {
        const location = this.driverLocations.find(loc => loc.id === id);
        this.location = { ...location };
        this.isEdit = true;
        this.showModal = true;
      }
    },
    mounted() {
      this.fetchDriverLocations();
      this.fetchDrivers(); // Récupérer la liste des conducteurs
    }
  };
  </script>
  
  <style scoped>
  .modal {
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-content {
    background-color: #fefefe;
    margin: 15% auto;
    padding: 20px;
    border: 1px solid #888;
    width: 80%;
    max-width: 600px;
  }
  .close {
    color: #aaa;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }
  .close:hover,
  .close:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
  }
  </style>
  