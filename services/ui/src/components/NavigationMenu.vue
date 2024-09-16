<script setup lang="ts">
import { VList, VListItem, VDivider, VTooltip } from 'vuetify/components';
import {
  mdiViewDashboard,
} from '@mdi/js';
import { Route } from '@/router';

const props = defineProps<{
  rail: boolean
}>()

const structure = [
  [
    { title: 'Main', route: Route.MAIN, icon: mdiViewDashboard },
  ],
];
</script>
<template>
  <VList>
    <VListItem prepend-avatar="https://randomuser.me/api/portraits/thumb/men/14.jpg" subtitle="myuser@gmail.com"
      title="My Name" />
  </VList>
  <template v-for="items in structure">
    <VDivider />
    <VList>
      <template v-if="props.rail">
        <VTooltip v-for="{ icon, route, title } in items" :text="title" theme="light">
          <template v-slot:activator="{ props }">
            <VListItem v-bind="props" :prepend-icon="icon" :to="{ name: route }" :title="title" />
          </template>
        </VTooltip>
      </template>
      <template v-else>
        <VListItem v-for="{ icon, route, title } in items" :prepend-icon="icon" :to="{ name: route }" :title="title" />
      </template>
    </VList>
  </template>
</template>
