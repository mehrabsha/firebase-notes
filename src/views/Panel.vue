<template>
  <div
    class="d-flex"
    style="height:100%"
    v-if="!$store.getters['notes/getIsLoading']"
  >
    <v-navigation-drawer
      v-model="drawer"
      left
      height="100%"
      :permanent="!$vuetify.breakpoint.mobile"
      :temporary="$vuetify.breakpoint.mobile"
      :absolute="$vuetify.breakpoint.mobile"
    >
      <template v-slot:prepend>
        <v-list class="mt-5">
          <v-list-item>
            <v-list-item-avatar>
              <v-img
                src="https://randomuser.me/api/portraits/men/61.jpg"
              ></v-img>
            </v-list-item-avatar>
          </v-list-item>

          <v-list-item link>
            <v-list-item-content>
              <v-list-item-title class="text-h6">
                Username
              </v-list-item-title>
              <v-list-item-subtitle>{{
                $store.getters["user/getEmail"]
              }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </template>

      <v-divider></v-divider>

      <v-list nav dense>
        <v-list-item-group v-model="group" color="primary">
          <router-link :to="{ name: 'Notes' }">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-text</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Notes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
          <router-link :to="{ name: 'Fav' }">
            <v-list-item>
              <v-list-item-icon>
                <v-icon>mdi-heart</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>Favorite Notes</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
      </v-list>

      <v-divider></v-divider>
      <v-list nav dense>
        <v-subheader>Subtitle</v-subheader>

        <v-list-item-group color="primary">
          <v-list-item @click="logout">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>Logout</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-container><router-view /></v-container>
  </div>
  <div v-else>
    <h5 class="text-center">
      loading...
    </h5>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      group: null
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("user/setEmail", "");
      this.$router.push("/Login");
    }
  },
  mounted() {
    this.$store.dispatch("notes/allNotes");
  },
  watch: {
    group() {
      this.drawer = false;
    }
  }
};
</script>
