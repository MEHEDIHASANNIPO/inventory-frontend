<script setup>
/** All Library Import */
import { PageName } from '@/components/PageName';
import DashboardCount from '@/components/Dashboard/DashboardCount.vue';
import DashboardShort from '@/components/Dashboard/DashboardShort.vue';
import DashboardChart from '@/components/Dashboard/DashboardChart.vue';

/** All Instance */
PageName.value = 'Dashboard'
</script>

<template>
  <DashboardCount />
  <DashboardShort />
  <DashboardChart />
</template>
