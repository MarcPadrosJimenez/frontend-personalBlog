<template>
  <div class="q-pa-md q-gutter-sm">
    <h2>{{ $route.params.section }}</h2>
    <q-btn color="white" v-if="showCreateBtn" @click="handleClickCreate" text-color="black" label="Create" />
    <q-btn color="white" v-if="showTextEditor" @click="handleClickSave" text-color="black" label="Save" />
    <q-btn color="white" v-if="showTextEditor" @click="handleClickCancel" text-color="black" label="Cancel" />
  </div>
  <QuillEditor v-if="showTextEditor && newPost" id="newPost" theme="snow" /> <!-- TODO: understand why the v-if order matters-->
  <ul v-if="posts.length > 0">
    <li v-for="post in posts" :key="post.id" class="postItem">
      <QuillEditor :toolbar="'#customToolbar-' + post.id" content-type="html" v-model:content="post.content" :readOnly="editablePostId !== post.id">
        <template #toolbar>
          <div :id="'customToolbar-' + post.id">
            <!-- Add font size dropdown -->
            <select class="ql-header">
              <option value="1"></option>
              <option value="2"></option>
              <option value="3"></option>
              <option selected></option>
            </select>
            <select class="ql-size">
              <option value="small"></option>
              <!-- Note a missing, thus falsy value, is used to reset to default -->
              <option selected></option>
              <option value="large"></option>
              <option value="huge"></option>
            </select>
            <button class="ql-bold"></button>
            <button class="ql-italic"></button>
            <button class="ql-script" value="sub"></button>
            <button class="ql-script" value="super"></button>
            <button class="ql-underline"></button>
            <button class="ql-strike"></button>
            <button class="ql-blockquote"></button>
            <button class="ql-code-block"></button>
            <button class="ql-list" value="ordered"></button>
            <button class="ql-list" value="bullet"></button>
            <button class="ql-link"></button>
            <button class="ql-image"></button>
            <button class="ql-video"></button>
            <button class="ql-formula"></button>
            <button class="ql-clean"></button>
            <!-- But you can also add your own -->
            <button :id="'editBtn-' + post.id" @click="editPost(post.id)">Edit</button> <!-- the : allows generating the id dynamically -->
            <button :id="'deleteBtn-' + post.id" @click="deletePost(post.id)">Delete</button> <!-- the : allows generating the id dynamically -->
          </div>
        </template>
      </QuillEditor>
    </li>
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
        showTextEditor: false,
        showCreateBtn: true,
        newPost: false,
        editablePostId: 0
      }
    },
    mounted() {
      // Mounted life cycle, it is when the page is loaded
      this.fetchSectionData(this.$route.params.section);
    },
    methods: {
      fetchSectionData(section) {
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
      handleClickCreate() {
        this.showTextEditor=true;
        this.showCreateBtn=false;
        this.newPost=true

      },
      handleClickCancel() {
        this.showTextEditor=false;
        this.showCreateBtn=true
      },
      handleClickSave(){
        // Close the text editor after saving the blog post (there is no need to add a refresh page method as Vue renders the page again after the
        // "showTextEditor" property is updated)
        const blogPost = document.getElementById("newPost");
        const textEditor = blogPost.getElementsByClassName("ql-editor")[0];
        const section = this.$route.params.section;

        fetch('http://localhost:8000/blogApp/' + section + '/posts/create/', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              content: textEditor.innerHTML, // Get the HTML content of the text editor, as we need to control styling like headings, bold, italic, etc.
          })
        })
        .then(response => response.json())
        .then(data => console.log(data), this.showCreateBtn=true, this.newPost=false)
        .catch(error => console.error(error));
      },
      editPost(postId) {
        this.showTextEditor = true;
        this.showCreateBtn = false;
        console.log(`Edit post with ID: ${postId}`);
        console.log(this.editablePostId = postId);
      },
      deletePost(postId) {
        console.log(`Delete post with ID: ${postId}`);
      }
    },
    beforeRouteUpdate(to, from, next) { // this is a Vue Router life cycle hook that runs every time the route changes even if the component has been mounted
      this.fetchSectionData(to.params.section); // we call the fetchSectionData method with the new section name
      next(); // gives Vue Router the order to continue with the navigation to the new route
    }
  }
</script>

<style>
  .postItem {
    list-style-type: none;
    margin-bottom: 30px;
  }
</style>
