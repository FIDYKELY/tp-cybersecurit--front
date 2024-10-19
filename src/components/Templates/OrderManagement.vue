<template>
    <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border border-gray-200">
      <div class="rounded-t bg-white text-blueGray-700 mb-0 px-6 py-6">
        <div class="text-center flex justify-between items-center">
          <h6 class="text-xl font-bold text-blueGray-700">Gestion des Commandes</h6>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <!-- Liste des commandes -->
        <div class="overflow-x-auto mt-4 max-h-screen" style="max-height: 70vh;">
          <table class="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
            <thead class="bg-blueGray-100 text-blueGray-700">
              <tr>
                <th class="py-3 px-4 uppercase font-semibold text-sm">ID</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Utilisateur</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Montant Total</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Statut</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Adresse</th>
                <th class="py-3 px-4 uppercase font-semibold text-sm">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="order in orders" :key="order.id" class="text-blueGray-700 hover:bg-gray-100 transition duration-200">
                <td class="py-2 px-4 border-b">{{ order.id }}</td>
                <td class="py-2 px-4 border-b">{{ order.user_id }}</td>
                <td class="py-2 px-4 border-b">{{ order.total_amount }}</td>
                <td class="py-2 px-4 border-b">{{ order.status }}</td>
                <td class="py-2 px-4 border-b">{{ order.delivery_address }}</td>
                <td class="py-2 px-4 border-b">
                  <button @click="editOrder(order.id)" class="bg-blue-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:bg-blue-600 transition-all duration-200 ease-in-out">Modifier</button>
                  <button @click="deleteOrder(order.id)" class="bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:bg-red-600 transition-all duration-200 ease-in-out">Supprimer</button>
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
        orders: []
      };
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await axios.get('/api/orders'); // Adapter selon votre route API
          this.orders = response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des commandes", error);
        }
      },
      editOrder(orderId) {
        // Redirigez vers une page de modification ou ouvrez un modal
        this.$router.push(`/orders/${orderId}/edit`);
      },
      async deleteOrder(orderId) {
        if (confirm("Êtes-vous sûr de vouloir supprimer cette commande ?")) {
          try {
            await axios.delete(`/api/orders/${orderId}`);
            this.fetchOrders(); // Recharger la liste après suppression
          } catch (error) {
            console.error("Erreur lors de la suppression de la commande", error);
          }
        }
      }
    },
    mounted() {
      this.fetchOrders();
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez ici le style pour votre table et les autres éléments */
  </style>
  