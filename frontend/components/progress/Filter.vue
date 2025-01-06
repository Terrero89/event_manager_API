<script setup lang="ts">
const props = defineProps([
  //PROPS HERE
  "progressTitle",
  "storyNumber",
]);


// computer properties
// const work = computed(() => {
//   return workType.value ? 'fullstack' : 'frontend';
// });
</script>

<template>
  <div>
    <div class="progress">

      <div class="item-status">
        <div class="status-title">
          <h1>{{ progressTitle }}</h1>
          <span class="story-number">{{ storyNumber }}</span>
        </div>

        <div class="story-list">
        </div>
      </div>
    </div>


  </div>
</template>

<style scoped>

.workType {
  background-color: rgba(42, 185, 88, 0.75);
}

.item-status {
  padding: 0.2rem 0;
  margin: 0.5rem 0;
  border-top: 1px solid rgba(236, 236, 236, 0.14);
  border-bottom: 1px solid rgba(236, 236, 236, 0.14);
  display: flex;
  flex-direction: row;
  background-color: rgb(15, 15, 15) !important;
  border-radius: 5px;
}


.story-button {
  border-radius: 5px;
  float: right;
}

.story-list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.status-title {
  padding: 0.1rem;
  min-width: 7rem;
  margin: 0 0.5rem;
  display: flex;

  border-radius: 7px;
}

.status-title h1 {
  margin: auto 0;
  text-align: center;
  align-content: center;
}

.story {
  width: 13rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
  background-color: rgba(236, 236, 236, 0.14);
  border: 1px solid rgba(236, 236, 236, 0.14);
}

.story h1 {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.77);
}

.story-top button {
  margin-right: 0;
}

.type,
.story-id,
.story-points,
.story-number {
  color: rgba(208, 206, 206, 0.76);
  font-size: 0.75rem;
  font-weight: bold;
  padding: 0.2rem 0.3rem;
  border-radius: 0.2rem;
}

.story-number {
  text-align: center;
  margin: auto 0;
}

.type {
  /*background-color: rgba(0, 183, 255, 0.75);*/
  background-color: rgba(0, 183, 255, 0.75);
}

.icons {
  color: rgba(208, 206, 206, 0.76);
}

.doc {
  background-color: #0097ff;
  padding: 0.2rem 0;

}

.story-points {

  /*background-color: rgba(0, 183, 255, 0.75);*/
}
.item-status {
  padding: 0.2rem 0;
  margin: 0.5rem 0;
  border-top: 1px solid rgba(236, 236, 236, 0.14);
  border-bottom: 1px solid rgba(236, 236, 236, 0.14);
  min-height: 7rem;
  display: flex;
  flex-direction: row;
  background-color: rgb(15, 15, 15) !important;
  border-radius: 5px;
}




.story-list {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
}

.status-title {
  padding: 0.1rem;
  min-width: 7rem;
  margin: 0 0.5rem;
  display: flex;

  border-radius: 7px;
}

.status-title h1 {
  margin: auto 0;
  text-align: center;
  align-content: center;
}



.story h1 {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.77);
}

.story-top button {
  margin-right: 0;
}


.story-number {
  text-align: center;
  margin: auto 0;
}


</style>
