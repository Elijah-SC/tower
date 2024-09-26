<script setup>
import { Profile } from "@/models/Profile.js";
import { TicketProfile } from "@/models/Ticket.js";

defineProps({
  attendee: { type: TicketProfile, required: true }
})
</script>


<template>
  <div class="d-flex align-items-center my-2">
    <img :src="attendee.profile.picture" :alt="attendee.profile.name">
    <p class="mb-0 ps-3">{{ attendee.profile.name }}</p>
  </div>
</template>


<style lang="scss" scoped>
img {
  height: 4vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}
</style>