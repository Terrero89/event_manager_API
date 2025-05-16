<script setup lang="ts">
const items = ref([

  {

    icon: "heroicons:chevron-double-right-solid",
    to: "/sprints",
  },
  {

    icon: "heroicons:book-open-16-solid",
    to: "/notes",
  },
  {

    icon: "heroicons:calendar-date-range-20-solid",
    to: "/events",

  }
  ,
  {

    icon: "heroicons:calendar-date-range-solid",
    to: "/meetings",

  },
  {

    icon: "i-heroicons-chart-bar",
    to: "/dashboard",
  },


])

</script>

<template>
  <div>


    <div class="fix">
      <UHorizontalNavigation :links="items" class="border-b border-gray-200 dark:border-gray-800 mx-auto header" />
    </div>



  </div>
</template>

<style scoped>

.fix{
  width: 100%;
  position: fixed;
  bottom: 15px;
  left: 0;
  z-index: 1000;
  background-color: rgb(15, 15, 15);
  
}

.nav-link {
  margin: 0 1.2rem;
}

.header {
  display: flex;
  justify-content: center;
}


.navbar {
  display: flex;
  justify-content: space-center;
  overflow: hidden;
  background-color: rgb(15, 15, 15);
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 4rem;
}

.navbar a {
  /* display: block; */
  color: rgb(255, 255, 255);
  text-align: center;
  /* padding: 14px 16px; */
  text-decoration: none;
  /* font-size: 17px; */
  border-radius: 10px;
}

.navbar a:hover {
  background-color: rgb(255, 255, 255, 0.8);
  color: black;
  border-radius: 10px;
}

/* .navbar a.active {
  background-color: #04aa6d;
  color: white;
}  */

.navbar .icon {
  display: none;
}

@media screen and (min-width: 600px) {
  .icons {
    display: none;
  }
}

@media screen and (max-width: 600px) {
  .navbar.responsive .icon {
    position: absolute;
    right: 0;
    bottom: 0;
  }

  .navbar.responsive a {
    float: none;
    display: block;
    text-align: left;
  }
}
</style>