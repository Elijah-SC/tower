import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { AppState } from "@/AppState.js"
import { Comment } from "@/models/Comment.js"

class CommentService {
  async deleteComment(commentId) {
    const response = await api.delete(`api/comments/${commentId}`)
    // logger.log(response.data)
    const commentIndex = AppState.activeEventComments.findIndex(comment => comment.id == commentId)
    AppState.activeEventComments.splice(commentIndex, 1)
  }
  async getEventComments(eventId) {
    const response = await api.get(`api/events/${eventId}/comments`)
    // logger.log(`got comments for Event`, response.data)
    const newComments = response.data.map(commentData => new Comment(commentData))
    AppState.activeEventComments = newComments
  }
  async createComment(commentBody) {
    const response = await api.post(`api/comments`, commentBody)
    logger.log(`created Comment`, response.data)
    const newComment = new Comment(response.data)
    AppState.activeEventComments.push(newComment)
  }

}

export const commentService = new CommentService()