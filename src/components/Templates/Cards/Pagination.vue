<!-- Pagination.vue -->
<template>
  <div class="py-2">
  <nav class="block">
     <ul class="flex pl-0 rounded list-none flex-wrap">
       <li v-for="page in totalPages" :key="page">
         <a href="#" @click.prevent="changePage(page)" class="first:ml-0 text-xs font-semibold flex w-8 h-8 mx-1 p-0 rounded-full items-center justify-center leading-tight relative border border-solid border-emerald-500 bg-white text-emerald-500">
           {{ page }}
         </a>
       </li>
     </ul>
  </nav>
  </div>
 </template>
 
 <script>
 export default {
  props: {
     totalPages: {
       type: Number,
       required: true
     },
     currentPage: {
       type: Number,
       required: true
     }
  },
  methods: {
     changePage(page) {
       if (page !== this.currentPage) {
         this.$emit('page-change', page);
       }
     }
  }
 };
 </script>
 