<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          My personal Blog - Marc Padrós Jiménez
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-footer elevated>
      <q-toolbar>
        <q-toolbar-title>
          © 2025 Marc Padrós Jiménez
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Qualities </q-item-label>

        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          :title="link.title"
          :caption="link.caption"
          :icon="link.icon"
          :href="link.path"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
  import { ref } from "vue";
  import EssentialLink from "components/EssentialLink.vue";

  defineOptions({
    name: "MainLayout",
  });

  const linksList = [
    {
      title: "Home",
      icon: "home",
      path: "/",
    },
    {
      title: "Work",
      icon: "code",
      path: "/Work",
    },
    {
      title: "Tennis",
      icon: "sports_tennis",
      path: "/Tennis",
    },
    {
      title: "Cooking",
      icon: "outdoor_grill",
      path: "/Cooking",
    },
    {
      title: "Trips",
      icon: "flight_takeoff",
      path: "/Trips",
    },
  ];

  const leftDrawerOpen = ref(false);

  function toggleLeftDrawer() {
    leftDrawerOpen.value = !leftDrawerOpen.value;
  }
</script>
