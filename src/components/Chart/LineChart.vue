<script setup>
import { ref, computed } from 'vue';
import { Chart, registerables } from 'chart.js';
import { LineChart, useLineChart } from 'vue-chart-3';

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
      backgroundColor: ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9', '#92A8D1', '#955251'],
      borderColor:     ['#E94B3C', '#4B3A7C', '#7AA33B', '#F2A7B7', '#7091C0', '#7A3F47'],
      data: props.data,
      tension: 0.4
    }
  ]
}))

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

const { lineChartProps, lineChartRef } = useLineChart({chartData});
</script>

<template>
  <LineChart v-bind="lineChartProps" :options="options" />
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
