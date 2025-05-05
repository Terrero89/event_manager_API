
<script setup>

const props = defineProps([
    "id",
"description",
"date",
"eventType",
"eventName",
"duration",
"sprintId",
"status"
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
   
        <EventsItem
            :id="id"
            :title="props.title"
            :description="props.description"
            :date="props.date"
            :eventType="props.eventType"
            :eventName="props.eventName"
            :duration="props.duration"
            :sprintId="props.sprintId"
            :status="props.status"
            
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