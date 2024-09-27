<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
    <div class="rounded-t bg-white mb-0 px-6 py-6">
      <div class="text-center flex justify-between">
        <h6 class="text-blueGray-700 text-xl font-bold">{{ localProduct.id ? 'Modifier' : 'Ajouter' }} un Produit</h6>
      </div>
    </div>
    <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
      <form @submit.prevent="submitForm">
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <label class="text-blueGray-700 font-bold mb-2">Nom</label>
            <input
              v-model="localProduct.product_name"
              type="text"
              placeholder="Nom du produit"
              class="form-input"
            />
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <label class="text-blueGray-700 font-bold mb-2">Description</label>
            <textarea
              v-model="localProduct.description"
              placeholder="Description du produit"
              class="form-textarea"
            ></textarea>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <label class="text-blueGray-700 font-bold mb-2">Prix</label>
            <input
              v-model.number="localProduct.price"
              type="number"
              step="0.01"
              placeholder="Prix du produit"
              class="form-input"
            />
          </div>
          <div class="w-full lg:w-6/12 px-4">
            <label class="text-blueGray-700 font-bold mb-2">Quantité</label>
            <input
              v-model.number="localProduct.quantity"
              type="number"
              placeholder="Quantité en stock"
              class="form-input"
            />
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
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
            <button @click="addCategory" class="bg-blueGray-700 text-white px-4 py-2 rounded mt-2">
              Ajouter une catégorie
            </button>
            <button @click="deleteCategory" class="bg-red-700 text-white px-4 py-2 rounded mt-2">
              Supprimer la catégorie
            </button>
          </div>
        </div>
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 px-4">
            <label class="text-blueGray-700 font-bold mb-2">Image</label>
            <input
              type="file"
              @change="handleFileUpload"
              class="form-input"
            />
          </div>
        </div>
        <button type="submit" class="bg-blueGray-700 text-white px-4 py-2 rounded mt-4">
          {{ localProduct.id ? 'Modifier' : 'Ajouter' }}
        </button>
      </form>
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
    async addCategory() {
    // Open a prompt to enter the new category name
    const categoryName = prompt('Enter the new category name:');
    if (categoryName) {
      try {
        const response = await axios.post('/api/categories', { name: categoryName });
        this.localCategories.push(response.data);
        console.log('Category created successfully:', response.data);
      } catch (error) {
        console.error('Error creating category:', error);
      }
    }
  },
  async deleteCategory() {
    if (this.localProduct.category_id) {
      const categoryName = this.localCategories.find(category => category.id === this.localProduct.category_id).name;
      const confirmDelete = confirm(`Voulez-vous vraiment supprimer la catégorie "${categoryName}" ?`);
      if (confirmDelete) {
        try {
          const response = await axios.delete(`/api/categories/${this.localProduct.category_id}`);
          this.localCategories = this.localCategories.filter(category => category.id !== this.localProduct.category_id);
          console.log('Category deleted successfully:', response.data);
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      }
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
},
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
