<script setup>
import { eventService } from "@/services/EventService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { Modal } from "bootstrap";
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute()
const router = useRouter()

const formData = ref({
  name: ``,
  description: ``,
  coverImg: ``,
  location: ``,
  capacity: ``,
  startDate: ``,
  isCanceled: false,
  type: ``,
})
const currentDate = ref(new Date().toLocaleDateString(`af-za`))

const selectOptions = ref([`concert`, `convention`, `sport`, `digital`])

async function createEvent() {
  try {
    const newEvent = await eventService.createEvent(formData.value)
    resetForm()
    Pop.toast(`Event created`, `success`, `top`)
    Modal.getOrCreateInstance('#event-form').hide()
    router.push({ name: `Event`, params: { eventId: newEvent.id } })
  }
  catch (error) {
    Pop.error(error);
    logger.error(error)
  }
}

function resetForm() {
  formData.value = {
    name: ``,
    description: ``,
    coverImg: ``,
    location: ``,
    capacity: ``,
    startDate: ``,
    isCanceled: false,
    type: ``,
  }
}
</script>


<template>

  <body>
    <h3 class="text-center fw-bold">Create Event</h3>
    <form @submit.prevent="createEvent()" class="container-fluid">
      <div>
        <label class="form-label" for="name">Name</label>
        <input required v-model="formData.name" type="text" minlength="3" maxlength="50" class="form-control">
      </div>
      <div class="row justify-content-around align-items-center">
        <div class="col-sm-4">
          <label class="form-label" for="Capacity">Capacity</label>
          <input required v-model="formData.capacity" type="number" min="1" maxlength="5000" class="form-control">
        </div>
        <div class="col-sm-4 mb-3">
          <label class="form-label" for="Location">Location</label>
          <input required v-model="formData.location" type="text" minlength="1" maxlength="5000" class="form-control">
        </div>
        <div class="text-center col-sm-4">
          <label class="form-label pe-2" for="Type">Type of Event</label>
          <select required v-model="formData.type" name="Type">
            <option v-for="option in selectOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
      <div class="row justify-content-between align-items-center">
        <div class="col-sm-6 col-md-8 mb-3">
          <label class="form-label" for="coverImg">CoverImg Url</label>
          <input required v-model="formData.coverImg" type="url" minlength="10" maxlength="1000" class="form-control">
        </div>
        <div class="col-sm-5 col-md-4 text-center">
          <label class="form-label pe-2" for="Start Date">Start Date</label>
          <input v-model="formData.startDate" type="date" :min="currentDate">
        </div>
      </div>
      <div class="mb-3">
        <label class="form-label" for="description">description</label>
        <textarea required v-model="formData.description" class="form-control" minlength="15" maxlength="1000"
          name="description"></textarea>
      </div>
      <div class="w-100 text-end">
        <button action="submit" class="btn btn-outline-info">Create<i class="mdi mdi-plus"></i></button>
      </div>
    </form>
  </body>
</template>


<style lang="scss" scoped></style>