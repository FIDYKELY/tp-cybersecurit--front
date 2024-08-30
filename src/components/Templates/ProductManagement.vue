<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <router-link to="/admin/products" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Retour
        </router-link>
        <h6 class="text-blueGray-700 text-xl font-bold">Gestion des Produits</h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <button 
        @click="navigateToAddProduct"
        class="bg-blueGray-700 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
      >
        Ajouter un Produit
      </button>

      <!-- Liste des produits -->
      <div class="overflow-x-auto mt-4 max-h-screen" style="max-height: 70vh;">
        <table class="min-w-full bg-white border-0 shadow-lg rounded-lg">
          <thead class="bg-blueGray-700 text-white">
            <tr>
              <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Nom</th>
              <th class="w-1/3 py-3 px-4 uppercase font-semibold text-sm">Description</th>
              <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Prix</th>
              <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Catégorie</th>
              <th class="w-1/6 py-3 px-4 uppercase font-semibold text-sm">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="product in products" :key="product.id" class="text-blueGray-700">
              <td class="w-1/6 py-3 px-4">{{ product.product_name }}</td>
              <td class="w-1/3 py-3 px-4">{{ product.description }}</td>
              <td class="w-1/6 py-3 px-4">{{ product.price }}</td>
              <td class="w-1/6 py-3 px-4">{{ getCategoryName(product.category_id) }}</td>
              <td class="w-1/6 py-3 px-4">
                <button
                  @click="navigateToEditProduct(product.id)"
                  class="bg-yellow-400 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                >
                  Modifier
                </button>
                <button
                  @click="deleteProduct(product.id)"
                  class="bg-red-500 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
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
        console.error("Erreur lors de la récupération des produits:", error);
      }
    },
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        this.categories = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    },
    navigateToAddProduct() {
      this.$router.push({ name: 'AddProduct' });
    },
    navigateToEditProduct(id) {
      this.$router.push({ name: 'EditProduct', params: { id } });
    },
    async deleteProduct(id) {
      try {
        await axios.delete(`/api/products/${id}`);
        this.fetchProducts();
      } catch (error) {
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
