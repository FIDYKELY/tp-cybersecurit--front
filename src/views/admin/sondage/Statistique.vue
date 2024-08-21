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
        url: "surveys",
        nom: "Nombres de sondages",
        title: "Sondage",
      };
    },
    components: {
      CardBarChart,
    },
  };
</script>
  
    