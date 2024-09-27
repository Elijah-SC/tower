import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Profile } from "@/models/Profile.js"
import { AppState } from "@/AppState.js"
import { TicketEvent, TicketProfile } from "@/models/Ticket.js"

class TicketService {
  async getAccountTickets() {
    const response = await api.get(`/account/tickets`)
    logger.log(`got tickets by Event`, response.data)
    const newAccountTickets = response.data.map(ticketData => new TicketEvent(ticketData))
    AppState.accountEvents = newAccountTickets
  }
  async deleteTicket(ticketId) {
    const response = await api.delete(`api/tickets/${ticketId}`)
    logger.log(response.data)
    const TicketIndex = AppState.eventAttendees.findIndex(ticket => ticket.id == ticketId)
    AppState.eventAttendees.splice(TicketIndex, 1)
    AppState.activeEvent.ticketCount--
  }
  async createTicket(ticketData) {
    const response = await api.post(`api/tickets`, ticketData)
    logger.log(response.data)
    const newAttendee = new TicketProfile(response.data)
    AppState.eventAttendees.push(newAttendee)
    AppState.activeEvent.ticketCount++
  }
  async findTicketsByEvent(eventId) {
    const response = await api.get(`api/events/${eventId}/tickets`)
    logger.log(`found attendees`, response.data)
    const newAttendees = response.data.map(profileData => new TicketProfile(profileData))
    AppState.eventAttendees = newAttendees
  }

}

export const ticketService = new TicketService()