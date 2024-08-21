<template>
  <div class="flex flex-wrap mt-4">
     <div class="w-full mb-12 px-4">
       <CardUnauthorized />
     </div>
  </div>
 </template>
<script>
import CardUnauthorized from "../../components/Templates/Cards/CardUnauthorized.vue";
   
 
export default {
  components: {
    CardUnauthorized,
  },
//  name: "UnauthorizedAccess",
};
</script>
