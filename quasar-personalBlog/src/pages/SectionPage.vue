<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn color="white" @click="handleClick" text-color="black" label="Create" />
  </div>
  <QuillEditor theme="snow" />
</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';

  export default {
    components: {
      QuillEditor
    },
    methods: {
      handleClick() {
        console.log('¡Se hizo clic en el botón!');
        // Aquí puedes agregar tu lógica personalizada
        // Por ejemplo, mostrar un diálogo, enviar datos, etc.
      }
    }
  }



</script>

<style>
</style>
