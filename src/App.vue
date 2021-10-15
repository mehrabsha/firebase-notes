<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",

  data: () => ({
    //
  }),
  computed: {
    notes() {
      return this.$store.getters["notes/getAllNotes"];
    },
    isLoading() {
      return this.$store.getters["notes/getIsLoading"];
    }
  }
};
</script>
