<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border border-gray-200 p-6">
      <h2 class="text-2xl font-semibold mb-4 text-blueGray-700 text-center">
        {{ isEdit ? 'Modifier' : 'Ajouter' }} un Conducteur
      </h2>
      <form @submit.prevent="saveDriver">
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Prénom</label>
          <input 
            v-model="driver.first_name" 
            type="text" 
            class="mt-1 block w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Nom</label>
          <input 
            v-model="driver.last_name" 
            type="text" 
            class="mt-1 block w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Téléphone</label>
          <input 
            v-model="driver.phone" 
            type="text" 
            class="mt-1 block w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input 
            v-model="driver.email" 
            type="email" 
            class="mt-1 block w-full p-2 border border-gray-300 rounded" 
            required 
          />
        </div>
        <div class="mb-4">
          <label class="block text-sm font-medium text-gray-700">Type de Véhicule</label>
          <input 
            v-model="driver.vehicle_type" 
            type="text" 
            class="mt-1 block w-full p-2 border border-gray-300 rounded" 
          />
        </div>
        <div class="flex justify-end">
          <button 
            type="submit" 
            class="bg-green-500 text-white py-2 px-4 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105 mr-2">
            {{ isEdit ? 'Modifier' : 'Ajouter' }}
          </button>
          <button 
            type="button" 
            @click="cancel" 
            class="bg-gray-500 text-white py-2 px-4 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105">
            Annuler
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        isEdit: false,
        driver: {
          first_name: '',
          last_name: '',
          phone: '',
          email: '',
          vehicle_type: '',
        }
      };
    },
    methods: {
      async saveDriver() {
        try {
          if (this.isEdit) {
            await axios.put(`http://localhost:8000/api/drivers/${this.driver.id}`, this.driver);
          } else {
            await axios.post('http://localhost:8000/api/drivers/create', this.driver);
          }
          this.$router.push({ name: 'DriverList' }); // Redirige vers la liste des conducteurs
        } catch (error) {
          console.error('Erreur lors de la sauvegarde du conducteur:', error);
        }
      },
      async fetchDriver(id) {
        try {
          const response = await axios.get(`http://localhost:8000/api/drivers/${id}`);
          this.driver = response.data;
        } catch (error) {
          console.error('Erreur lors de la récupération du conducteur:', error);
        }
      },
      cancel() {
        this.$router.push({ name: 'DriverList' }); // Redirige vers la liste des conducteurs
      }
    },
    mounted() {
      const driverId = this.$route.params.id;
      if (driverId) {
        this.isEdit = true;
        this.fetchDriver(driverId);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Aucun style supplémentaire requis ici, les styles sont gérés par Tailwind */
  </style>
  