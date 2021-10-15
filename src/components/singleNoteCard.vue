<template>
  <div v-if="data">
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
      <v-card-actions
        class="d-flex "
        style="justify-content:space-between; direction : rtl"
      >
        <v-btn @click="deleteNote" icon>
          <v-icon>mdi-delete</v-icon>
        </v-btn>
        <a :href="this.data.file" target="_blank" v-if="this.data.file">
          <v-btn icon>
            <v-icon>mdi-paperclip</v-icon>
          </v-btn>
        </a>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      data: null
    };
  },
  props: ["id"],
  mounted() {
    this.getDetail();
  },
  methods: {
    favTrigger() {
      this.$store.dispatch("notes/updateNote", {
        id: this.data.id,
        note: {
          ...this.data,
          is_favourite: !this.data.is_favourite
        }
      });
      this.getDetail();
    },
    deleteNote() {
      this.$store.dispatch("notes/updateNote", {
        id: this.data.id,
        note: {
          ...this.data,
          is_deleted: true
        }
      });
      this.$router.push("/panel/notes");
    },
    getDetail() {
      this.$store
        .dispatch("notes/getNoteById", this.id)
        .then(res => (this.data = res));
    }
  }
};
</script>
