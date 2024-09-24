<script setup>
import { AppState } from "@/AppState.js";
import EventCard from "@/components/globals/EventCard.vue";
import { eventService } from "@/services/EventService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, onMounted } from "vue";
onMounted(() => getAllEvents())

const events = computed(() => AppState.events)

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

  <body class="container-fluid">
    <section class="row">

      <div v-for="event in events" :key="event.id" class="col-md-4">
        <div class="my-2">
          <EventCard :event="event" />
        </div>
      </div>

    </section>
  </body>
</template>

<style scoped lang="scss"></style>
