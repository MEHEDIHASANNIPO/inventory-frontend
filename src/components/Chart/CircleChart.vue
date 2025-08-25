<script setup>
import { ref, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { DoughnutChart, useDoughnutChart } from 'vue-chart-3';

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
      data: props.data,
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#43b9b2'],
      hoverOffset: 10,
    },
  ],
}));

const options = ref({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: props.title,
    },
  },
});

const { doughnutChartProps, doughnutChartRef } = useDoughnutChart({chartData});
</script>

<template>
  <div id="app" style="width: 400px; margin: 0 auto;">
    <DoughnutChart v-bind="doughnutChartProps" :options="options" />
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

