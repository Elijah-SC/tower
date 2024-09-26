import { dbContext } from "../db/DbContext.js"
import { Forbidden } from "../utils/Errors.js"
import { towerEventService } from "./TowerEventService.js"

class TicketService {
  async getEventTickets(eventId) {
    const eventTickets = await dbContext.Tickets.find({ eventId: eventId }).populate(`profile`)
    return eventTickets
  }
  async getMyTickets(userId) {
    const userTickets = await dbContext.Tickets.find({ accountId: userId }).populate(`event`)
    return userTickets
  }
  async deleteTicket(ticketId, userId) {
    const foundTicket = await dbContext.Tickets.findById(ticketId)
    if (foundTicket.accountId != userId) throw new Forbidden(`Invalid Authorization`)
    await foundTicket.deleteOne()
    return `you are no longer attending this Event`
  }
  async createTicket(ticketData) {
    const eventId = ticketData.eventId
    const foundEvent = await towerEventService.getEventById(eventId)
    if (foundEvent.isCanceled == true) throw new Error(`Cannot attend cancelled event`)
    const ticket = await dbContext.Tickets.create(ticketData)
    await ticket.populate(`event`)
    await ticket.populate(`profile`, `picture name`)
    return ticket
  }

}

export const ticketService = new TicketService()