<template>
  <div class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="relative bg-white rounded-lg shadow-lg w-full max-w-lg">
      <div class="p-6">
        <h3 class="text-lg font-bold">{{ localProduct.id ? 'Modifier' : 'Ajouter' }} un Produit</h3>
        <form @submit.prevent="submitForm">
          <label class="text-blueGray-700 font-bold mb-2">Nom</label>
          <input
            v-model="localProduct.product_name"
            type="text"
            placeholder="Nom du produit"
            class="form-input"
          />
          <label class="text-blueGray-700 font-bold mb-2">Description</label>
          <textarea
            v-model="localProduct.description"
            placeholder="Description du produit"
            class="form-textarea"
          ></textarea>
          <label class="text-blueGray-700 font-bold mb-2">Prix</label>
          <input
            v-model.number="localProduct.price"
            type="number"
            step="0.01"
            placeholder="Prix du produit"
            class="form-input"
          />
          <label class="text-blueGray-700 font-bold mb-2">Quantité</label>
          <input
            v-model.number="localProduct.quantity"
            type="number"
            placeholder="Quantité en stock"
            class="form-input"
          />
          <label class="text-blueGray-700 font-bold mb-2">Catégorie</label>
          <select
            v-model="localProduct.category_id"
            class="form-select"
          >
            <option value="">Sélectionner une catégorie</option>
            <option v-for="category in localCategories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <label class="text-blueGray-700 font-bold mb-2">Image</label>
          <input
            type="file"
            @change="handleFileUpload"
            class="form-input"
          />
          <button type="submit" class="bg-blueGray-700 text-white px-4 py-2 rounded mt-4">
            {{ localProduct.id ? 'Modifier' : 'Ajouter' }}
          </button>
        </form>
      </div>
      <button @click="$emit('close')" class="absolute top-2 right-2 text-gray-500">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    categories: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      localProduct: { ...this.product },
      localCategories: [], // Utiliser une propriété locale pour les catégories
      selectedFile: null,
    };
  },
  watch: {
    product: {
      handler(newValue) {
        this.localProduct = { ...newValue };
      },
      deep: true,
    },
    categories: {
      handler(newValue) {
        this.localCategories = [...newValue];
      },
      immediate: true,
    },
  },
  async mounted() {
    this.fetchCategories(); // Assurez-vous de récupérer les catégories lors du montage
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories');
        this.localCategories = response.data;
        console.log('Categories:', this.localCategories); // Assurez-vous que les catégories sont récupérées
      } catch (error) {
        console.error("Erreur lors de la récupération des catégories:", error);
      }
    },
    handleFileUpload(event) {
  this.selectedFile = event.target.files[0];
},
    async submitForm() {
  try {
    // Vérifiez les champs requis
    if (!this.localProduct.product_name) {
      throw new Error("Le nom du produit est requis");
    }
    if (!this.localProduct.price || isNaN(this.localProduct.price)) {
      throw new Error("Le prix doit être un nombre");
    }
    if (this.localProduct.quantity < 0) {
      throw new Error("La quantité doit être un entier positif");
    }

    const formData = new FormData();
    formData.append('product_name', this.localProduct.product_name);
    formData.append('description', this.localProduct.description || '');
    formData.append('price', this.localProduct.price);
    formData.append('quantity', this.localProduct.quantity);
    formData.append('category_id', this.localProduct.category_id || null);
    if (this.selectedFile) {
  formData.append('image', this.selectedFile);
}
console.log('FormData:', [...formData.entries()]);

    const url = this.localProduct.id 
      ? `/api/products/${this.localProduct.id}` 
      : '/api/products';
    const method = this.localProduct.id ? 'put' : 'post';

    const response = await axios({ method, url, data: formData });
    console.log('Produit enregistré avec succès:', response.data);
    this.$emit('save');
  } catch (error) {
    console.error("Erreur lors de l'enregistrement du produit:", error.message);
    console.error("Réponse de l'API:", error.response?.data);
  }
}
,
  },
};
</script>

<style scoped>
.form-input {
  border: 1px solid #d3d3d3;
  border-radius: 0.375rem;
  padding: 0.5rem;
}

.form-textarea {
  border: 1px solid #d3d3d3;
  border-radius: 0.375rem;
  padding: 0.5rem;
  resize: vertical;
}

.form-select {
  border: 1px solid #d3d3d3;
  border-radius: 0.375rem;
  padding: 0.5rem;
}
</style>
