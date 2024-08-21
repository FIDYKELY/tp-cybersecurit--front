<template>
  <div>
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
              Liste des publications
            </h3>
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
                type
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                ]"
              >
                Descriptions
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                ]"
              >
                User id
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                ]"
              >
                Likes
              </th>
              <th
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                ]"
              >
                Created At
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
              <th
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left flex items-center"
              >
                <span
                  class="ml-3 font-bold"
                  :class="[
                    color === 'light' ? 'text-blueGray-600' : 'text-white',
                  ]"
                >
                  {{ use.id }}
                </span>
              </th>
              <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4"
              >
              {{ use.type }}
              </td>
              <td
               style="width: 50%;" class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs p-4"
              >
              {{ use.descriptions }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
              <img
                  :src="use.user_id"
                  class="h-12 w-12 bg-white rounded-full border"
                  alt="..."
                />
              <!-- {{ use.user_id }} -->
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
              >
                <div class="flex">
                  {{ use.likes }}
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
                <!-- <TableDropdown :id="use.id" :can_delete="true" :delete="delete_action"/> -->
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
  // import TableDropdown from "@/components/Templates/Dropdowns/TableDropdown.vue";
  import Paginations from "@/components/Templates/Cards/Pagination.vue";

  import bootstrap from "@/assets/img/bootstrap.jpg";
  import angular from "@/assets/img/angular.jpg";
  import sketch from "@/assets/img/sketch.jpg";
  import react from "@/assets/img/react.jpg";
  import vue from "@/assets/img/react.jpg";
  import ApiService from "@/services/ApiService";
  

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
      };
    },
    components: {
      // TableDropdown,
      Paginations,
    },
    props: {
      color: {
        default: "light",
        validator: function (value) {
          // The value must match one of these strings
          return ["light", "dark"].indexOf(value) !== -1;
        },
      },
      delete_action: {
        type: Function,
        required: true,
      },
    },
    methods: {
        handlePageChange(page) {
          this.currentPage = page;
          this.fetchUsers();
        },
        deleteSurvey(id_survey) {
          ApiService.delete(`/api/users/51/surveys/${id_survey}/delete`)
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
        async fetchUserAvatar(userId) {
            try {
              // return fetch(`/api/users/${userId}/avatar`)
              //   .then(response => response.json())
              //   .then(data => data.data); // Assurez-vous que 'data' est le champ correct dans la réponse
              const response = await ApiService.get(`/api/users/${userId}/avatar`);
              console.log(response.data.data);
              return response.data.data;
            } catch (error) {
              console.log(error);
            }
        },
        async fetchUsers() {
            try {
              const response = await ApiService.get(`/api/publications_paginate?pageNumber=${this.currentPage}`);
              const publications = response.data.data;
              this.totalPages = response.data.totalPages;

              // Pour chaque publication, récupérez l'avatar de l'utilisateur
              for (let i = 0; i < publications.length; i++) {
                const avatarUrl = await this.fetchUserAvatar(publications[i].user_id);
                // Ajoutez l'avatar à la publication en utilisant l'index
                console.log(avatarUrl);
                publications[i].user_id = avatarUrl;
              }

              this.info = publications;
            } catch (error) {
              console.error('Erreur lors de la récupération des données :', error);
            }
        },
    },
    mounted() {
        this.fetchUsers();
    }
  };
  </script>
  