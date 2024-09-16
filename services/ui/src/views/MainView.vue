<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';

import { usePageStore } from '@/stores/page';
import { ApiService } from '@/services/ApiService';
import { useService } from '@/utils/di';
import { VCard, VCardText, VCardTitle } from 'vuetify/components';

const apiService = useService(ApiService);
const pageStore = usePageStore();

const version = ref('--')

onBeforeMount(async () => {
  pageStore.setTitle('Main Page');
  
  version.value = await apiService.getVersion()
});

</script>

<template>
  <VCard class="ma-3">
    <VCardTitle>Hello</VCardTitle>
    <VCardText>{{ version }}</VCardText>
  </VCard>
</template>
