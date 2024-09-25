import { logger } from "@/utils/Logger.js"
import { api } from "./AxiosService.js"
import { TowerEvent } from "@/models/TowerEvent.js"
import { AppState } from "@/AppState.js"

class EventService {
  async createEvent(EventData) {
    const response = await api.post(`api/events`, EventData)
    logger.log(`created Event`, response.data)
    const newEvent = new TowerEvent(response.data)
    AppState.events.push(newEvent)
    return newEvent
  }
  async findEventById(eventId) {
    const response = await api.get(`api/events/${eventId}`)
    // console.log(`found event wid Id of ${eventId}`, response.data);
    const newEvent = new TowerEvent(response.data)
    AppState.activeEvent = newEvent
  }
  async getAllEvents() {
    const response = await api.get(`api/events`)
    // logger.log(`found all Events`, response.data)
    this.handleResponseData(response.data)
  }

  handleResponseData(responseData) {
    const newEvents = responseData.map(eventPOJO => new TowerEvent(eventPOJO))
    AppState.events = newEvents
    // theyu
  }
}

export const eventService = new EventService()