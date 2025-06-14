

<script setup>

const props = defineProps({
  id: {
    type: String,
    required: true
  },
  description: String,
  date: String,
  noteType: String,
  noteName: String,
  sprintId: String
});
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
        :description="props.description"
        :date="props.date"
        :noteType="props.noteType"
        :noteName="props.noteName"
        :priorityLevel="props.priorityLevel"
        :sprintId="props.sprintId"
      />
    </div>
<div class="my-5"></div>
    </div>
</template>


<style scoped>
.progress {
  background-color: #1f242a;
  padding: 0.2rem;
}

</style>