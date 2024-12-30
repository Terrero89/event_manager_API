<script setup lang="js">
import { CONFIG } from "../config/globalLinks";
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="CONFIG.horizontal.storyLinks"
      class="border-b border-gray-200 dark:border-gray-800"
    />
   
    <div
      class="vertical border-b border-l border-r border-gray-200 dark:border-gray-800"
    >
      <UVerticalNavigation :links="CONFIG.vertical.default" />
    </div>
   
    <slot class="slot" />
  </div>
</template>

<style scoped>
.vertical {
  width: 15rem;
  float: left;
  margin-right: 1rem;
  height: 99dvh;
  display: block;
  margin-bottom:1rem;
}
.slot {
  margin-right: 15rem;
}

@media (max-width: 756px) {
    .vertical {
  max-width: 12rem;
 
}
}
</style>
