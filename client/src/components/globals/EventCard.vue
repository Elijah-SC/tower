<script setup>
import { TowerEvent } from "@/models/TowerEvent.js";

defineProps({
  event: { type: TowerEvent, required: true }
})
</script>


<template>
  <router-link :to="{ name: 'Event', params: { eventId: event.id } }">

    <body class="card h-100">
      <img :src="event.coverImg" :alt="event.name" class="card-img-top card-img">
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
}
</style>