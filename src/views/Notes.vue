<template>
  <div>
    <h2>Add a Note</h2>
    <v-card class="pa-5 mt-5">
      <textarea v-model="content" style="width:100%"></textarea>
      <div class="d-flex" style="justify-content:space-between">
        <div>
          <v-btn @click="openFiles" icon color="black">
            <v-icon>mdi-paperclip</v-icon>
          </v-btn>
          {{ uploadingText ? uploadingText : imageFile && imageFile.name }}
        </div>
        <input
          type="file"
          ref="input1"
          style="display: none"
          @change="previewImage"
          accept="image/*"
        />
        <v-btn @click="addNote" icon color="black">
          <v-icon>mdi-send</v-icon>
        </v-btn>
      </div>
    </v-card>
  </div>
</template>

<script>
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";

export default {
  data: () => {
    return {
      imageFile: null,
      uploadingText: "",
      content: ""
    };
  },
  methods: {
    openFiles() {
      this.$refs.input1.click();
    },

    previewImage(event) {
      this.imageFile = event.target.files[0];
    },
    onUpload() {
      const storage = getStorage();
      const fileName = this.imageFile.name;
      const storageRef = ref(storage, fileName);

      // 'file' comes from the Blob or File API
      const uploadTask = uploadBytesResumable(storageRef, this.imageFile);

      uploadTask.on(
        "state_changed",
        snapshot => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          this.uploadingText = "Upload is " + progress + "% done";
        },
        error => {
          console.log(error);
        },
        () => {
          this.uploadingText = "Done";

          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            this.$store
              .dispatch("notes/addNote", {
                content: this.content,
                file: downloadURL
              })
              .then(() => alert("sent"));
          });
        }
      );
    },
    addNote() {
      if (this.imageFile) {
        this.onUpload();
      } else {
        this.$store
          .dispatch("notes/addNote", {
            content: this.content,
            file: ""
          })
          .then(() => alert("sent"));
      }
    }
  }
};
</script>
