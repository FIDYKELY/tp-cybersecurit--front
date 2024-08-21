<!-- <template>
      <div class="px-4 md:px-10 mx-auto w-full">
        <div>
          <div class="flex flex-wrap">
            <p class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-12">Nombre de votes: {{ polls.length }}</p>
            <div class="w-full lg:w-4/12 px-4" v-for="item in polls" :key="item.poll.id">
              <CardPoll :poll="item.poll" :owner="item.owner"/>
            </div>
          </div>
        </div>
      </div>
</template> -->

<template>
  <div>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <CardPoll :data_header="data_header" :data_body="data_body" :title="title" :delete_action="deletePoll" />
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
      data_header: ['id', 'descriptions', 'likes', 'createdAt', 'Owner', 'quarter', 'city', 'country'],
      title: "votes"
    };
  },
  components: {
    CardPoll,
  },
  methods: {
    deletePoll(id_poll) {
      ApiService.delete(`/api/users/51/polls/${id_poll}/delete`)
        .then(response => {
          console.log('Delete success : ', response);
          const index = this.data_body.findIndex(item => item.id === id_poll);
          // Supprimer l'élément du tableau
          if (index !== -1) {
            this.data_body.splice(index, 1);
          }
        })
        .catch(error => console.error('Erreur lors de la suppression des données poll:', error));
    },
  },
  mounted() {
    ApiService.get("/api/polls")
      .then(response => {
        console.log(response.data.data);
        console.log("oke data");
        this.data_body = response.data.data.map(item => ({
          id: item.poll.id,
          descriptions: item.poll.descriptions,
          likes: item.poll.likes,
          createdAt: item.poll.createdAt,
          Owner: item.owner.fullname,
          quarter: item.owner.quarter,
          city: item.owner.city,
          country: item.owner.country
        }));
      })
      .catch(error => console.error('Erreur lors de la récupération des données dans CardPoll.vue :', error));
 }
};
</script>

  