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
              Liste des {{ title }} : {{ data_body.length }}
            </h3>
          </div>
        </div>
      </div>
      <div class="block w-full overflow-x-auto">
        <!-- Projects table -->
        <table class="items-center w-full bg-transparent border-collapse">
          <thead>
            <tr>
              <th v-for="header in data_header" :key="header"
                class="px-6 align-middle border border-solid py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left"
                :class="[
                  color === 'light'
                    ? 'bg-blueGray-50 text-blueGray-500 border-blueGray-100'
                    : 'bg-emerald-800 text-emerald-300 border-emerald-700',
                ]"
              >
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in data_body" :key="row.id">
              <td v-for="(value, key) in row" :key="key"
                  class="border-t-0 px-8 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4"
                  style="word-wrap: break-word; max-width: 300px; white-space: normal;"
              >
                {{ value }}
              </td>
              <td
                class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-right"
              >
                <table-dropdown :id="row.id" :can_delete="true" :delete="delete_action" v-bind="row.type ? { type: row.type } : {}"/>
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

import bootstrap from "@/assets/img/bootstrap.jpg";
import angular from "@/assets/img/angular.jpg";
import sketch from "@/assets/img/sketch.jpg";
import react from "@/assets/img/react.jpg";
import vue from "@/assets/img/react.jpg";

console.log("unhunn");

export default {
  data() {
    return {
      bootstrap,
      angular,
      sketch,
      react,
      vue,
      info: []
    };
  },
  components: {
    TableDropdown,
  },
  props : {
    color: {
      default: "light",
      validator: function (value) {
        // The value must match one of these strings
        return ["light", "dark"].indexOf(value) !== -1;
      },
    },
    data_header: {
      type: Array,
      required: true
    },
    data_body: {
      type: Array,
      required: true
    },
    title: {
      type: Object,
      required: true
    },
    delete_action: {
      type: Function,
      required: true,
    }
  },
};
</script>
