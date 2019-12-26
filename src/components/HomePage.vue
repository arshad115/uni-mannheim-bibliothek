<template>
  <div class="hello">
    <h2>Uni Mannheim Libraries capacity</h2>
  <div  style="display:flex;">
    <div style="display:flex;margin-left:10px">
      Start Date:
      <datepicker v-model="startDate" @selected="getData"></datepicker>
    </div>
    <div style="display:flex;margin-left:100px"> 
      End Date:
    <datepicker v-model="endDate" @selected="getData"></datepicker>
  </div>
</div>

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
import Datepicker from 'vuejs-datepicker';
export default {
  name: 'HomePage',
  components: {
    Datepicker
  },
  data() {
    return {
      a5: [],
      a3: [],
      bwl: [],
      ehrenhof: [],
      learncenter: [],
      error: '',
      startDate: new Date("2019-12-12"),
      endDate: new Date("2019-12-13"),
      chartData: {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        scales: {
          yAxes: [{
        ticks: {
					reverse: false
        }
      }],
          xAxes: [{
                type: 'time',
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Date and time'
                }
            }],
           yAxes: [{
                display: true,
                scaleLabel: {
                    display: true,
                    labelString: 'Percentage Full'
                }
            }]
        }
      }
    }
    }
  },
  async created() {
    this.getData();
  },
  methods: {
  async getData() {
    try {
      this.chartData.data.labels = [];
      this.chartData.data.datasets = [];
      this.a5 = await BibService.getBib(constants.Libraries.a5, this.startDate, this.endDate);
      this.a3 = await BibService.getBib(constants.Libraries.a3, this.startDate, this.endDate);
      this.bwl = await BibService.getBib(constants.Libraries.bwl, this.startDate, this.endDate);
      this.ehrenhof = await BibService.getBib(constants.Libraries.ehrenhof, this.startDate, this.endDate);
      this.learncenter = await BibService.getBib(constants.Libraries.learncenter, this.startDate, this.endDate);
      this.a3.data.forEach(element => {
        const time = element.x;
        if (time && time!== null && time!== undefined) {
          this.chartData.data.labels.push(time);          
        }
      });  
      this.chartData.data.datasets.push(this.a5, this.a3, this.bwl, this.ehrenhof, this.learncenter);
      this.createChart(this.chartData);
    } catch (err) {
      this.error = err;
    }
  },
  createChart(chartData) {
    const ctx = document.getElementById('bib-chart');
    const myChart = new Chart(ctx, {
      type: chartData.type,
      data: chartData.data,
      options: chartData.options,
    });
    myChart.update();
  }
}
}
</script>
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
