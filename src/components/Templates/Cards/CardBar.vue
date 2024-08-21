<template>
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded"
    >
      <div class="rounded-t mb-0 px-4 py-3 bg-transparent">
        <div class="flex flex-wrap items-center">
          <div class="relative w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase text-blueGray-400 mb-1 text-xs font-semibold">
              Performance
            </h6>
            <h2 class="text-blueGray-700 text-xl font-semibold">
              Total orders
            </h2>
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
        userData: [], // Données récupérées de l'API
      };
   },
   mounted() {
      this.$nextTick(async () => {
        console.log("cc");
        // Récupération des données de l'API
        ApiService.get("api/users_count")
          .then(response => {
              this.userData = response.data;
              console.log(response.length);
          })
        // Configuration du graphe
        let config = {
          type: "bar",
          data: {
            labels: this.userData.map(item => `${item.year}-${item.month}`),
            datasets: [
              {
                label: "Nombre d'utilisateurs",
                backgroundColor: "#ed64a6",
                borderColor: "#ed64a6",
                data: this.userData.map(item => item.userCount),
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
              text: "Nombre d'utilisateurs par mois",
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
                  display: false,
                  scaleLabel: {
                   display: true,
                   labelString: "Mois",
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
                   display: false,
                   labelString: "Nombre d'utilisateurs",
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
                },
              ],
            },
          },
        };
        let ctx = document.getElementById("bar-chart").getContext("2d");
        window.myBar = new Chart(ctx, config);
      });
   },
  };
</script>
  