<script setup>
import { TowerEvent } from "@/models/TowerEvent.js";

defineProps({
  event: { type: TowerEvent, required: true }
})
</script>


<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">

    <body class="card card-height">
      <div>
        <img :src="event.coverImg" :alt="event.name" class="card-img-top card-img">
        <span v-if="event.isCanceled" class="canceled text-center ms-2 rounded-pill text-light fs-5">Cancelled</span>
        <span v-if="event.capacity == event.ticketCount"
          class="sold-out text-center ms-2 rounded-pill text-light fs-5">Sold Out</span>
      </div>
      <div class="card-body">
        <h5 class="card-title">{{ event.name }} <span v-html="event.typeIcon" :title="event.type"></span></h5>
        <p>Hosted by {{ event.creator.name }}</p>
        <p>Hosted at {{ event.location }} on {{ event.startDate.toLocaleDateString() }}</p>
      </div>
    </body>
  </router-link>

</template>


<style lang="scss" scoped>
.card-img {
  height: 25vh;
  object-fit: cover;
  object-position: center;
  position: relative;
}

.card-height {
  height: 50vh;
}

.canceled {
  background-color: rgba(255, 0, 0, 0.511);
  backdrop-filter: blur(5px);
  width: 50%;
  position: absolute;
  left: 0;
  top: 42%;
}

.sold-out {
  background-color: rgba(0, 0, 255, 0.599);
  backdrop-filter: blur(5px);
  width: 50%;
  position: absolute;
  left: 0;
  top: 42%;
}
</style>