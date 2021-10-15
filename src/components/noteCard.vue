<template>
  <router-link :to="'/panel/note/' + data.id">
    <v-card height="200px">
      <v-card-text style="height:140px">
        <div class="d-flex" style="justify-content:space-between">
          <h3>{{ data.title }}</h3>
          <v-btn icon @click="favTrigger">
            <v-icon>{{
              data.is_favourite ? "mdi-heart" : "mdi-heart-outline"
            }}</v-icon>
          </v-btn>
        </div>
        <p>
          {{ data.content }}
        </p></v-card-text
      >
      <v-card-actions class="float-right ">
        <a :href="this.data.file" target="_blank" v-if="this.data.file">
          <v-btn icon>
            <v-icon>mdi-paperclip</v-icon>
          </v-btn>
        </a>
        <v-btn @click="deleteNote" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card></router-link
  >
</template>

<script>
export default {
  props: ["data"],
  methods: {
    favTrigger() {
      this.$store.dispatch("notes/updateNote", {
        id: this.data.id,
        note: {
          ...this.data,
          is_favourite: !this.data.is_favourite
        }
      });
    },
    deleteNote() {
      this.$store.dispatch("notes/updateNote", {
        id: this.data.id,
        note: {
          ...this.data,
          is_deleted: true
        }
      });
    }
  }
};
</script>
