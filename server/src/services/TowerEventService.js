import { dbContext } from "../db/DbContext.js"
import { Forbidden, NotFound } from "../utils/Errors.js"

class TowerEventService {
  async updateEvent(updateData, userId, eventId) {
    const eventToUpdate = await this.getEventById(eventId)

    if (eventToUpdate.creatorId != userId) throw new Forbidden(`Invalid Credentials`)
    if (eventToUpdate.isCanceled) throw new Error(`Cannot Edit a Canceled Event`)

    eventToUpdate.name = updateData.name ?? eventToUpdate.name
    eventToUpdate.description = updateData.description ?? eventToUpdate.description
    eventToUpdate.coverImg = updateData.coverImg ?? eventToUpdate.coverImg
    eventToUpdate.location = updateData.location ?? eventToUpdate.location
    eventToUpdate.capacity = updateData.capacity ?? eventToUpdate.capacity
    eventToUpdate.startDate = updateData.startDate ?? eventToUpdate.startDate
    eventToUpdate.type = updateData.type ?? eventToUpdate.type
    await eventToUpdate.save()
    return eventToUpdate
  }
  async cancelEvent(eventId, userId) {
    const eventToCancel = await this.getEventById(eventId)

    if (userId != eventToCancel.creatorId) throw new Forbidden(`Invalid credentials`)

    eventToCancel.isCanceled = !eventToCancel.isCanceled
    await eventToCancel.save()
    if (!eventToCancel.isCanceled) return 'Event has been reactivated'
    return `Event has been Canceled`
  }
  async getEventById(eventId) {
    const foundEvent = await dbContext.Events.findById(eventId).populate(`creator`, `-email -subs`).populate(`ticketCount`)
    if (foundEvent == null) throw new NotFound(`Id not found`)
    return foundEvent
  }
  async getAllEvents() {
    const events = await dbContext.Events.find().populate(`creator`, `-email, -subs`).populate(`ticketCount`)
    return events
  }
  async createEvent(eventData) {
    const createdEvent = await dbContext.Events.create(eventData)
    await createdEvent.populate(`creator`, `-email -subs`)
    await createdEvent.populate(`ticketCount`)
    return createdEvent
  }

}

export const towerEventService = new TowerEventService()