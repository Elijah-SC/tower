import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { Profile } from "@/models/Profile.js"
import { AppState } from "@/AppState.js"
import { TicketProfile } from "@/models/Ticket.js"

class TicketService {
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