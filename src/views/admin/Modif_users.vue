<template>
    <div class="flex flex-wrap mt-4">
      <div class="w-full mb-12 px-4">
        <CardUserModif :id="$route.params.id"/>
      </div>
    </div>
  </template>
  <script>
  import CardUserModif from "@/components/Templates/Cards/CardModifUser.vue";
  
  export default {
    components: {
        CardUserModif,
    },
  };
  </script>
  