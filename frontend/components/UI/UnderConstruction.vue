<template>
  <div class="construction-container">
    <div class="build-area">
      <!-- House -->
      <div class="house">
        <div class="roof"></div>
        <div class="walls">
          <div
            v-for="(brick, i) in bricks"
            :key="i"
            class="brick"
            :class="{ active: currentBrick === i }"
          >
            <span class="dust" v-if="currentBrick === i"></span>
          </div>
        </div>
      </div>

      <!-- Hammer hitting next to the house -->
      <div class="hammer" :class="{ hammering: isHammering }">🔨</div>
    </div>

    <!-- Message -->
    <h1 class="title">Page Under Construction</h1>
    <p class="subtitle">We're building something awesome. Check back soon!</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const bricks = ref(Array.from({ length: 9 }))
const currentBrick = ref(0)
const isHammering = ref(false)

onMounted(() => {
  let i = 0
  setInterval(() => {
    isHammering.value = true
    currentBrick.value = i % bricks.value.length
    setTimeout(() => {
      isHammering.value = false
    }, 300)
    i++
  }, 600)
})
</script>

<style scoped>
/* Layout */
.construction-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to bottom, #f8fafc, #e0e7ff);
  padding: 2rem;
  text-align: center;
}

/* Build area */
.build-area {
  display: flex;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 2rem;
  position: relative;
}

/* House */
.house {
  position: relative;
}

.roof {
  width: 0;
  height: 0;
  border-left: 60px solid transparent;
  border-right: 60px solid transparent;
  border-bottom: 40px solid #4b5563;
  margin: 0 auto;
}

.walls {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 120px;
  gap: 2px;
  margin-top: 5px;
}

.brick {
  width: 38px;
  height: 20px;
  background-color: #9ca3af;
  border-radius: 2px;
  position: relative;
  opacity: 0.4;
  transition: opacity 0.2s ease;
}

.brick.active {
  opacity: 1;
  animation: popIn 0.3s ease;
}

/* Dust */
.dust {
  position: absolute;
  top: -10px;
  left: 12px;
  width: 12px;
  height: 12px;
  background: radial-gradient(circle, #d1d5db 0%, #9ca3af 100%);
  border-radius: 50%;
  animation: dustRise 0.4s ease-out;
}

/* Hammer */
.hammer {
  font-size: 2.5rem;
  transform-origin: bottom left;
  transition: transform 0.2s ease;
}
.hammering {
  animation: hammerMotion 0.3s ease;
}

/* Text */
.title {
  font-size: 1.8rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
  color: #1f2937;
}

.subtitle {
  font-size: 1rem;
  color: #4b5563;
}

/* Animations */
@keyframes hammerMotion {
  0% {
    transform: rotate(0deg);
  }
  30% {
    transform: rotate(-30deg);
  }
  100% {
    transform: rotate(0deg);
  }
}

@keyframes popIn {
  from {
    transform: translateY(10px);
    opacity: 0.6;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes dustRise {
  0% {
    transform: translateY(0) scale(0.8);
    opacity: 0;
  }
  40% {
    opacity: 0.6;
  }
  100% {
    transform: translateY(-20px) scale(1.2);
    opacity: 0;
  }
}
</style>
