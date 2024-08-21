<template>
  <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
  >
      <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
              Nombre de {{ title }}
            </h6>
            <select v-model="selectedStatisticType" class="form-control">
              <option value="1">Date</option>
              <option value="2">Mois</option>
              <option value="3">Année</option>
            </select>
          </div>
        </div>
      </div>
      <div class="p-4 flex-auto">
        <div class="relative h-350-px">
          <canvas id="bar-chart"></canvas>
        </div>
      </div>
  </div>
 </template>
 
 <script>
 import Chart from "chart.js";
 import ApiService from "@/services/ApiService";
 
 export default {
  data() {
     return {
       data: [],
       selectedStatisticType: '1', // Default to date
     };
  },
  watch: {
    selectedStatisticType: {
      handler: function(newVal) {
        this.fetchDataAndRenderChart(newVal);
      },
      immediate: true,
    },
  },
  methods: {
    async fetchDataAndRenderChart(statisticType) {
      const apiEndpoint = `api/${this.url}/statistic/${statisticType}`;
      ApiService.get(apiEndpoint)
        .then(response => {
          this.data = response.data.data;
          // Calculate the maximum value in the dataset and add 2
          const maxValue = Math.max(...this.data.map(item => item.count)) + 2;
 
          let config = {
            type: "bar",
            data: {
              labels: this.data.map(item => item.year || item.month || item.date),
              datasets: [
                {
                  label: this.name,
                  backgroundColor: "#ed64a6",
                  borderColor: "#ed64a6",
                  data: this.data.map(item => item.count),
                  fill: false,
                  barThickness: 8,
                },
              ],
            },
            options: {
              maintainAspectRatio: false,
              responsive: true,
              title: {
                display: false,
                text: this.name,
              },
              tooltips: {
                mode: "index",
                intersect: false,
              },
              hover: {
                mode: "nearest",
                intersect: true,
              },
              legend: {
                labels: {
                  fontColor: "rgba(0,0,0,.4)",
                },
                align: "end",
                position: "bottom",
              },
              scales: {
                xAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: statisticType === '1' ? "Date" : statisticType === '2' ? "Mois" : "Année",
                    },
                    gridLines: {
                      borderDash: [2],
                      borderDashOffset: [2],
                      color: "rgba(33, 37, 41, 0.3)",
                      zeroLineColor: "rgba(33, 37, 41, 0.3)",
                      zeroLineBorderDash: [2],
                      zeroLineBorderDashOffset: [2],
                    },
                  },
                ],
                yAxes: [
                  {
                    display: true,
                    scaleLabel: {
                      display: true,
                      labelString: this.name,
                    },
                    gridLines: {
                      borderDash: [2],
                      drawBorder: false,
                      borderDashOffset: [2],
                      color: "rgba(33, 37, 41, 0.2)",
                      zeroLineColor: "rgba(33, 37, 41, 0.15)",
                      zeroLineBorderDash: [2],
                      zeroLineBorderDashOffset: [2],
                    },
                    ticks: {
                      min: 0,
                      max: maxValue,
                    },
                  },
                ],
              },
            },
          };
          let ctx = document.getElementById("bar-chart").getContext("2d");
          window.myBar = new Chart(ctx, config);
        });
    },
  },
  props : {
    url: {
      type: Object,
      required: true
    },
    name: {
      type: Object,
      required: true,
    },
    title: {
      type: Object,
      required: true,
    }
  },
 };
 </script>
 