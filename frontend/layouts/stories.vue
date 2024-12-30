<script setup lang="js">
import { CONFIG } from "../config/global";
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="CONFIG.defaultLinks"
      class="border-b border-gray-200 dark:border-gray-800"
    />

    <div
      class="vertical border-b border-l border-r border-gray-200 dark:border-gray-800"
    >
      <UVerticalNavigation :links="CONFIG.verticalLinks" />
    </div>
    This will change since this stories layout
    <slot class="slot" />
  </div>
</template>

<style scoped>
.vertical {
  width: 20rem;
  float: left;
  margin-right: 1rem;
  height: 99dvh;
  display: block;
  margin-bottom:1rem;
}
.slot {
  margin-right: 15rem;
}
</style>
