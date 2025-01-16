<template>
  <div class="q-pa-md q-gutter-sm">
    <h2>{{ $route.params.section }}</h2>
    <q-btn color="white" v-show="false" v-if="!enableWriting" @click="handleClickCreate" text-color="black" label="Create" />
    <q-btn color="white" v-show="true" v-if="enableWriting" @click="handleClickSave" text-color="black" label="Save" />
    <q-btn color="white" v-show="false" v-if="enableWriting" @click="handleClickCancel" text-color="black" label="Cancel" />
  </div>
  <div class="editorPost">
    <QuillEditor v-if="enableWriting && newPost" id="newPost" :modules="modules" theme="snow" toolbar="full" /> <!-- TODO: understand why the v-if order matters-->
  </div>
  <ul v-if="posts.length > 0">
    <li v-for="post in posts" :key="post.id" class="editorPost">
      <QuillEditor :toolbar="'#customToolbar-' + post.id" content-type="html" :modules="modules" v-model:content="post.content" :readOnly="true" :ref="'quillEditor-' + post.id">
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
            <button v-show="true" :id="'editBtn-' + post.id" @click="makePostEditable(post.id)">Edit</button> <!-- the : allows generating the id dynamically -->
            <button v-show="true" :id="'deleteBtn-' + post.id" @click="deletePost(post.id)">Delete</button> <!-- the : allows generating the id dynamically -->
          </div>
        </template>
      </QuillEditor>
    </li>
  </ul>
  <p v-else-if="!enableWriting" style="margin-left: 30px">Come on, start posting!</p>
</template>

<script>
  import { QuillEditor } from '@vueup/vue-quill';
  import '@vueup/vue-quill/dist/vue-quill.snow.css';
  import '@vueup/vue-quill/dist/vue-quill.bubble.css';

  import axios from 'axios';

  export default {
    components: {
      QuillEditor
    },
    data() {
      return {
        posts: [],
        enableWriting: false,
        newPost: false,
        editablePostId: 0
      }
    },
    mounted() {
      // It is executed after the component has been mounted on the DOM
      this.fetchSectionData(this.$route.params.section);
    },
    methods: {
      fetchSectionData(section) {
        // Store section on server
        fetch('https://marcpadrosjimenez.pythonanywhere.com/blogApp/api/sections', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: section
            })
        })
        .then(response => response.json())
        .catch(error => console.error(error));

        // Get the list of section's posts
        axios.get('https://marcpadrosjimenez.pythonanywhere.com/blogApp/api/sections/' + section + '/posts')
          .then(response => {
            this.posts = response.data;
          })
          .catch(error => {
            console.error(error);
          })
      },
      handleClickCreate() {
        this.enableWriting=true;
        this.newPost=true
      },
      handleClickCancel() {
        this.enableWriting=false;
        this.newPost=false;
        if (this.editablePostId > 0) { // If the user cancels editing a post, disable the editor and make it read-only
          const quillEditor = this.$refs['quillEditor-' + this.editablePostId][0];
          quillEditor.getQuill().disable();
        }
      },
      handleClickSave(){
        // Close the text editor after saving the blog post (there is no need to add a refresh page method as Vue renders the page again after the
        // "enableWriting" property is updated)
        if (this.enableWriting && this.newPost) {
          this.createPost();
        } else {
          this.editPost(this.editablePostId);
        }
      },
      createPost() {
        const blogPost = document.getElementById("newPost");
        const textEditor = blogPost.getElementsByClassName("ql-editor")[0];
        const section = this.$route.params.section;

        fetch('https://marcpadrosjimenez.pythonanywhere.com/blogApp/api/sections/' + section + '/posts/create', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              content: textEditor.innerHTML, // Get the HTML content of the text editor, as we need to control styling like headings, bold, italic, etc.
          })
        })
        .then(response => response.json(), "Post created successfully")
        .then(data => this.posts.unshift(data), this.newPost=false, this.enableWriting=false) // unshift() adds the new post to the beginning of the posts array
        .catch(error => console.error(error));
      },
      editPost(postId) {
        this.enableWriting = true;
        console.log(`Edit post with ID: ${postId}`);
        const quillEditor = this.$refs['quillEditor-' + postId][0];
        fetch('https://marcpadrosjimenez.pythonanywhere.com/blogApp/api/posts/' + postId + '/update', {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              content: quillEditor.getHTML(), // Get the HTML content of the text editor, as we need to control styling like headings, bold, italic, etc.
          })
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log("Post " + postId + " has been updated");
          this.posts.find(post => post.id === postId).content = data.content; // Update the content of the post in the posts array
          quillEditor.getQuill().disable(); // Disable the editor after saving the post, make it read-only
          this.enableWriting = false;
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
      },
      makePostEditable(postId) {
        this.editablePostId = postId;
        const quillEditor = this.$refs['quillEditor-' + postId][0];
        quillEditor.getQuill().enable(true); // Enable the editor to allow editing the post
        this.enableWriting = true;
      },
      deletePost(postId) {
        console.log(`Delete post with ID: ${postId}`);
        fetch('https://marcpadrosjimenez.pythonanywhere.com/blogApp/api/posts/' + postId + "/delete", {
          method: 'DELETE',
        })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          console.log("Post " + postId + " has been deleted");
          // Remove the post from the posts array
          this.posts = this.posts.filter(post => post.id !== postId);
        })
        .catch(error => console.error('There was a problem with the fetch operation:', error));
      }
    },
    beforeRouteUpdate(to, from, next) { // this is a Vue Router life cycle hook that runs every time the route changes even if the component has been mounted
      this.fetchSectionData(to.params.section); // we call the fetchSectionData method with the new section name
      next(); // gives Vue Router the order to continue with the navigation to the new route
    }
  }
</script>

<style>
  .editorPost {
    list-style-type: none;
    margin-bottom: 30px;
    margin-right: 40px;
    margin-left: 40px;
  }
</style>
