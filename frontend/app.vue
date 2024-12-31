<script setup lang="ts">


</script>

<template>
  <div>
    <NuxtLayout>
      <UContainer>
        <NuxtPage class="page"/>
      </UContainer>
    </NuxtLayout>
  </div>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}


</style>
