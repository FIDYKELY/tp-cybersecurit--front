<template>
    <div class="flex flex-wrap mt-4">
       <div class="w-full mb-12 px-4">
         <CardRoleModif :id="$route.params.id"/>
       </div>
    </div>
   </template>
   
   <script>
   import CardRoleModif from "@/components/Templates/Cards/CardRoleModif.vue";
   
   export default {
    components: {
       CardRoleModif,
    },
   };
   </script>
   