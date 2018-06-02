<template>
  <div>
    <div>
      <ul v-if="files.length">
        <li v-for="(file, index) in files" :key="file.id">
          <span>{{file.name}}</span> -
          <span>{{file.size | formatSize}}</span> -
          <span v-if="file.error">{{file.error}}</span>
          <span v-else-if="file.success">success</span>
          <span v-else-if="file.active">active</span>
          <span v-else-if="file.active">active</span>
          <span v-else></span>
        </li>
      </ul>
      <ul v-else>
        <td colspan="7">
          <div>
            <h4>Drop files anywhere to upload<br/>or</h4>
            <label for="file">Select Files</label>
          </div>
        </td>
      </ul>

      <div v-show="$refs.upload && $refs.upload.dropActive">
        <h3>Drop files to upload</h3>
      </div>

      <div>
        <file-upload
          post-action="/upload/post"
          :multiple="true"
          :drop="true"
          :drop-directory="true"
          v-model="files"
          ref="upload">
          <i class="fa fa-plus"></i>
          Select files
        </file-upload>
        <button type="button" v-if="!$refs.upload || !$refs.upload.active" @click.prevent="$refs.upload.active = true">
          <i aria-hidden="true"></i>
          Start Upload
        </button>
        <button type="button" v-else @click.prevent="$refs.upload.active = false">
          <i aria-hidden="true"></i>
          Stop Upload
        </button>
      </div>
    </div>
  </div>
</template>


<script>
  import FileUpload from 'vue-upload-component'
  export default {
    components: {
      FileUpload,
    },

    data() {
      return {
        files: [],
      }
    }
  }
</script>

<style>
</style>
