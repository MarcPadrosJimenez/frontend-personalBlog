<template>
  <div class="q-pa-md q-gutter-sm">
    <h2>{{ $route.params.section }}</h2>
    <q-btn color="white" @click="handleClickCreate" text-color="black" label="Create" />
    <q-btn color="white" v-if="showTextEditor" @click="handleClickSave" text-color="black" label="Save" />
  </div>
  <QuillEditor v-if="showTextEditor" theme="snow" />
  <ul v-if="items.length > 0">
    <li v-for="item in items" :key="item.id"><QuillEditor content={{item.name}} theme="snow" /></li>
  </ul>
  <p v-else>Come on, start posting!</p>
</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import axios from 'axios';

  export default {
    components: {
      QuillEditor
    },
    data() {
      return {
        items: []
      }
    },
    mounted() {
      // ciclo de vida mounted, cuando se carga la página
      this.fetchBlogPosts();
      const section = this.$route.params.section;
    },
    methods: {
      fetchBlogPosts() {
        axios.get('https://localhost:8000/' + section + '/posts')
          .then(response => {
            this.items = response.data;
          })
          .catch(error => {
            console.error(error);
          })
      },
      handleClickCreate() {
        this.showTextEditor=true;
      },
      handleClickSave(){
        this.showTextEditor=false;
        axios.post('/api/enviarDatos', this.datos)
        .then(response => {
            // Manejar la respuesta del servidor
        })
        .catch(error => {
            // Manejar errores
        });
      }
    }
  }



</script>

<style>
</style>
