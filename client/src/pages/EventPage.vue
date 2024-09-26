<script setup>
import { AppState } from "@/AppState.js";
import EventAttendees from "@/components/globals/EventAttendees.vue";
import { Ticket } from "@/models/Ticket.js";
import { eventService } from "@/services/EventService.js";
import { ticketService } from "@/services/TicketService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed, watch } from "vue";
import { useRoute } from "vue-router";

const activeEvent = computed(() => AppState.activeEvent)
const account = computed(() => AppState.account)
const route = useRoute()
const eventAttendees = computed(() => AppState.eventAttendees)
watch(() => route.params.eventId, () => {
  findEventById()
  findTicketsByEvent()
}, { immediate: true })

const isCreator = computed(() => {
  if (!account.value) return false
  if (!activeEvent.value) return false
  if (account.value.id != activeEvent.value.creatorId) return false
  return true
})

const SpotsAvailable = computed(() => {
  if (activeEvent.value.capacity == parseInt(activeEvent.value.ticketCount)) return false
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

async function cancelEvent() {
  try {
    if (AppState.activeEvent.isCanceled == false) {
      const confirmCancel = await Pop.confirm(`are you sure you want to cancel this could be quite confusing to attendees if you have to reactivate`, ``)
      if (!confirmCancel) return
    }
    if (AppState.activeEvent.isCanceled == true) {
      const confirmReactivate = await Pop.confirm(`are you sure you want to reactivate this event, this could be quite confusing to attendees if not intended`, ``)
      if (!confirmReactivate) return
    }
    await eventService.cancelEvent(activeEvent.value.id)
  }
  catch (error) {
    Pop.error(error);
    logger.log(error)
  }
}

async function findTicketsByEvent() {
  try {
    const eventId = route.params.eventId
    await ticketService.findTicketsByEvent(eventId)
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

async function createTicket() {
  try {
    const ticketData = {
      eventId: route.params.eventId
    }
    await ticketService.createTicket(ticketData)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
</script>


<template>

  <body v-if="activeEvent" class="container-fluid">
    <div class="row justify-content-around">
      <div class="col-10 p-0">
        <div class="my-2">
          <img :src="activeEvent.coverImg" alt="Event CoverImg" class="img-fluid w-100 cover-img">
          <span v-if="activeEvent.isCanceled"
            class="canceled text-center ms-2 rounded-pill text-light fs-3">Cancelled</span>
        </div>
      </div>
    </div>
    <div class="row justify-content-center gap-2">
      <div class="col-md-8">
        <div class="d-flex justify-content-between">
          <h1>{{ activeEvent.name }} <span v-html="activeEvent.typeIcon"></span></h1>
          <div>
            <button @click="cancelEvent()" v-if="isCreator && !activeEvent.isCanceled"
              class="btn btn-outline-dark">Cancel Event</button>
            <button @click="cancelEvent()" v-else-if="isCreator && activeEvent.isCanceled"
              class="btn btn-outline-dark">Activate Event</button>
          </div>
        </div>
        <div>
          <div>
            <p>{{ activeEvent.description }}</p>
          </div>
          <h4>Date</h4>
          <p>
            <i class="mdi mdi-calendar text-info"></i>
            {{ activeEvent.startDate.toLocaleDateString() }}
          </p>
        </div>
        <div>
          <h4>Location</h4>
          <p><i class="mdi mdi-map-marker text-info"></i>{{ activeEvent.location }}</p>
        </div>
      </div>
      <div v-if="activeEvent" class="col-md-2">
        <div class="ticket-box text-center p-2 mt-5 rounded">
          <h5>Interested in Going?</h5>
          <p>Grab a ticket!</p>
          <button v-if="activeEvent.isCanceled" class="btn btn-danger" disabled> Cancelled </button>
          <button @click="createTicket()" v-else-if="SpotsAvailable" class="btn btn-primary">Attend</button>
          <button v-else disabled class="btn btn-danger">SOLD OUT</button>
        </div>
        <p v-if="!activeEvent.isCanceled" class="text-end">{{ activeEvent.capacity -
          parseInt(activeEvent.ticketCount)
          }} spots left</p>
        <h5 class="fw-bold mt">Attendees</h5>
        <div class="ticket-box p-2 rounded">
          <div v-for="attendee in eventAttendees" :key="attendee.profile.id">
            <EventAttendees :attendee="attendee" />
          </div>
        </div>
      </div>
    </div>
  </body>
</template>


<style lang="scss" scoped>
.cover-img {
  height: 40vh;
  border-radius: 5%;
  object-fit: cover;
  object-position: center;
  position: relative;
}

.canceled {
  background-color: rgba(255, 0, 0, 0.511);
  backdrop-filter: blur(5px);
  width: 50%;
  position: absolute;
  left: 10%;
  top: 42%;
}

.ticket-box {
  background-color: rgb(233, 233, 233);
}

body {
  min-height: 100vh;
}

.mt {
  margin-top: 10em;
}
</style>