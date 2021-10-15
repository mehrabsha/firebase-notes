<template>
  <v-row>
    <v-col v-for="note in userNotes" :key="note.id" cols="12" md="3">
      <noteCard :data="note" />
    </v-col>
  </v-row>
</template>

<script>
import noteCard from "../components/noteCard.vue";
export default {
  components: { noteCard },

  computed: {
    userNotes() {
      return this.$store.getters["notes/getFavNotes"];
    }
  }
};
</script>
