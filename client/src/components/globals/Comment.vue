<script setup>
import { AppState } from "@/AppState.js";
import { Comment } from "@/models/Comment.js";
import { commentService } from "@/services/CommentService.js";
import { logger } from "@/utils/Logger.js";
import Pop from "@/utils/Pop.js";
import { computed } from "vue";

const props = defineProps({
  commentProp: { type: Comment, required: true }
})
const user = computed(() => AppState.account)


const isAuthToDelete = computed(() => {
  if (user.value?.id != props.commentProp.creatorId) return false
  return true
})

async function deleteComment() {
  try {
    const confirm = await Pop.confirm(`are you sure you want to delete this comment`)
    if (!confirm) return
    const commentId = props.commentProp.id
    await commentService.deleteComment(commentId)
  } catch (error) {
    Pop.error(error)
    logger.log(error)
  }
}
</script>


<template>


  <div class="comment-card d-flex my-2 p-2 rounded">
    <div class="pe-3">
      <img :src="commentProp.creator.picture" alt="">
    </div>
    <div class="text">
      <h5>{{ commentProp.creator.name }}</h5>
      <div class="d-flex justify-content-between">
        <p class="body">{{ commentProp.body }}</p>
        <i @click="deleteComment()" v-if="isAuthToDelete && user" class="mdi mdi-alpha-x-box text-danger fs-3"
          title="Delete Comment"></i>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
img {
  height: 5vh;
  border-radius: 50%;
  object-fit: cover;
  object-position: center;
}

p {
  margin-bottom: unset;
}

.text {
  width: 90%;
}

.comment-card {
  background-color: white;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.501);
}

.body {
  font-size: 16px;
  color: rgba(0, 0, 0, 0.657);
}
</style>