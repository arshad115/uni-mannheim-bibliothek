<template>
  <div class="hello">
      <div id="chart">
        <canvas id="bib-chart"></canvas>
      </div>
      {{chartData}}
      {{error}}

  </div>
</template>

<script>
import BibService from "../bibservice";
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
        labels: [this.chartLabels],
        datasets: []
      },
      options: {
        responsive: true,
        lineTension: 1,
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              padding: 25,
            }
          }]
        }
      }
    }
    }
  },
  async created() {
    try {
      this.a5 = await BibService.getBib("a5");
      this.a3 = await BibService.getBib("a3");
      this.bwl = await BibService.getBib("bwl");
      this.ehrenhof = await BibService.getBib("ehrenhof");
      this.learncenter = await BibService.getBib("learncenter");
      console.log(this.a3.data);
      this.a3.data[0].forEach(element => {
        const time = element.t;
        this.chartData.data.labels.push(time)
      });  
      this.chartData.data.datasets.push(this.a5, this.a3, this.bwl, this.ehrenhof, this.learncenter);
    } catch (err) {
      this.error = err;
    }
  },
  mounted () {
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
