<template>
  <q-page class="flex flex-center">
    <div class="q-pa-md">
      <div class="row justify-center">
        <q-card class="my-card text-white">
          <q-card-section>
            <div class="text-h6">Contact</div>
          </q-card-section>

          <q-card-section>
            <a href="https://www.linkedin.com/in/marcpadrosjimenez" target="_blank" class="text-white">
              <q-icon name="mdi-linkedin" />
            </a>
            <span>Here you can check out my resume</span>
          </q-card-section>

          <q-card-section>
            <a href="https://github.com/MarcPadrosJimenez" target="_blank" class="text-white">
              <q-icon name="mdi-github" />
            </a>
            <span>Here you can check out my projects</span>
          </q-card-section>

          <q-card-section>
            <a href="mailto:marcpj14@gmail.com" class="text-white">
              <q-icon name="mdi-email" />
            </a>
            <span>And you can send me an email at marcpj14@gmail.com</span>
          </q-card-section>
        </q-card>
      </div>

      <q-carousel
        v-model="slide"
        transition-prev="slide-right"
        transition-next="slide-left"
        animated
        control-color="primary"
        class="rounded-borders"
      >
        <q-carousel-slide name="style" class="column no-wrap flex-center">
          <div class="image-container">
            <q-img
            src="../assets/Work/work.jpg"
            style="object-fit: contain; width: 100%; height: 100%;"
            ></q-img>
          </div>
          <div class="q-mt-md text-center">
            {{ work }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="tv" class="column no-wrap flex-center">
          <div class="image-container">
            <q-img
            src="../assets/Tennis/tennis.jpg"
            style="object-fit: contain; width: 100%; height: 100%"
            ></q-img>
          </div>
          <div class="q-mt-md text-center">
            {{ tennis }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="layers" class="column no-wrap flex-center">
          <div class="image-container">
            <q-img
            src="../assets/Cooking/paella.jpg"
            style="object-fit: contain; width: 100%; height: 100%"
            ></q-img>
          </div>
          <div class="q-mt-md text-center">
            {{ cooking }}
          </div>
        </q-carousel-slide>
        <q-carousel-slide name="map" class="column no-wrap flex-center">
          <div class="image-container">
            <q-img
            src="../assets/Trips/trips.jpg"
            style="object-fit: contain; width: 100%; height: 100%"
            ></q-img>
          </div>
          <div class="q-mt-md text-center">
            {{ trips }}
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
  import SvgIcon from '@jamescoyle/vue-icon';
  import { mdiLinkedin } from '@mdi/js';

  export default {
    setup() {
      return {
        slide: ref("style"),
        work:
          "I am a software developer graduated in Computer Engineering and passionate about learning cutting edge technologies",
        tennis:
          "Tennis is my favorite sport. I have been playing since I was 10 years old and I am a federated player",
        cooking:
          "Cooking is one of my hobbies. I love to cook and try new recipes. My favorite dish is paella",
        trips:
          "I love to travel and discover new places. I want to visit all the countries in the world",
      };
    },
};
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 450px
  background-color: rgb(19, 89, 160)
  margin-bottom: 5px
  margin-top: 5px

.q-icon
  font-size: 30px
  margin-right: 10px
</style>

<style>
  .image-container {
    width: 500px; /* Ajusta el ancho según tus necesidades */
    height: 300px; /* Ajusta la altura según tus necesidades */
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
