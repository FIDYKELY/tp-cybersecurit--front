<template>
    <div class="flex flex-wrap mt-4">
       <div class="w-full mb-12 px-4">
         <CardPermissionModif :id="$route.params.id"/>
       </div>
    </div>
   </template>
   
   <script>
   import CardPermissionModif from "@/components/Templates/Cards/CardPermissionModif.vue";
   
   export default {
    components: {
       CardPermissionModif,
    },
   };
   </script>
   