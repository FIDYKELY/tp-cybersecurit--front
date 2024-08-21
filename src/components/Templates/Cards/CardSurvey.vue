<template>
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-12"
    >
    
      <div class="px-6">
        <div class="flex flex-wrap justify-center">
          <div class="w-full px-2 text-center mt-10">
              <div class="flex justify-center py-2 lg:pt-2 pt-4">
                <div class="lg:mr-2 text-center">
                  <span class="text-sm font-semibold block uppercase tracking-wide text-blueGray-600">
                    {{ object.totalRank }}
                  </span>
                  <span class="text-xs text-blueGray-400">ranks</span>
                </div>
              </div>
          </div>
        </div>
        <div class="text-center mt-12" v-for="owner in object.owner" :key="owner.id">
            <h3 class="text-xl font-semibold leading-normal mb-2 text-blueGray-700">
                {{ owner.fullname }}
            </h3>
            <div class="text-sm leading-normal mt-0 mb-2 text-blueGray-400 font-bold uppercase">
                <i class="fas fa-map-marker-alt mr-2 text-lg text-blueGray-400"></i>
                {{ owner.quarter }}, {{ owner.city }}, {{ owner.country }}
            </div>
            <div class="mb-2 text-blueGray-600 mt-10">
                <i class="fas fa-briefcase mr-2 text-lg text-blueGray-400"></i>
                {{ object.survey.createdAt }}
            </div>
        </div>
        <div class="mt-10 py-8 border-t border-blueGray-200 text-center">
          <div class="flex flex-wrap justify-center">
            <div class="w-full lg:w-9/12 px-4">
              <p class="mb-4 text-lg leading-relaxed text-blueGray-700">
                {{ object.survey.descriptions }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  <script>
    import team2 from "@/assets/img/team-2-800x800.jpg";
  
    export default {
      props : {
        object: {
          type: Object,
          required: true
        }
      },
      data() {
        return {
          team2,
        };
      },
    };
  </script>