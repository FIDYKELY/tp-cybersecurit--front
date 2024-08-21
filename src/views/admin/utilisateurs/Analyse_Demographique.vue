<template>
    <div>
      <div class="flex flex-wrap mt-4">
        <div class="w-full mb-12 px-4">
          <CardPoll :data_header="data_header" :data_body="data_body" :title="title" />
        </div>
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
        data_header: ['gender', 'city', 'country', 'quarter', 'count'],
        title: "analyses demograohiques"
      };
    },
    components: {
      CardPoll,
    },
    mounted() {
      ApiService.get("/api/demographic_data")
        .then(response => {
          console.log(response.data.data);
          console.log("oke data");
          this.data_body = response.data.data.map(item => ({
            gender: item.gender,
            city: item.city,
            country: item.country,
            quarter: item.quarter,
            count: item.count
          }));
        })
        .catch(error => console.error('Erreur lors de la récupération des données dans CardPoll.vue sur analyse_demographique :', error));
   }
  };
  </script>
  
    