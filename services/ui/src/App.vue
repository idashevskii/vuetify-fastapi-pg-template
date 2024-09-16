<script setup lang="ts">
import { RouterView } from 'vue-router';
import { computed, ref } from 'vue';
import {
  VMain,
  VList,
  VAppBar,
  VNavigationDrawer,
  VApp,
  VAppBarNavIcon,
  VToolbarTitle,
  VListItem,
  VMenu,
  VListItemTitle,
  VBtn,
  VDivider,
  VTooltip,
} from 'vuetify/components';
import { mdiChevronLeft, mdiChevronRight, mdiDotsVertical, mdiLogout } from '@mdi/js';
import { usePageStore } from './stores/page';
import { storeToRefs } from 'pinia';
import { watch } from 'vue';
import NavigationMenu from './components/NavigationMenu.vue';
import { useDisplay } from 'vuetify';
import { refPersistent } from './utils/persistent';

const { mobile } = useDisplay()
const pageStore = usePageStore()
const { title } = storeToRefs(pageStore);

watch(title, (val) => {
  window.document.title = val;
});

const logout = () => {
  window.location.reload();
};

const drawerVisible = ref(true);
const drawerCollapsed = refPersistent('drawerCollapsed', false);
const drawerHideable = computed(() => mobile.value)
const drawerCollapsable = computed(() => !drawerHideable.value)

const rail = computed(() => drawerCollapsable.value && drawerCollapsed.value)
</script>

<template>
  <VApp>
    <VNavigationDrawer v-model="drawerVisible" class="bg-indigo-darken-4" theme="dark" :rail="rail">
      <NavigationMenu :rail="rail" />

      <template v-slot:append v-if="drawerCollapsable">
        <VDivider />
        <VList>
          <VTooltip text="Expand" v-if="rail" theme="light">
            <template v-slot:activator="{ props }">
              <VListItem v-bind="props" :prepend-icon="mdiChevronRight" @click="drawerCollapsed = false" />
            </template>
          </VTooltip>
          <VListItem v-else :prepend-icon="mdiChevronLeft" @click="drawerCollapsed = true">
            Collapse
          </VListItem>
        </VList>
      </template>
    </VNavigationDrawer>

    <VAppBar density="compact" class="bg-indigo-darken-4" theme="dark" scroll-behavior="elevate">
      <template v-slot:prepend v-if="drawerHideable">
        <VAppBarNavIcon @click="drawerVisible = !drawerVisible"></VAppBarNavIcon>
      </template>

      <VToolbarTitle>{{ title }}</VToolbarTitle>

      <template v-slot:append>
        <VMenu>
          <template v-slot:activator="{ props }">
            <VBtn :icon="mdiDotsVertical" v-bind="props"></VBtn>
          </template>
          <VList>
            <VListItem @click="logout" :prepend-icon="mdiLogout">
              <VListItemTitle>Logout</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>
      </template>
    </VAppBar>

    <VMain>
      <RouterView />
    </VMain>
  </VApp>
</template>

<style scoped></style>
