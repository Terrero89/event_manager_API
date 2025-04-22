
<script setup lang="ts">
const props = defineProps([
  
  "title"

 
]);
</script>

<template>
    <div>
        <div class="show my-5" >No {{ props.title }} added yet</div>
    </div>

</template>


<style scoped>
.show {
  margin: 0 auto;
}
</style>




