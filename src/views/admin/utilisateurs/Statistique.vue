<template>
  <div>
    <card-bar-chart :url="url" :name="nom" :title="title"/>
  </div>
</template>
 
<script>
import CardBarChart from "@/components/Templates/Cards/CardBarChart.vue";

export default {
  data() {
    return {
      url: "users",
      nom: "Nombres de users",
      title: "Users",
    };
  },
  components: {
    CardBarChart,
  },
};
</script>

  