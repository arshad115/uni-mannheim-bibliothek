<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <p>
      For a guide and recipes on how to configure / customize this project,<br>
      check out the {{learncenter}}

      {{error}}
    </p>
  </div>
</template>

<script>
import BibService from "../bibservice";
export default {
  name: 'HomePage',
  data() {
    return {
      a5: [],
      a3: [],
      bwl: [],
      ehrenhof: [],
      learncenter: [],
      error: ''
    }
  },
  async created() {
    try {
      this.a5 = await BibService.getBib("a5");
      this.a3 = await BibService.getBib("a3");
      this.bwl = await BibService.getBib("bwl");
      this.ehrenhof = await BibService.getBib("ehrenhof");
      this.learncenter = await BibService.getBib("learncenter");
    } catch (err) {
      this.error = err;
    }
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
