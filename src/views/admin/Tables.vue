<template>
  <div class="flex flex-wrap mt-4">
    <div class="w-full mb-12 px-4">
      <CardTable />
    </div>
  </div>
</template>
<script>
import CardTable from "@/components/Templates/Cards/CardTable.vue";

export default {
  components: {
    CardTable,
  },
};
</script>
