

<script setup>

const props = defineProps([
    "id",
"title",
"description",
"date",
"noteType",
"noteName",
"priorityLevel",
"sprintId",
]);
const isOpen = ref(false);
</script>
<template>



    <div>
        
        
    <div class="progress">
        <div class="item-buttons">
       
        <UModal v-model="isOpen">
              <div class="p-4">
            SHOW DETAILS HERE
              </div>
            </UModal>
        
      </div>
  
        <NotesItem
            :id="props.id"
            :title="props.title"
            :description="props.description"
            :date="props.date"
            :noteType="props.noteType"
            :noteName="props.noteType"
            :priorityLevel="props.priorityLevel"
            :sprintId="props.sprintId"
            
        />

    </div>

    </div>
</template>


<style scoped>
.progress {
  background-color: #1f242a;
  padding: 0.2rem;
}

</style>