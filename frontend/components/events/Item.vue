<script setup>
const props = defineProps([
  "id",
  "title",
  "description",
  "date",
  "eventType",
  "eventName",
  "duration",
  "sprintId",
  "status"
]);
const noteIdRoute = computed(()=> `/notes/${props.id}`)
const isOpen = ref(false);
</script>

<template>
  <div>
    <!-- <h3>ITEM COMPONENT</h3> -->
    <UIRenderer>
      <div class="item">
        <p><strong>Title: </strong> {{ title }}</p>
        <!-- <h1>{{id}}</h1> -->

        <div class="item-header">
          <p><strong>Event Type:</strong> {{ eventType }}</p>
          <p><strong>Event Name: </strong> {{ eventName }}</p>
          <p><strong>Description: </strong> {{ description }}</p>
        </div>
        <div class="item-content">
          <div>
            <p><strong>Date: </strong> {{formatDate(date) }}</p>

            <p><strong>Duration:</strong> {{ duration}} hours</p>
            <p><strong>Sprint ID:</strong> {{ sprintId }}</p>
            <p><strong>Sprint ID:</strong> {{ sprintId }}</p>
          </div>
        </div>
      </div>
     
      <div class="item-buttons my-2">
        
      
        <UButton v-if="props.status === 'Pending'"   variant="outline"  class="b mx-2">{{props.status}}</UButton>
        <UButton v-if="props.status === 'Completed'" variant="outline"  class="b mx-2">{{props.status}}</UButton>
        <UButton v-if="props.status === 'In Progress'"  variant="outline"  class="b mx-2">{{props.status}}</UButton>
        <UButton class="b" @click="isOpen = true" >Details</UButton>
        <UModal v-model="isOpen"  >
    
        
            <EventsDetails
            :id="id"
            :title="props.title"
            :description="props.description"
            :date="props.date"
            :eventType="props.eventType"
            :eventName="props.eventType"
            :duration="props.duration"
            :sprintId="props.sprintId"
            :status="props.status"
            
        />
        
        </UModal>
      </div>
    </UIRenderer>
  </div>
</template>

<style scoped>
.item {
  margin: 0.9rem 0;
  display: flex;
}
.item-content div{

  display:flex;
  flex-wrap:wrap;
}

.item .item-header {
    display:flex;
    flex-wrap:wrap;

  font-size: 0.9rem;
  /* border:solid red 1px; */
}

.item-header p {
  margin: 0.2rem 0;
  font-size: 0.9rem;
  margin-right: 1rem;

}
.item-header strong {
  margin: 0.1rem 0;
  font-size: 0.9rem;

  margin-right: 0.5rem;
}

.item-content p {
  margin: 0.2rem 0;
  font-size: 0.9rem;

  display: flex;
  margin-right: 1rem;
  flex-wrap: wrap;
}
.item-content strong {
  margin: 0.1rem 0;
  font-size: 0.9rem;

  margin-right: 0.5rem;
}

.item {
  margin-right: auto;

  flex-direction: column;
  justify-content: flex-end;
  margin-top: 0.5rem;
  /* background-color: #007bff; */
  color: white;
}
</style>
