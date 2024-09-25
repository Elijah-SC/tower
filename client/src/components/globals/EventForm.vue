<script setup>
import { isCancel } from "axios";
import { ref } from "vue";


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

const selectOptions = ref([`concert`, `convention`, `sport`, `digital`])
</script>


<template>

  <body>
    <h3 class="text-center fw-bold">Create Event</h3>
    <form>
      <div>
        <label class="form-label" for="name">Name</label>
        <input required v-model="formData.name" type="text" class="form-control">
      </div>
      <div class="d-flex justify-content-around align-items-center">
        <div>
          <label class="form-label" for="coverImg">CoverImg</label>
          <input required v-model="formData.coverImg" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label" for="Location">Location</label>
          <input required v-model="formData.location" type="text" class="form-control">
        </div>
        <div>
          <label class="form-label pe-2" for="Type">Type of Event</label>
          <select required v-model="formData.type" name="Type">
            <option v-for="option in selectOptions" :key="option" :value="option">{{ option }}</option>
          </select>
        </div>
      </div>
      <div class="d-flex justify-content-between">
        <div>
          <label class="form-label" for="Capacity">Location</label>
          <input required v-model="formData.capacity" type="number" min="1" maxlength="5000" class="form-control">
        </div>
        <div>
          <label class="form-label" for="Start Date">Location</label>
          <input required v-model="formData.location" type="text" class="form-control">
        </div>
      </div>
      <div>
        <label class="form-label" for="description">description</label>
        <textarea required v-model="formData.description" class="form-control" name="description"></textarea>
      </div>
    </form>
  </body>
</template>


<style lang="scss" scoped></style>