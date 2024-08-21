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
        url: "publication",
        nom: "Nombres de publications",
        title: "Publications",
      };
    },
    components: {
      CardBarChart,
    },
  };
  </script>
  
    