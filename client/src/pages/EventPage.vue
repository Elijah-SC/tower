<script setup>
import { AppState } from "@/AppState.js";
import { eventService } from "@/services/EventService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const activeEvent = computed(() => AppState.activeEvent)
const account = computed(() => AppState.account)
const route = useRoute()
watch(() => route.params.eventId, () => {
  findEventById()
}, { immediate: true })

const isCreator = computed(() => {
  if (!account.value) return false
  if (!activeEvent.value) return false
  if (account.value.id != activeEvent.value.creatorId) return false
  return true
})

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

  <body v-if="activeEvent" class="container-fluid">
    <div class="row justify-content-around">
      <div class="col-10 p-0">
        <div class="my-2">
          <img :src="activeEvent.coverImg" alt="Event CoverImg" class="img-fluid w-100 cover-img">
        </div>
      </div>
    </div>
    <div class="row justify-content-center gap-2">
      <div class="col-8 d-flex justify-content-between">
        <h1>{{ activeEvent.name }} <span v-html="activeEvent.typeIcon"></span></h1>
        <button v-if="isCreator && !activeEvent.isCanceled" class="btn btn-outline-dark">Cancel Event</button>
        <button v-else-if="isCreator && activeEvent.isCanceled" class="btn btn-outline-dark">unCancel Event</button>
      </div>
      <div class="col-2"></div>
    </div>
  </body>
</template>


<style lang="scss" scoped>
.cover-img {
  min-height: 30vh;
  border-radius: 5%;
}
</style>