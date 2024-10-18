<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border border-gray-200">
    <div class="rounded-t bg-white text-blueGray-700 mb-0 px-6 py-6">
      <div class="text-center flex justify-between items-center">
        <h6 class="text-xl font-bold text-blueGray-700">Gestion des Conducteurs</h6>
        <button @click="goToDriverLocations" class="bg-blueGray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105">Gérer les Localisations des Conducteurs</button>
        <button 
          @click="navigateToAddDriver"
          class="bg-blueGray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
        >
          Ajouter un Conducteur
        </button>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <!-- Liste des conducteurs -->
      <div class="overflow-x-auto mt-4 max-h-screen" style="max-height: 70vh;">
        <table class="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead class="bg-blueGray-100 text-blueGray-700">
            <tr>
              <th class="py-3 px-4 uppercase font-semibold text-sm">ID</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Prénom</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Nom</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Téléphone</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Email</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Type de Véhicule</th>
              <th class="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="driver in drivers" :key="driver.id" class="text-blueGray-700 hover:bg-gray-100 transition duration-200">
              <td class="py-2 px-4 border-b">{{ driver.id }}</td>
              <td class="py-2 px-4 border-b">{{ driver.first_name }}</td>
              <td class="py-2 px-4 border-b">{{ driver.last_name }}</td>
              <td class="py-2 px-4 border-b">{{ driver.phone }}</td>
              <td class="py-2 px-4 border-b">{{ driver.email }}</td>
              <td class="py-2 px-4 border-b">{{ driver.vehicle_type }}</td>
              <td class="py-2 px-4 border-b flex space-x-2">
                <button @click="navigateToEditDriver(driver.id)" class="bg-yellow-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:bg-yellow-400 transition-all duration-200 ease-in-out">Modifier</button>
                <button @click="confirmDelete(driver.id)" class="bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      drivers: [],
    };
  },
  methods: {
    goToDriverLocations() {
      this.$router.push({ name: 'DriverLocationManagement' });
    },
    async fetchDrivers() {
      try {
        const response = await axios.get('http://localhost:8000/api/drivers/all');
        this.drivers = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des conducteurs:', error);
      }
    },
    navigateToAddDriver() {
      this.$router.push({ name: 'AddDriver' });
    },
    navigateToEditDriver(id) {
      this.$router.push({ name: 'EditDriver', params: { id } });
    },
    confirmDelete(id) {
      if (confirm('Êtes-vous sûr de vouloir supprimer ce conducteur ?')) {
        this.deleteDriver(id);
      }
    },
    async deleteDriver(id) {
      try {
        await axios.delete(`http://localhost:8000/api/drivers/${id}`);
        this.fetchDrivers(); // Recharger la liste des conducteurs
      } catch (error) {
        console.error('Erreur lors de la suppression du conducteur:', error);
      }
    }
  },
  mounted() {
    this.fetchDrivers();
  }
};
</script>

<style scoped>
.table {
  width: 100%;
}
</style>
