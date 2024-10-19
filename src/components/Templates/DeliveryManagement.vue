<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border border-gray-200">
      <div class="rounded-t bg-white text-blueGray-700 mb-0 px-6 py-6">
        <div class="text-center flex justify-between items-center">
          <h6 class="text-xl font-bold text-blueGray-700">Gestion des Livraisons</h6>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <!-- Carte pour visualiser la livraison -->
        <div v-if="clientLocation && driverLocation" class="my-4">
          <div id="map" style="height: 400px;"></div>
        </div>
  
        <!-- Liste des livraisons -->
        <div class="overflow-x-auto mt-4 max-h-screen" style="max-height: 70vh;">
          <table class="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead class="bg-blueGray-100 text-blueGray-700">
              <tr>
                <th class="py-3 px-4 uppercase font-semibold text-sm">ID</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Commande ID</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Conducteur</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Statut</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="delivery in deliveries" :key="delivery.id" class="text-blueGray-700 hover:bg-gray-100 transition duration-200">
                <td class="py-2 px-4 border-b">{{ delivery.id }}</td>
                <td class="py-2 px-4 border-b">{{ delivery.order_id }}</td>
                <td class="py-2 px-4 border-b">{{ delivery.driver_id }}</td>
                <td class="py-2 px-4 border-b">{{ delivery.delivery_status }}</td>
                <td class="py-2 px-4 border-b">
                  <button @click="viewDelivery(delivery.order_id, delivery.driver_id)" class="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out">Voir</button>
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
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

export default {
  data() {
    return {
      deliveries: [],
      clientLocation: null,
      driverLocation: null,
      map: null,
    };
  },
  methods: {
    async fetchDeliveries() {
      try {
        const response = await axios.get('http://localhost:8000/api/deliveries');
        this.deliveries = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération des livraisons:', error);
      }
    },
    async viewDelivery(order_id, driver_id) {
      try {
        const orderResponse = await axios.get(`http://localhost:8000/api/orders/${order_id}`);
        this.clientLocation = {
          latitude: orderResponse.data.latitude,
          longitude: orderResponse.data.longitude
        };

        const driverResponse = await axios.get(`http://localhost:8000/api/deliveries/driver-locations/${driver_id}`);
        this.driverLocation = {
          latitude: driverResponse.data.latitude,
          longitude: driverResponse.data.longitude
        };

        console.log('Client Location:', this.clientLocation);
        console.log('Driver Location:', this.driverLocation);

        this.$nextTick(() => {
          this.initMap();
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des positions:', error);
      }
    },
    initMap() {
      if (!this.map) {
        this.map = L.map('map').setView([this.clientLocation.latitude, this.clientLocation.longitude], 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 19,
          attribution: '© OpenStreetMap'
        }).addTo(this.map);
      }

      L.marker([this.clientLocation.latitude, this.clientLocation.longitude])
        .addTo(this.map)
        .bindPopup('Client Position')
        .openPopup();

      L.marker([this.driverLocation.latitude, this.driverLocation.longitude])
        .addTo(this.map)
        .bindPopup('Livreur Position')
        .openPopup();

      const bounds = L.latLngBounds([
        [this.clientLocation.latitude, this.clientLocation.longitude],
        [this.driverLocation.latitude, this.driverLocation.longitude]
      ]);
      this.map.fitBounds(bounds);
    }
  },
  mounted() {
    this.fetchDeliveries();
  }
};
</script>

  
  <style scoped>
  /* Styles spécifiques pour la carte */
  #map {
    height: 400px;
  }
  </style>
  