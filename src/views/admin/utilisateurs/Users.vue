<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <CardPoll/>
      </div>

      <b-pagination
      v-model="currentPage"
      :total-rows="totalItems"
      :per-page="itemsPerPage"
      @change="fetchPublications"
    ></b-pagination>
    </div>
</template>
   
  <script>
  import ApiService from "@/services/ApiService";
  import CardPoll from "@/components/Templates/Cards/CardTable.vue";
  
  export default {
    data() {
      return {
        data_body: [],
        data_header: ['id', 'nom', 'email', 'telephone', 'naissance'],
        title: "utilisateurs"
      };
    },
    components: {
      CardPoll,
    },
    methods: {
      deleteUser(id_user) {
        ApiService.delete(`/api/users/${id_user}/delete`)
          .then(response => {
            console.log('Delete success : ', response);
            const index = this.data_body.findIndex(item => item.id === id_user);
            // Supprimer l'élément du tableau
            if (index !== -1) {
              this.data_body.splice(index, 1);
            }
          })
          .catch(error => console.error('Erreur lors de la suppression des données users:', error));
      },
    }
  };
  </script>
  
    