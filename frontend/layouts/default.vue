<script lang="ts" setup>
import { CONFIG } from "../config/global";
</script>

<template>
  <div>
    <UHorizontalNavigation
      :links="CONFIG.defaultLinks"
      class="border-b border-gray-200 dark:border-gray-800"
    />
    <UContainer>
      <slot />
    </UContainer>
  </div>
</template>

<style></style>
