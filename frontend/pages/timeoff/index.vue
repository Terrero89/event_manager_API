<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { CONFIG } from '~/config/globalVariables'



// Stores
const sprintStore  = useSprintStore()
const timeoffStore = useTimeoffStore()

// Actions & state
const { currentSprint, sprintList } = storeToRefs(sprintStore)
const { fetchSprints } = sprintStore
// Define the type for a timeoff item
interface TimeoffItem {
  _id: string
  sprintId: string
  title: string
  timeOff: string
  timeOffType: string
  date: string
  createdAt: string
  updatedAt: string
}

const { items } = storeToRefs(timeoffStore) as { items: Ref<TimeoffItem[]> }
const { fetchTimeoff } = timeoffStore
const {} = timeoffStore


// Navigation “Add” link
const links = [
  [],
  [
    {
      icon: 'i-heroicons-plus',
      to: '/timeoff/create',
      badge: { label: 'Add timeoff', color: 'blue', size: 'md' }
    }
  ]
]

// Modal for insights (as in Stories)
const isOpen = ref(false)

// Search / filter inputs
const show      = computed(() => items.value.length > 0)
const inputValue    = ref('')
const typeFilter    = ref('')
const startDate     = ref('')
const endDate       = ref('')

// Stats & filtered list
// const stats = computed(() =>
//   totalFilteredTimeoffStats(
//     filterTimeoffs(inputValue.value, typeFilter.value, startDate.value, endDate.value)
//   )
// )
// const showStats = computed(() =>
//   inputValue.value || typeFilter.value || startDate.value || endDate.value
// )
// const sortedFiltered = computed(() => {
//   // no special “In Progress” sorting—just return filtered
//   return filterTimeoffs(inputValue.value, typeFilter.value, startDate.value, endDate.value)
// })

// Fetch on mount
onMounted(async () => {
  await fetchSprints()
  await fetchTimeoff()
})

definePageMeta({ requiresAuth: true });
</script>

<template class="border-b border-gray-200">
  <div>
  <div>
    <!-- PROGRESS BAR -->
    <UIProgress />

    <!-- Top Nav -->
    <div class="nav-flex my-2 border-b border-gray-200 dark:border-gray-800">
      <UHorizontalNavigation :links="links" />
      <UModal v-model="isOpen">
        <div class="p-4">Insights here…</div>
      </UModal>
      <UButton
        class="my-3"
        color="blue"
        variant="soft"
        label="Add"
        @click="isOpen = true"
      >
        Insights
      </UButton>
    </div>

    <!-- Filters -->
    <div class="nav-flex wrapit" v-if="show">
      <UInput
        v-model="inputValue"
        placeholder="Search by reason..."
        class="w-full lg:w-48 my-3 mr-2"
        color="gray"
        variant="outline"
      />
      <UInputMenu
        v-model="typeFilter"
        :options="CONFIG.variables.timeoffTypes"
        placeholder="Filter by type"
        class="w-full lg:w-48 my-3 mr-2"
        trailing-icon="i-heroicons-chevron-down"
        color="gray"
        variant="outline"
      />
      <UInput
        v-model="startDate"
        type="date"
        placeholder="Start date"
        class="w-full lg:w-36 my-3 mr-2"
        color="gray"
        variant="outline"
      />
      <UInput
        v-model="endDate"
        type="date"
        placeholder="End date"
        class="w-full lg:w-36 my-3 mr-2"
        color="gray"
        variant="outline"
      />
      <UButton
        class="my-3 mx-2 ml-auto"
        color="teal"    
        variant="outline"
        label="Clear"
        @click="
          inputValue=''; typeFilter=''; startDate=''; endDate=''
        "
      />
    </div>

    <!-- Stats -->
    <!-- <div class="numbers my-2" v-if="showStats">
      <div class="mr-2">
        Total Requests:
        <UBadge variant="soft" color="teal" class="font-bold">
          {{ stats.totalItems }}
        </UBadge>
      </div>
      <div class="mr-2" v-if="stats.byType > 0">
        {{ typeFilter || 'All Types' }}:
        <UBadge variant="soft" color="teal" class="font-bold">
          {{ stats.byType }}
        </UBadge>
      </div>
    </div> -->

    <!-- Empty / List -->
    <UIEmptyMessage v-if="items.length < 1" title="timeoff requests" />
    <TimeoffList
      v-else
      v-for="item in items"
      :key="item._id"
      :_id="item._id"
      :sprintId="item.sprintId"
      :title="item.title"
      :timeOff="item.timeOff"
      :timeOffType="item.timeOffType"
      :date="item.date"
      :createdAt="item.createdAt"
      :updatedAt="item.updatedAt"
    />
  </div>
  <div class="my-12"></div>
  </div>
</template>

<style scoped>
.wrapit { flex-wrap: wrap; }
.nav-flex { display: flex; justify-content: flex-start; }
.numbers { display: flex; gap: 1rem; align-items: center; }
</style>
