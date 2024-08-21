<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
      <div class="rounded-t bg-white mb-0 px-6 py-6">
        <div class="text-center flex justify-between">
          <router-link to="/admin/roles">
            Retour
          </router-link>
          <h6 class="text-blueGray-700 text-xl font-bold">Gestion des rôles</h6>
        </div>
      </div>
      <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
        <div v-if="roles.length > 0" class="mt-4">
          <h3 class="text-blueGray-700 text-lg font-bold">Tous les rôles:</h3>
          <ul>
            <li v-for="role in roles" :key="role.id" class="text-blueGray-700 text-sm flex justify-between items-center">
              <div v-if="role.id !== editingRoleId" @click="startEditingRole(role.id)">
                {{ role.name }}
              </div>
              <input v-else v-model="role.name" @blur="finishEditingRole(role.id)" @keyup.enter="finishEditingRole(role.id)" class="border-2 border-blueGray-500 rounded-md px-2 py-1">
              <div>
                <button @click="editRole(role.id)" class="bg-blueGray-700 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  Modifier
                </button>
                <button @click="deleteRole(role.id)" class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                  Supprimer
                </button>
                <button v-if="$route.params.userId" @click="assignRoleToUser(role.id)" class="bg-blueGray-700 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                Attribuer un rôle à l'utilisateur
              </button>
              </div>
            </li>
            <form @submit.prevent="addRole">
              <input type="text" v-model="newRoleName" placeholder="Nom du role" required>
              <button type="submit" class="bg-blueGray-700 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
                Ajouter
              </button>
            </form>
          </ul>
        </div>
      </div>
  </div>
 </template>
 
 <script>
import axios from 'axios';

export default {
  components: {
 },
 data() {
    return {
      roles: [],
      editingRoleId: null,
      showCardPermission: false, 
      selectedRoleName: '', 
      selectedRolePermissions: [], 
    };
 },
 methods: {
    async getAllRoles() {
      try {
        const response = await axios.get('/api/roles');
        this.roles = response.data;
      } catch (error) {
        console.error('Erreur lors de la récupération de tous les rôles:', error);
      }
    },
    editRole(roleId) {
      this.showCardPermission = true;
      this.$router.push({ name: 'EditRolePermissions', params: { roleId } });
    },
    startEditingRole(roleId) {
      this.editingRoleId = roleId;
    },
    async finishEditingRole(roleId) {
    this.editingRoleId = null;
    const role = this.roles.find(r => r.id === roleId);
    if (role) {
        try {
          await axios.post(`/api/roles/${roleId}/update`, { name: role.name });
          console.log('Nom du rôle mis à jour avec succès');
          this.getAllRoles(); 
        } catch (error) {
          console.error('Erreur lors de la mise à jour du nom du rôle:', error);
        }
    }
    },

    async addRole() {
      try {
        const response = await axios.post('/api/roles', { name: this.newRoleName });
        this.roles.push(response.data);
        this.newRoleName = '';
      } catch (error) {
        console.error('Erreur lors de l\'ajout du role:', error);
      }
    },
    async deleteRole(roleId) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer ce rôle ? Cette action est irréversible.");

    if (confirmation) {
        try {
          await axios.post(`/api/roles/${roleId}/delete`);
          console.log('Rôle supprimé avec succès');
          this.getAllRoles(); 
        } catch (error) {
          console.error('Erreur lors de la suppression du rôle:', error);
        }
    } else {
        console.log('Suppression annulée');
    }
    },
    async assignRoleToUser(roleId) {
    try {
      const userId = this.$route.params.userId; 

      await axios.post(`/api/users/${userId}/assign-role/${roleId}`);
      
      console.log('Rôle attribué avec succès à l\'utilisateur');
      this.getAllRoles();
    } catch (error) {
      console.error('Erreur lors de l\'attribution du rôle à l\'utilisateur:', error);
    }
  }
 },
 mounted() {
    this.getAllRoles();
 }
};
</script>

 