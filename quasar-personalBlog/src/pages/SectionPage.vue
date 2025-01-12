<template>
  <div class="q-pa-md q-gutter-sm">
    <h2>{{ $route.params.section }}</h2>
    <q-btn color="white" @click="handleClickCreate" text-color="black" label="Create" />
    <q-btn color="white" v-if="showNewPost" @click="handleClickSave" text-color="black" label="Save" />
    <q-btn color="white" v-if="showNewPost" @click="handleClickCancel" text-color="black" label="Cancel" />
  </div>
  <QuillEditor v-if="showNewPost" id="newPost" theme="snow" />
  <ul v-if="posts.length > 0">
    <li v-for="post in posts" :key="post.id"><QuillEditor content={{post.content}} theme="snow" /></li>
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
        posts: [],
        showNewPost: false
      }
    },
    mounted() {
      // Mounted life cycle, it is when the page is loaded
      const section = this.$route.params.section;
      // Store section on server
      fetch('http://localhost:8000/blogApp/sections/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            name: section
          })
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));

      // Get the list of section's posts
      axios.get('http://localhost:8000/blogApp/' + section + '/posts')
        .then(response => {
          this.posts = response.data;
        })
        .catch(error => {
          console.error(error);
        })
    },
    methods: {
      handleClickCreate() {
        this.showNewPost=true;
      },
      handleClickCancel() {
        this.showNewPost=false;
      },
      handleClickSave(){
        // Close the text editor after saving the blog post (there is no need to add a refresh page method as Vue renders the page again after the
        // "showTextEditor" property is updated)
        this.showNewPost=false;
        const blogPost = document.getElementById("newPost");
        const textEditor = blogPost.getElementsByClassName("ql-editor")[0];
        const section = this.$route.params.section;

        fetch('http://localhost:8000/blogApp/' + section + 'posts/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              content: textEditor.innerHTML, // Get the HTML content of the text editor, as we need to control styling like headings, bold, italic, etc.
          })
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error(error));
      }
    }
  }
</script>

<style>
</style>
