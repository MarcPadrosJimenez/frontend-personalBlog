<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <q-card class="my-card bg-secondary text-white">
        <q-card-section>
          <div class="text-h6">Contact </div>
        </q-card-section>

        <q-card-section>
          <q-btn :icon="mdiLinkedin" />
          <a href="https://www.linkedin.com/in/marcpadrosjimenez" target="_blank" class="text-white">LinkedIn</a>
        </q-card-section>

        <q-card-section>
          <q-btn :icon="mdiEmail" />
          <a href="mailto:marcpj14@gmail.com" class="text-white">Email</a>
        </q-card-section>
      </q-card>

      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <q-img
            src="../assets/work.jpg"
            style="width: 40%; object-fit: contain; height: auto"
          ></q-img>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <q-img
            src="../assets/tennis.jpg"
            style="width: 40%; object-fit: contain; height: auto"
          ></q-img>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <q-img
            src="../assets/gym.jpg"
            style="width: 40%; object-fit: contain; height: auto"
          ></q-img>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <q-img
            src="../assets/trips.jpg"
            style="width: 40%; object-fit: contain; height: auto"
          ></q-img>
          <div class="q-mt-md text-center">
            {{ lorem }}
          </div>
        </q-carousel-slide>
      </q-carousel>

      <div class="row justify-center">
        <q-btn-toggle
          glossy
          v-model="slide"
          :options="[
            { label: 1, value: 'style' },
            { label: 2, value: 'tv' },
            { label: 3, value: 'layers' },
            { label: 4, value: 'map' },
          ]"
        />
      </div>
    </div>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref("style"),
      lorem:
        "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque voluptatem totam, architecto cupiditate officia rerum, error dignissimos praesentium libero ab nemo provident incidunt ducimus iusto perferendis porro earum. Totam, numquam?",
    };
  },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 250px
</style>
