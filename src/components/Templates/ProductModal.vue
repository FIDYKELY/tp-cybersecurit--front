<template>
    <div class="fixed inset-0 bg-gray-600 bg-opacity-75 flex justify-center items-center">
      <div class="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <div class="flex items-center justify-between mb-6">
          <button @click="$emit('close')" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
            Annuler
          </button>
          <h2 class="text-blueGray-700 text-xl font-bold text-center flex-1">{{ product ? 'Modifier' : 'Ajouter' }} un Produit</h2>
        </div>
        <form @submit.prevent="submit">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="product_name">
              Nom du produit
            </label>
            <input v-model="form.product_name" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="product_name" type="text" placeholder="Nom du produit" required>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="description">
              Description
            </label>
            <textarea v-model="form.description" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="Description du produit"></textarea>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="price">
              Prix
            </label>
            <input v-model="form.price" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="price" type="number" step="0.01" placeholder="Prix" required>
          </div>
  
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-bold mb-2" for="category_id">
              Catégorie
            </label>
            <select v-model="form.category_id" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="category_id" required>
              <option value="" disabled>Sélectionnez une catégorie</option>
              <option value="1">Catégorie 1</option>
              <option value="2">Catégorie 2</option>
              <option value="3">Catégorie 3</option>
            </select>
          </div>
  
          <div class="flex justify-end space-x-2 mt-4">
            <button type="button" class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded" @click="$emit('close')">
              Annuler
            </button>
            <button type="submit" class="bg-blueGray-700 hover:bg-blueGray-800 text-white font-bold py-2 px-4 rounded">
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  </template>
  
  
  <script>
  export default {
    props: {
      product: {
        type: Object,
        default: null,
      }
    },
    data() {
      return {
        form: {
          product_name: '',
          description: '',
          price: null,
          category_id: '',
        }
      };
    },
    watch: {
      product: {
        immediate: true,
        handler(newProduct) {
          if (newProduct) {
            this.form = { ...newProduct };
          } else {
            this.form = {
              product_name: '',
              description: '',
              price: null,
              category_id: '',
            };
          }
        }
      }
    },
    methods: {
      submit() {
        if (this.form.product_name && this.form.price && this.form.category_id) {
          this.$emit('save', { ...this.form });
        } else {
          alert("Veuillez remplir tous les champs obligatoires.");
        }
      }
    }
  };
  </script>
  