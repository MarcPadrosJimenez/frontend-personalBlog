<template>
  <div class="q-pa-md q-gutter-sm">
    <h2>{{ $route.params.section }}</h2>
    <q-btn color="white" @click="handleClickCreate" text-color="black" label="Create" />
    <q-btn color="white" v-if="showNewPost" @click="handleClickSave" text-color="black" label="Save" />
  </div>
  <QuillEditor v-if="showNewPost" id="newPost" theme="snow" />
  <ul v-if="items.length > 0">
    <li v-for="item in items" :key="item.id"><QuillEditor content={{item.content}} theme="snow" /></li>
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
      // Mounted life cycle, it is when the page is loaded
      const section = this.$route.params.section;
      axios.get('https://localhost:8000/' + section + '/posts')
        .then(response => {
          this.items = response.data;
        })
        .catch(error => {
          console.error(error);
        })
    },
    methods: {
      handleClickCreate() {
        this.showNewPost=true;
      },
      handleClickSave(){
        // Close the text editor after saving the blog post (there is no need to add a refresh page method as Vue renders the page again after the
        // "showTextEditor" property is updated)
        this.showNewPost=false;
        const blogPost = document.getElementById("newPost");
        const data = {
          date: new Date(),
          content: blogPost.content,
          section: this.$route.params.section
        }
        axios.post('https://localhost:8000/newPost/', data)
        .then(response => {
          console.log('New blog post registered correctly:', response.data);
        })
        .catch(error => {
          console.error('Error when registering a new blog post:', error);
        });
      }
    }
  }



</script>

<style>
</style>
