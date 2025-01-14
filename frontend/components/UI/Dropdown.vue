<script setup lang="ts">
// lzter to optimize
const {
  status,
  data: sprints,
  error,
} = useFetch("http://localhost:8080/api/v1/sprints", {
  lazy: true,
});



const dropdown =computed(() => {
  const person = []
  for (let i = 0; i < sprints.value?.length; i++) {
  // BETTER ERROR HANDLING HERE
  //   values.push(sprints.value[i].sprintID)
    person.push(sprints.value[i].sprintID)
  }
  return person
})

const onBeforeMounted = () => {
dropdown.value
}
const people = [{
  id: 1,
  name: 'Wade Cooper'
}, {
  id: 2,
  name: 'Arlene Mccoy'
}, {
  id: 3,
  name: 'Devon Webb'
}, {
  id: 4,
  name: 'Tom Cook'
}]

</script>

<template>
  <div>
{{dropdown}}
    {{ sprints }}
    <UInputMenu
        variant="outline"
        color="primary"
        trailing-icon="i-heroicons-chevron-down"
        class="w-full lg:w-48 test"
        placeholder="Select a sprint"
        :options="dropdown"
        model-value=""
        value-attribute="sprintID"
        option-attribute="sprintID"
    />


  </div>


</template>

<style scoped>


.test, label {
  color: black;
  background-color: #ff0808;
}
</style>