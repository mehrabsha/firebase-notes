<template>
  <div>
    <v-row align="center" justify="center" no-gutters style="height: 100vh;">
      <v-col cols="10" md="3">
        <v-card elevation="2" class="pa-9" style="height : fit-content">
          <h2 class="text-center">LOGIN</h2>
          <v-form @submit.prevent="handleSubmit">
            <v-text-field
              class="pt-10 pb-7"
              label="E-mail"
              v-model="email"
              outlined
            ></v-text-field>
            <v-btn
              type="submit"
              elevation="2"
              color="primary"
              class="mt-16 ml-auto mr-0 d-block"
              >LOGIN</v-btn
            >
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      email: ""
    };
  },
  methods: {
    handleSubmit() {
      if (!this.email) {
        return alert("please insert your email");
      }
      this.$store.dispatch("user/setEmail", this.email);
      this.$router.push({ name: "Panel" });
    }
  }
};
</script>
