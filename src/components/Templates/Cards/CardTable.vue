<template>
  <div>
    <div class="flex flex-wrap">
      <div class="w-full lg:w-3/12 px-4">
        <div class="relative w-full mb-3">
          <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="date-inscription">
            Date d'inscription
          </label>
          <input 
          class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          v-model="filterDate" type="text" id="date-inscription" placeholder="Date inscription" @input="fetchUsers" />
        </div>
      </div>
      <div class="w-full lg:w-3/12 px-4">
        <div class="relative w-full mb-3">
          <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="country">
            Country
          </label>
          <input 
          class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          v-model="filterCountry" type="text" id="country" placeholder="Pays" @input="fetchUsers" />
        </div>
      </div>
      <div class="w-full lg:w-3/12 px-4">
        <div class="relative w-full mb-3">
          <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="postal-code">
            travail/spécialité/domaine
          </label>
          <input 
          class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          v-model="filterPostalCode" type="text" id="postal-code" placeholder="travail/spécialité/domaine" @input="fetchUsers" />
        </div>
      </div>
      <div class="w-full lg:w-3/12 px-4">
        <div class="relative w-full mb-3">
          <label class="block uppercase text-blueGray-600 text-xs font-bold mb-2" for="city">
            City
          </label>
          <input 
          class="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
          v-model="filterCity" type="text" id="city" placeholder="Ville" @input="fetchUsers" />
        </div>
      </div>
      
    </div>
    <Paginations
      :total-pages="totalPages"
      :current-page="currentPage"
      @page-change="handlePageChange"
    />
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
            Liste des users
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
              id
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              avatar
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
              Telephone
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Naissance
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Gender
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Speciality
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Domain
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Quarter
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              City
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              About
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              Skills
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              UpdateAt
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            >
              CreatedAt
            </th>
            <th
              class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
              :class="[
                color === 'light'
                  ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                  : 'bg-emerald-800 text-emerald-300 border-emerald-700',
              ]"
            ></th>
          </tr>
        </thead>
        <tbody  v-for="use in info" :key="use.id">
          <tr>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ use.id }}
            </td>
            <th
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
            >
              <img
                :src="use.avatar"
                class="h-12 w-12 bg-white rounded-full border"
                alt="..."
              />
            </th>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              {{ use.fullname }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <i class="fas fa-circle text-orange-500 mr-2"></i> {{ use.email }}
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex">
                {{ use.phone }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.date_of_birth }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.gender }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.speciality }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.domain }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.quarter }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.city }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.about }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.skills }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.updatedAt }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
            >
              <div class="flex items-center">
                {{ use.createdAt }}
              </div>
            </td>
            <td
              class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
            >
            <table-dropdown :userId="use.id"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</div>
</template>
<script>
import Paginations from "@/components/Templates/Cards/Pagination.vue";
import TableDropdown from "@/components/Templates/Dropdowns/TableDropdown.vue";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
// import PizZip from "pizzip";
// import Docxtemplater from "docxtemplater";
// import fs from "fs";
// import path from "path";

import bootstrap from "@/assets/img/bootstrap.jpg";
import angular from "@/assets/img/angular.jpg";
import sketch from "@/assets/img/sketch.jpg";
import react from "@/assets/img/react.jpg";
import vue from "@/assets/img/react.jpg";
import ApiService from "@/services/ApiService"; 
// import { inject } from "vue";

// import axios from 'axios';


export default {
  data() {
    return {
      bootstrap,
      angular,
      sketch,
      react,
      vue,
      info: [],
      currentPage: 1,
      totalPages: 0,
      filterDate: '',
      filterCountry: '',
      filterPostalCode: '',
      filterCity: ''
    };
  },
  components: {
    TableDropdown,
    Paginations,
  },
  props: {
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    }
  },
  methods: {
    handlePageChange(page) {
      this.currentPage = page;
      this.fetchUsers();
    },
    deleteUser(id_survey) {
          ApiService.delete(`/api/users/${id_survey}/delete`)
            .then(response => {
              console.log('Delete success : ', response);
              const index = this.data_body.findIndex(item => item.id === id_survey);
              // Supprimer l'élément du tableau
              if (index !== -1) {
                this.data_body.splice(index, 1);
              }
            })
            .catch(error => console.error('Erreur lors de la suppression des données survey:', error));
    },
    fetchUsers() {
      // Construction de la requête de filtrage avec les valeurs des champs d'entrée
      ApiService.get(`/api/users_paginate?pageNumber=${this.currentPage}&filterDate=${this.filterDate}&filterCountry=${this.filterCountry}&filterPostalCode=${this.filterPostalCode}&filterCity=${this.filterCity}`)
        .then(response => {
          this.info = response.data.data;
          this.totalPages = response.data.totalPages;
        })
        .catch(error => console.error('Erreur lors de la récupération des données :', error));
    },
    exportToPDF() {
      const doc = new jsPDF();
      const tableColumn = ["ID", "Avatar", "Nom", "Email", "Téléphone", "Naissance"];
      const tableRows = [];

      this.info.forEach(user => {
        const row = [
          user.id,
          user.avatar, // Note: jsPDF ne peut pas directement afficher les images. Vous devrez peut-être utiliser une URL ou une image encodée en base64.
          user.fullname,
          user.email,
          user.phone,
          user.date_of_birth
        ];
        tableRows.push(row);
      });

      doc.autoTable(tableColumn, tableRows, { startY: 20 });
      doc.save("users.pdf");
    },
    // async exportToDocx() {
    //   const content = fs.readFileSync(path.resolve(__dirname, "template.docx"), "binary");
    //   const zip = new PizZip(content);
    //   const doc = new Docxtemplater().loadZip(zip);

    //   doc.setData({
    //     users: this.info.map(user => ({
    //       id: user.id,
    //       avatar: user.avatar, 
    //       fullname: user.fullname,
    //       email: user.email,
    //       phone: user.phone,
    //       date_of_birth: user.date_of_birth
    //     }))
    //   });

    //   try {
    //     doc.render();
    //     const buffer = doc.getZip().generate({ type: "nodebuffer" });
    //     fs.writeFileSync("users.docx", buffer);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
 },
 mounted() {
    this.fetchUsers();
 }
};
</script>
