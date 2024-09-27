import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerEventService } from "./TowerEventService.js"

class CommentService {
  async deleteComment(commentId, userId) {
    const commentToDelete = await dbContext.Comments.findById(commentId)
    const foundEvent = await towerEventService.getEventById(commentToDelete.eventId)
    if (userId != commentToDelete.creatorId) throw new Forbidden(`Invalid Creditanails`)
    await commentToDelete.deleteOne()
    return `deleted Comment`
  }
  async getEventComments(eventId) {
    const comments = await dbContext.Comments.find({ eventId: eventId }).populate(`creator`, `name picture`)
    return comments
  }
  async createComment(commentData) {
    const comment = await dbContext.Comments.create(commentData)
    await comment.populate(`creator`, `name picture`)
    return comment
  }

}

export const commentService = new CommentService()