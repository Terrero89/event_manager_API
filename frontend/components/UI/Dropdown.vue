<script setup lang="ts">
import { storeToRefs } from "pinia";
const sprintsStore = useSprintStore();


const {  addSprint, fetchSprints} = sprintsStore;
const {  sprintList, currentSprint } = storeToRefs(sprintsStore);

onMounted(async() => {

  await fetchSprints()
});

</script>

<template>
<div>


    <UInputMenu
        variant="outline"
        color="primary"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 test"
        placeholder="Select a sprint"
        :options="sprintList"
        model-value=""
    />


  </div>


</template>

<style scoped>




.test, label {
  color: black;
  background-color: #ff0808;
}
</style>