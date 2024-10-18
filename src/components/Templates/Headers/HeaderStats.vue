<template>
  <!-- Header -->
  <div class="relative bg-blueGray-600 md:pt-32 pb-32 pt-12">
    <div class="px-4 md:px-10 mx-auto w-full">
      <div>
        <!-- Card stats -->
        <div class="flex flex-wrap">
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              :statSubtitle="mostViewedSubtitle"
              :statTitle="mostViewedNumber"
              statArrow="up"
              statPercent="3.48"
              statPercentColor="text-emerald-500"
              statDescripiron="Since last month"
              statIconName="far fa-chart-bar"
              statIconColor="bg-red-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="NEW USERS"
              :statTitle="users"
              statArrow="down"
              statPercent="3.48"
              statPercentColor="text-red-500"
              statDescripiron="Since last week"
              statIconName="fas fa-chart-pie"
              statIconColor="bg-orange-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="NOMBRE USERS"
              :statTitle="votes"
              statArrow="down"
              statPercent="1.10"
              statPercentColor="text-orange-500"
              statDescripiron="Until now"
              statIconName="fas fa-users"
              statIconColor="bg-pink-500"
            />
          </div>
          <div class="w-full lg:w-6/12 xl:w-3/12 px-4">
            <card-stats
              statSubtitle="NOMBRE DE VENTES"
              :statTitle="sondages"
              statArrow="up"
              statPercent="12"
              statPercentColor="text-emerald-500"
              statDescripiron="Until now"
              statIconName="fas fa-percent"
              statIconColor="bg-emerald-500"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ApiService from "@/services/ApiService";
import CardStats from "@/components/Templates/Cards/CardStats.vue";

export default {
 components: {
    CardStats,
 },
 data() {
    return {
      votes: 0,
      sondages: 0,
      users: 0,
      mostViewed: null,
    };
 },
 mounted() {
  Promise.all([
      ApiService.get("/api/polls"),
      ApiService.get("/api/surveys"),
      ApiService.get("/api/users"),
      ApiService.get("/api/getMostViewed")
  ]).then(responses => {
      this.votes = responses[0].data.data.length;
      this.sondages = responses[1].data.data.length;
      this.users = responses[2].data.data.length;
      console.log(responses[3].data.data.page_name);
      this.mostViewed = responses[3].data.data;
      console.log(this.mostViewed.page_name);
  }).catch(error => console.error('Erreur lors de la récupération des données :', error));
  },
  computed: {
    mostViewedSubtitle() {
        return this.mostViewed ? `SECTION LE PLUS VISITE : ${this.mostViewed.page_name}` : 'Loading...';
    },
    mostViewedNumber() {
        return this.mostViewed ? this.mostViewed.count_view : 'Loading...';
    }
  }

};

</script>
