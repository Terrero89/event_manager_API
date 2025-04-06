<template>
  <div>
    <div class="item-status">
      <div class="story-list">

      </div>
     <slot/>
    </div>
  </div>
</template>

<style scoped>
.progress {
  background-color: #1f242a;
  padding: 0.2rem;

}

.no-story {
  align-items: center;
  margin: auto 0;
    max-width:10rem;
}

.item-status {
  padding: 0.2rem 0.7rem;
  margin: 0.2rem auto;
  border-top: 1px solid rgba(236, 236, 236, 0.14);
  border-bottom: 1px solid rgba(236, 236, 236, 0.14);
  min-height: 7rem;
  display: flex;
  flex-direction: row;
  background-color: rgb(15, 15, 15) !important;
  border-radius: 5px;
  max-width:65rem;
}

.story-list {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  flex-wrap: wrap;
  
}

.status-title {
  padding: 0.1rem;
  min-width: 8rem;
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
  margin: auto 0 auto 1rem;
}


</style>
