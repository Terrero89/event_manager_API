<script setup lang="ts">


</script>

<template>
<div>


    <UInputMenu
        variant="outline"
        color="primary"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 test"
        placeholder="Select a sprint"
        :options="['PL-001', 'PL-002', 'PL-003']"
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