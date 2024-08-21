<!-- <template>
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <div class="flex flex-wrap">
          <p class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-12">Nombre de sondages: {{ surveys.length }}</p>
          <div class="w-full lg:w-4/12 px-4" v-for="item in surveys" :key="item.survey.id">
            <CardSurvey :object="item"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import ApiService from "@/services/ApiService";
import CardSurvey from "@/components/Templates/Cards/CardSurvey.vue";

export default {
data() {
  return {
    surveys: []
  };
},
components: {
  CardSurvey,
},
mounted() {
  ApiService.get("/api/surveys")
    .then(response => {
      console.log(response.data.data);
      this.surveys = response.data.data;
    })
    .catch(error => console.error('Erreur lors de la récupération des données dans CardSurvey.vue :', error));
}
};
</script> -->


<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <CardPoll :data_header="data_header" :data_body="data_body" :title="title" :delete_action="deleteSurvey"/>
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
      data_header: ['id', 'descriptions', 'ranks', 'createdAt', 'Owner', 'quarter', 'city', 'country'],
      title: "sondages"
    };
  },
  components: {
    CardPoll,
  },
  methods: {
    deleteSurvey(id_survey) {
      ApiService.delete(`/api/users/51/surveys/${id_survey}/delete`)
        .then(response => {
          console.log('Delete success : ', response);
          const index = this.data_body.findIndex(item => item.id === id_survey);
          // Supprimer l'élément du tableau
          if (index !== -1) {
            this.data_body.splice(index, 1);
          }
        })
        .catch(error => console.error('Erreur lors de la suppression des données survey:', error));
    },
  },
  mounted() {
    ApiService.get("/api/surveys")
      .then(response => {
        console.log(response.data.data);
        console.log("oke data");
        this.data_body = response.data.data.map(item => ({
          id: item.survey.id,
          descriptions: item.survey.descriptions,
          ranks: item.totalRank,
          createdAt: item.survey.createdAt,
          Owner: item.owner.length > 0 ? item.owner[0].fullname : null,
          quarter: item.owner.length > 0 ? item.owner[0].quarter : null,
          city: item.owner.length > 0 ? item.owner[0].city : null,
          country: item.owner.length > 0 ? item.owner[0].country : null
        }));
      })
      .catch(error => console.error('Erreur lors de la récupération des données dans CardPoll.vue :', error));
 }
};
</script>
 