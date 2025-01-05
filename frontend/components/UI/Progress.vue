<script setup lang="ts">
const props = defineProps([
  //PROPS HERE
  "progressTitle",
  "storyNumber",
]);

const titleTop = ref(
    "Prevent conversation service API from opening a new conversacion for a new exposure on claim and phone numner."
);
const type1 = ref("FullStack");
const type2 = ref("Frontend");
// computer properties
// const work = computed(() => {
//   return workType.value ? 'fullstack' : 'frontend';
// });
</script>

<template>
  <div>
    <div class="item-status">
      <div class="status-title">
        <h1>{{ progressTitle }}</h1>
        <span class="story-number">{{ storyNumber }}</span>
      </div>

      <div class="story-list">
        <div class="story">
          <UTooltip text="More" :popper="{ arrow: true }" class="story-button">
            <button class="">
              <Icon name="i-heroicons-ellipsis-horizontal-circle" class=" icons"/>
            </button>
          </UTooltip>

          <!--         + create a button to be able to move tasks to different status-->
          <h1>{{ titleTop.substring(0, 30) }}</h1>
          <div><span class="type">FullStack</span></div>

          <div>
            <Icon class="story-id doc icons " name="i-heroicons-document"/>
            <span class="story-id">DMR-10427</span>
            <UTooltip text="Story Points" :popper="{ arrow: true }">
              <span class="story-points">3</span>
            </UTooltip>
            <UTooltip text="Repos" :popper="{ arrow: true }">
              <button class="">
                <Icon name="i-heroicons-document-check" class="icons"/>
              </button>
            </UTooltip>


          </div>

        </div>

<!--        second story -->
        <div class="story">
          <UTooltip text="More" :popper="{ arrow: true }" class="story-button">
            <button class="">
              <Icon name="i-heroicons-ellipsis-horizontal-circle" class=" icons"/>
            </button>
          </UTooltip>

          <!--         + create a button to be able to move tasks to different status-->
          <h1>{{ titleTop.substring(0, 30) }}</h1>
          <div><span class="type">Backend</span></div>

          <div>
            <Icon class="story-id doc icons " name="i-heroicons-document"/>
            <span class="story-id">DMR-10427</span>
            <UTooltip text="Story Points" :popper="{ arrow: true }">
              <span class="story-points">3</span>
            </UTooltip>
            <UTooltip text="Repos" :popper="{ arrow: true }">
              <button class="">
                <Icon name="i-heroicons-document-check" class="icons"/>
              </button>
            </UTooltip>


          </div>

        </div>
        <!--       third story -->
        <div class="story">
          <UTooltip text="More" :popper="{ arrow: true }" class="story-button">
            <button class="">
              <Icon name="i-heroicons-ellipsis-horizontal-circle" class=" icons"/>
            </button>
          </UTooltip>

          <!--         + create a button to be able to move tasks to different status-->
          <h1>{{ titleTop.substring(0, 30) }}</h1>
          <div><span class="type">Frontend</span></div>

          <div>
            <Icon class="story-id doc icons " name="i-heroicons-document"/>
            <span class="story-id">DMR-10427</span>
            <UTooltip text="Story Points" :popper="{ arrow: true }">
              <span class="story-points">3</span>
            </UTooltip>
            <UTooltip text="Repos" :popper="{ arrow: true }">
              <button class="">
                <Icon name="i-heroicons-document-check" class="icons"/>
              </button>
            </UTooltip>


          </div>

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
</style>
