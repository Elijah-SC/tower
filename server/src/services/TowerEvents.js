import { dbContext } from "../db/DbContext.js"
import { NotFound } from "../utils/Errors.js"

class TowerEventService {
  async getEventById(eventId) {
    const foundEvent = (await dbContext.Event.findById(eventId)).populate(`creator`, `-email -subs`)
    if (foundEvent == null) throw new NotFound(`Id not found`)
    return foundEvent
  }
  async getAllEvents() {
    const events = await dbContext.Event.find().populate(`creator`, `-email, -subs`)
    return events
  }
  async createEvent(eventData, userId) {
    eventData.creatorId = userId
    const createdEvent = await dbContext.Event.create(eventData)
    await createdEvent.populate(`creator`, `-email -subs`)
    return createdEvent
  }

}

export const towerEventService = new TowerEventService()