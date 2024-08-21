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
    props: {
        id: {
            type: String,
            required: true,
        }
    },
    data() {
      return {
        data_body: [],
        data_header: ['id', 'comment', 'createdAt', 'Owner'],
        title: "reports"
      };
    },
    components: {
      CardPoll,
    },
    mounted() {
      ApiService.get(`/api/getAllReportsByItem/${this.id}`)
        .then(response => {
          console.log(response.data.data);
          console.log("oke data");
          this.data_body = response.data.data.map(item => ({
            id: item.report.id,
            comment: item.report.comment,
            createdAt: item.report.createdAt,
            Owner: item.owner.fullname
          }));
        })
        .catch(error => console.error('Erreur lors de la récupération des données dans CardPoll.vue et report.vue:', error));
   }
  };
  </script>
   