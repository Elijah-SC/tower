<script setup>
import { AppState } from "@/AppState.js";
import { eventService } from "@/services/EventService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const activeEvent = computed(() => AppState.activeEvent)
const route = useRoute()
watch(() => route.params.eventId, () => {
  findEventById()
}, { immediate: true })

async function findEventById() {
  try {
    const eventId = route.params.eventId
    await eventService.findEventById(eventId)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}
</script>


<template>

  <body>
    <h1> this is the event Page</h1>

  </body>
</template>


<style lang="scss" scoped></style>