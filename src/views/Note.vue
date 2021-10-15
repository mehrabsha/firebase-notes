<template>
  <div>
    <singleNoteCard :id="$route.params.id"></singleNoteCard>
  </div>
</template>

<script>
import singleNoteCard from "../components/singleNoteCard.vue";
export default {
  components: {
    singleNoteCard
  }
};
</script>
