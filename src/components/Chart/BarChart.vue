<script setup>
import { ref, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { BarChart, useBarChart } from 'vue-chart-3';

Chart.register(...registerables);

const props = defineProps({
  title: { type: String, default: '' },
  labels: { type: Array, default: () => [] },
  data: { type: Array, default: () => [] },
  text: { type: String, default: '' },
})

const chartData = computed(() => ({
  labels: props.labels,
  datasets: [
    {
      label: props.text,
      backgroundColor: ['#42A5F5','#66BB6A','#FFA726','#FF7043','#AB47BC','#26C6DA'],
      data: props.data
    }
  ]
}))

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: props.title
    }
  }
})

const { barChartProps, barChartRef } = useBarChart({chartData});
</script>

<template>
  <div id="app">
    <BarChart v-bind="barChartProps" :options="options" />
  </div>
</template>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
