<template>
    <div>
       <div
         class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded"
         :class="[color === 'light' ? 'bg-white' : 'bg-emerald-900 text-white']"
       >
         <div class="rounded-t mb-0 px-4 py-3 border-0">
           <div class="flex flex-wrap items-center">
             <div class="relative w-full px-4 max-w-full flex-grow flex-1">
               <h3
                 class="font-semibold text-lg"
                 :class="[color === 'light' ? 'text-blueGray-700' : 'text-white']"
               >
                 Liste des admins
               </h3>
               <button @click="exportToPDF">Exporter en PDF</button>
               <button @click="exportToDocx">Exporter en DOCX</button>
             </div>
           </div>
         </div>
         
         <div class="block w-full overflow-x-auto">
           <!-- Projects table -->
           <table class="items-center w-full bg-transparent border-collapse">
             <thead>
               <tr>
                 <th
                   class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                   :class="[
                    color === 'light'
                       ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                       : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                   ]"
                 >
                   ID
                 </th>
                 <th
                   class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                   :class="[
                    color === 'light'
                       ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                       : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                   ]"
                 >
                   Email
                 </th>
                 <th
                   class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                   :class="[
                    color === 'light'
                       ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                       : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                   ]"
                 >
                   Nom
                 </th>
                 <th
                   class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                   :class="[
                    color === 'light'
                       ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                       : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                   ]"
                 >
                   Téléphone
                 </th>
               </tr>
             </thead>
             <tbody>
               <tr v-for="admin in info" :key="admin.id">
                 <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {{ admin.id }}
                 </td>
                 <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {{ admin.email }}
                 </td>
                 <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {{ admin.fullname }}
                 </td>
                 <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                   {{ admin.phone }}
                 </td>
                 <td
                    class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
                  >
                  <table-dropdown :userId="admin.id"/>
                  </td>
               </tr>
             </tbody>
           </table>
         </div>
       </div>
    </div>
   </template>
   
   
   <script>
   import TableDropdown from "@/components/Templates/Dropdowns/TableDropdown.vue";
//    import { jsPDF } from "jspdf";
   import "jspdf-autotable";
   import ApiService from "@/services/ApiService";
   
   export default {
    data() {
       return {
         info: [],
       };
    },
    components: {
       TableDropdown,
    },
    props: {
       color: {
         default: "light",
         validator: function (value) {
           return ["light", "dark"].indexOf(value) !== -1;
         },
       },
    },
    methods: {
       fetchAdmins() {
         ApiService.get('/api/admin/:admin/accounts') 
           .then(response => {
             this.info = response.data.data;
           })
           .catch(error => console.error('Erreur lors de la récupération des données :', error));
       },
       exportToPDF() {
       },
    },
    mounted() {
       this.fetchAdmins();
    }
   };
   </script>
   