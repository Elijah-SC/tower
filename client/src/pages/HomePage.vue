<script setup>
import { AppState } from "@/AppState.js";
import EventCard from "@/components/globals/EventCard.vue";
import { eventService } from "@/services/EventService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted, ref } from "vue";
onMounted(() => getAllEvents())

const filterBy = ref(`all`)
const events = computed(() => {
  if (filterBy.value == `all`) {
    return AppState.events
  }
  return AppState.events.filter(event => event.type == filterBy.value)
})

const filterCategory = ['concert', 'convention', 'sport', 'digital']

async function getAllEvents() {
  try {
    await eventService.getAllEvents()
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}

</script>
<template>

  <body class="container">
    <section class="row">
      <div class="col-12">
        <div class="row my-2 justify-content-around">
          <div class="col-2 text-center">
            <button @click="filterBy = `all`" class="btn btn-success p-4 w-100">All</button>
          </div>
          <div v-for="category in filterCategory" :key="category" class="col-2 text-center">
            <button @click="filterBy = category" class="btn btn-success p-4 w-100">{{ category }}</button>
          </div>
        </div>
      </div>
      <div class="col-12">
        <div class="row mx-3">
          <div v-for="event in events" :key="event.id" class="col-md-4 h-100">
            <div class="my-2">
              <EventCard :event="event" />
            </div>
          </div>
        </div>
      </div>

    </section>
  </body>
</template>

<style scoped lang="scss">
body {
  background-color: var(--bs-body-bg);

}
</style>
