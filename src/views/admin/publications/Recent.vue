<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <CardPoll :data_header="data_header" :data_body="data_body" :title="title"/>
      </div>
    </div>
  </template>
   
  <script>
  import ApiService from "@/services/ApiService";
  import CardPoll from "@/components/Templates/Cards/CardPoll.vue";
  
  export default {
    data() {
      return {
        data_body: [],
        data_header: ['id', 'descriptions', 'likes', 'createdAt', 'type'],
        title: "publications recentes"
      };
    },
    components: {
      CardPoll,
    },
    mounted() {
      ApiService.get("/api/recent_publications")
        .then(response => {
          console.log(response.data.data);
          console.log("oke data");
          this.data_body = response.data.data.map(item => ({
            id: item.id,
            descriptions: item.descriptions,
            likes: item.likes,
            createdAt: item.createdAt,
            type: item.type
          }));
        })
        .catch(error => console.error('Erreur lors de la récupération des données dans CardPoll.vue pour Recent.vue:', error));
   }
  };
  </script>
   