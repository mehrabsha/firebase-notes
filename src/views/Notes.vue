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
    <v-divider class="my-8" />
    <v-row style="opacity:.7">
      <v-col cols="6" md="2">
        <v-card class="text-center py-5">
          <v-icon style="font-size:3rem">mdi-text</v-icon>
          <h3 class="my-1">
            {{ this.$store.getters["notes/getAllNotesCount"] }}
          </h3>
          <h5>Notes</h5>
        </v-card>
      </v-col>
      <v-col cols="6" md="2">
        <v-card class="text-center py-5">
          <v-icon style="font-size:3rem">mdi-heart</v-icon>
          <h3 class="my-1">
            {{ this.$store.getters["notes/getFavNotesCount"] }}
          </h3>
          <h5>Favorite Notes</h5>
        </v-card>
      </v-col>
      <v-col cols="12" md="2">
        <v-card class="text-center py-5">
          <v-icon style="font-size:3rem">mdi-delete</v-icon>
          <h3 class="my-1">
            {{ this.$store.getters["notes/getDelNotesCount"] }}
          </h3>
          <h5>Deleted Notes</h5>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col v-for="note in userNotes" :key="note.id" cols="12" md="3">
        <noteCard :data="note" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL
} from "firebase/storage";
import noteCard from "../components/noteCard.vue";
export default {
  data: () => {
    return {
      imageFile: null,
      uploadingText: "",
      content: ""
    };
  },
  components: { noteCard },
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
  },
  computed: {
    userNotes() {
      return this.$store.getters["notes/getAllNotes"];
    }
  }
};
</script>
