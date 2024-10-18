<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center">
        <h6 class="text-blueGray-700 text-xl font-bold">Modifier le Produit</h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form @submit.prevent="updateProduct" class="space-y-4">
        <div>
          <label class="font-bold text-blueGray-700">Nom du produit:</label>
          <input v-model="product.product_name" placeholder="Nom du produit" class="border rounded w-full p-2" required />
        </div>
        <div>
          <label class="font-bold text-blueGray-700">Description du produit:</label>
          <textarea v-model="product.description" placeholder="Description du produit" class="border rounded w-full p-2" required></textarea>
        </div>
        <div>
          <label class="font-bold text-blueGray-700">Prix du produit:</label>
          <input type="number" v-model="product.price" placeholder="Prix du produit" class="border rounded w-full p-2" required />
        </div>
        <div>
          <label class="font-bold text-blueGray-700">Quantité en stock:</label>
          <input type="number" v-model="product.stock" placeholder="Quantité en stock" class="border rounded w-full p-2" required />
        </div>
        <div>
          <label class="font-bold text-blueGray-700">Catégorie:</label>
          <select v-model="product.category_id" class="border rounded w-full p-2">
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
        <div>
          <label class="font-bold text-blueGray-700">Image:</label>
          <input type="file" @change="handleImageUpload" class="border rounded w-full p-2" />
          <p v-if="imageName" class="text-blueGray-600 mt-2">Fichier sélectionné: {{ imageName }}</p>
        </div>
        <button type="submit" class="bg-blueGray-700 text-white font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150">
          Mettre à Jour
        </button>
        <router-link to="/admin/products" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
          Retour
        </router-link>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      product: {
        product_name: '',
        description: '',
        price: 0,
        stock: 0,
        category_id: null,
        image: null,
      },
      categories: [],
      imageName: '',
    };
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await axios.get(`/api/products/${this.$route.params.id}`);
        this.product = response.data;
      } catch (error) {
        console.error("Erreur lors de la récupération du produit:", error);
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
    handleImageUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.product.image = file;
        this.imageName = file.name;
      }
    },
    async updateProduct() {
      const formData = new FormData();
      formData.append('product_name', this.product.product_name);
      formData.append('description', this.product.description);
      formData.append('price', this.product.price);
      formData.append('quantity', this.product.stock); // Changez 'stock' à 'quantity'
      formData.append('category_id', this.product.category_id);
      if (this.product.image) {
        formData.append('image', this.product.image);
      }

      try {
        await axios.put(`/api/products/${this.product.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        this.$router.push({ name: 'ProductManagement' });
      } catch (error) {
        console.error("Erreur lors de la mise à jour du produit:", error);
      }
    },
  },
  mounted() {
    this.fetchProduct();
    this.fetchCategories();
  },
};
</script>
