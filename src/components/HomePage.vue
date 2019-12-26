<template>
  <div class="hello">
      <div id="chart">
        <canvas id="bib-chart"></canvas>
      </div>
      <!-- {{chartData}} -->
      {{error}}

  </div>
</template>

<script>
/* eslint-disable */
import BibService from "../bibservice";
import * as constants  from "../libraries"
import Chart from 'chart.js';
export default {
  name: 'HomePage',
  data() {
    return {
      a5: [],
      a3: [],
      bwl: [],
      ehrenhof: [],
      learncenter: [],
      error: '',
      chartData: {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        // responsive: true,
        scales: {
          yAxes: [{
        ticks: {
					reverse: false
        }
      }],
          xAxes: [{
                type: 'time',
                // time: {
                //     parser: 'YYYY-MM-DD HH:MM:SS'
                // },
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date'
                }
            }]
        }
      }
    }
    }
  },
  async created() {
    try {

      let startDate = new Date("2019-12-12");
      let endDate = new Date("2019-12-13");

      // console.log(startDate, endDate);
      // console.log(constants.Libraries.a3)
      this.a5 = await BibService.getBib(constants.Libraries.a5, startDate, endDate);
      this.a3 = await BibService.getBib(constants.Libraries.a3, startDate, endDate);
      this.bwl = await BibService.getBib(constants.Libraries.bwl, startDate, endDate);
      this.ehrenhof = await BibService.getBib(constants.Libraries.ehrenhof, startDate, endDate);
      this.learncenter = await BibService.getBib(constants.Libraries.learncenter, startDate, endDate);
      // console.log(this.learncenter.data);
      this.a3.data.forEach(element => {
        const time = element.x;
        if (time && time!== null && time!== undefined) {
          this.chartData.data.labels.push(time);          
        }
      });  
      this.chartData.data.datasets.push(this.a5, this.a3, this.bwl, this.ehrenhof, this.learncenter);
      // this.chartData.data.datasets.push(this.a3);

        // console.log(this.chartData);
        this.createChart(this.chartData);
    } catch (err) {
      this.error = err;
    }
  },
  mounted () {
    // console.log(this.chartData.data.datasets[0]);
    // this.createChart(this.chartData);
  },
  methods: {
  createChart(chartData) {
    const ctx = document.getElementById('bib-chart');
    const myChart = new Chart(ctx, {
      type: chartData.type,
      data: chartData.data,
      options: chartData.options,
    });
  }
//   getChartData() {
//     const localChartData = {
//       type: 'line',
//       data: {
//         labels: [],
//         datasets: []
//       },
//       options: {
//         responsive: true,
//         lineTension: 1,
//         scales: {
//           yAxes: [{
//             ticks: {
//               beginAtZero: true,
//               padding: 25,
//             }
//           }]
//         }
//       }
//     }
//     return localChartData;
//   }
}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
