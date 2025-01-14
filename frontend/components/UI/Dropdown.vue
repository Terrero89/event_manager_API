<script setup lang="ts">
// lzter to optimize
const {
  status,
  data: sprints,
  error,
} = useFetch("http://localhost:8080/api/v1/sprints", {
  lazy: true,
});

const loading = ref(false)
const selected = ref()

async function search(q: string) {
  loading.value = true

  const users: any[] = await $fetch('http://localhost:8080/api/v1/sprints', { params: { q } })

  loading.value = false

  return users
}





</script>

<template>
  <div>



{{selected}}
    <UInputMenu
        v-model="selected"
        :search="search"
        :loading="loading"
        placeholder="Search for a user..."
        option-attribute="sprintID"
        trailing
        by="id"
        :popper="{ arrow: true }"
    />
  </div>


</template>

<style scoped>


.test, label {
  color: black;
  background-color: #ff0808;
}
</style>