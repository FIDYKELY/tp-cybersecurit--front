<template>
  <div class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
       <div class="rounded-t bg-white mb-0 px-6 py-6">
         <div class="text-center flex justify-between">
           <router-link to="/admin/roles">
             Retour
           </router-link>
           <h6 class="text-blueGray-700 text-xl font-bold">Gestion des permissions</h6>
         </div>
       </div>
       <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
         <div v-if="permissions.length > 0" class="mt-4">
           <h3 class="text-blueGray-700 text-lg font-bold">Toutes les permissions: {{ roleName }}</h3>
           <ul>
            <li v-for="permission in permissions" :key="permission.id" class="text-blueGray-700 text-sm flex justify-between items-center">
            <div v-if="permission.id !== editingPermissionId" @click="startEditingPermission(permission.id)" class="flex-grow">
              {{ permission.name }}
            </div>
            <input v-else v-model="permission.name" @blur="finishEditingPermission(permission.id)" @keyup.enter="finishEditingPermission(permission.id)" class="border-2 border-blueGray-500 rounded-md px-2 py-1">
            
            <div>
              <input type="checkbox" v-model="permission.isAssigned" class="mr-2">
            </div>
            <button @click="deletePermission(permission.id)" class="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
              Supprimer
            </button>
          </li>
           </ul>
           <!-- <button @click="assignPermissions" class="bg-blueGray-700 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
             Attribuer
           </button> -->
         </div>
         <div>
           <h3 class="text-blueGray-700 text-lg font-bold">Ajouter une nouvelle permission:</h3>
           <form @submit.prevent="addPermission">
             <input type="text" v-model="newPermissionName" placeholder="Nom de la permission" required>
             <button type="submit" class="bg-blueGray-700 text-white active:bg-emerald-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150">
               Ajouter
             </button>
           </form>
         </div>
       </div>
  </div>
 </template>
 
 
 <script>
import axios from 'axios';
// import { useAuthStore } from '@/store/auth-store';


export default {
 data() {
    return {
      permissions: [],
      roles: [],
      editingPermissionId: null,
      roleName: '',
      newPermissionName: '',
    };
 },
 watch: {
 permissions: {
    handler(newPermissions) {
      newPermissions.forEach(permission => {
        if (permission.isAssigned !== permission.isCurrentlyAssigned) {
          this.assignPermissions(permission);
        }
      });
    },
    deep: true, 
 },
},
 methods: {
  async fetchPermissions() {
      try {
        const response = await axios.get('/api/permissions');
        this.permissions = response.data.map(permission => ({
          ...permission,
          isAssigned: false, 
        }));

        
        const rolePermissionsResponse = await axios.get(`/api/permissions/role/${this.$route.params.roleId}`);
        const rolePermissions = rolePermissionsResponse.data;

        
        this.permissions.forEach(permission => {
          permission.isAssigned = rolePermissions.some(rolePermission => rolePermission.id === permission.id);
        });
      } catch (error) {
        console.error('Erreur lors de la récupération des permissions:', error);
      }
    },
    async fetchRoleName(roleId) {
      try {
        const response = await axios.get(`/api/roles/${roleId}`); 
        this.roleName = response.data.name; 
      } catch (error) {
        console.error('Erreur lors de la récupération du nom du rôle:', error);
      }
    },
    async addPermission() {
      try {
        const response = await axios.post('/api/permissions', { name: this.newPermissionName });
        this.permissions.push(response.data);
        this.newPermissionName = '';
      } catch (error) {
        console.error('Erreur lors de l\'ajout de la permission:', error);
      }
    },
    startEditingPermission(permissionId) {
      this.editingPermissionId = permissionId;
    },
    async finishEditingPermission(permissionId) {
      this.editingPermissionId = null;
      const permission = this.permissions.find(p => p.id === permissionId);
      if (permission) {
        try {
          await axios.post(`/api/permissions/${permissionId}/update`, { name: permission.name });
          console.log('Nom de la permission mis à jour avec succès');
          this.fetchPermissions();
        } catch (error) {
          console.error('Erreur lors de la mise à jour du nom de la permission:', error);
        }
      }
    },
    async deletePermission(permissionId) {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer cette permission ? Cette action est irréversible.");

    if (confirmation) {
        try {
          await axios.post(`/api/permissions/${permissionId}/delete`);
          console.log('Permission supprimée avec succès');
          this.permissions = this.permissions.filter(permission => permission.id !== permissionId);
        } catch (error) {
          console.error('Erreur lors de la suppression de la permission:', error);
        }
    } else {
        console.log('Suppression annulée');
    }
    },
    async assignPermissions(permission) {
    try {
      if (permission.isAssigned && !permission.isCurrentlyAssigned) {
        
        await axios.post(`/api/permissions/${permission.id}/updateRolePermission`, {
          roleId: +this.$route.params.roleId,
          permissionId: permission.id,
          isAssigned: permission.isAssigned,
        });
        permission.isCurrentlyAssigned = true;
      } else if (!permission.isAssigned && permission.isCurrentlyAssigned) {
        
        await axios.post(`/api/permissions/${permission.id}/roles/${this.$route.params.roleId}`, {
          roleId: this.$route.params.roleId,
          isAssigned: false,
        });
        permission.isCurrentlyAssigned = false;
      }

      } catch (error) {
          console.error('Erreur lors de la mise à jour des permissions:', error);
      }
      },
 },
 mounted() {
    const roleId = this.$route.params.roleId;
    this.fetchPermissions();
    this.fetchRoleName(roleId);
 },
};
</script>
 