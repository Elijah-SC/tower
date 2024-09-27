<script setup>
import { computed, onMounted } from 'vue';
import { AppState } from '../AppState.js';
import Pop from "@/utils/Pop.js";
import { logger } from "@/utils/Logger.js";
import { ticketService } from "@/services/TicketService.js";

const account = computed(() => AppState.account)
const accountEvents = computed(() => AppState.accountEvents)

onMounted(() =>
  getAccountTickets()
)


async function getAccountTickets() {
  try {
    await ticketService.getAccountTickets()
  } catch (error) {
    Pop.error(error)
    logger.error(error)
  }
}
</script>

<template>

  <body class="container-fluid">
    <div class="row about text-center">
      <div v-if="account">
        <h1>Welcome {{ account.name }}</h1>
        <img class="rounded" :src="account.picture" alt="" />
        <p>{{ account.email }}</p>
        <h3 class="my-2">Your Events</h3>
        <div class="col-12">
          <div class="row mx-3">
            <div v-for="event in accountEvents" :key="event.id" class="col-md-4 h-100">
              <div class="my-2">
                <EventCard :event="event.event" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <h1>Loading... <i class="mdi mdi-loading mdi-spin"></i></h1>
      </div>
    </div>
  </body>
</template>

<style scoped lang="scss">
img {
  max-width: 100px;
}

body {
  height: 100vh;
}
</style>
