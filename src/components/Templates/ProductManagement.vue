<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border border-gray-200">
    <div class="rounded-t bg-white text-blueGray-700 mb-0 px-6 py-6">
      <div class="text-center flex justify-between items-center">
        <router-link to="/admin/products" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded transition duration-200">
          Retour
        </router-link>
        <h6 class="text-xl font-bold text-blueGray-700">Gestion des Produits</h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <button 
        @click="navigateToAddProduct"
        class="bg-blueGray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out transform hover:scale-105"
      >
        Ajouter un Produit
      </button>

      <!-- Liste des produits -->
      <div class="overflow-x-auto mt-4 max-h-screen" style="max-height: 70vh;">
        <table class="min-w-full bg-white border border-gray-200 shadow-lg rounded-lg">
          <thead class="bg-blueGray-100 text-blueGray-700">
            <tr>
              <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Nom</th>
              <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Description</th>
              <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Prix</th>
              <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Catégorie</th>
              <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="text-blueGray-700 hover:bg-gray-100 transition duration-200">
              <td class="w-1/6 py-3 px-4 border-b border-gray-200">{{ product.product_name }}</td>
              <td class="w-1/3 py-3 px-4 border-b border-gray-200">{{ product.description }}</td>
              <td class="w-1/6 py-3 px-4 border-b border-gray-200">{{ product.price }}</td>
              <td class="w-1/6 py-3 px-4 border-b border-gray-200">{{ getCategoryName(product.category_id) }}</td>
              <td class="w-1/6 py-3 px-4 border-b border-gray-200 flex space-x-2">
              <button
                @click="navigateToEditProduct(product.id)"
                class="bg-yellow-300 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:bg-yellow-400 transition-all duration-200 ease-in-out"
              >
                Modifier
              </button>
              <button
                @click="confirmDelete(product.id)"
                class="bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
              >
                Supprimer
              </button>
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
      products: [],
      categories: [],
    };
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await axios.get('/api/products');
        this.products = response.data;
      } catch (error) {
        alert("Erreur lors de la récupération des produits.");
        console.error("Erreur lors de la récupération des produits:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data;
      } catch (error) {
        alert("Erreur lors de la récupération des catégories.");
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    },
    navigateToAddProduct() {
      this.$router.push({ name: 'AddProduct' });
    },
    navigateToEditProduct(id) {
      this.$router.push({ name: 'EditProduct', params: { id } });
    },
    async confirmDelete(id) {
      if (confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
        await this.deleteProduct(id);
      }
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`/api/products/${id}`);
        this.fetchProducts();
      } catch (error) {
        alert("Erreur lors de la suppression du produit.");
        console.error("Erreur lors de la suppression du produit:", error);
      }
    },
    getCategoryName(categoryId) {
      const category = this.categories.find(cat => cat.id === categoryId);
      return category ? category.name : "Inconnue";
    }
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategories();
  }
};
</script>
