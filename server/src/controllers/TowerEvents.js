import auth0provider, { Auth0Provider } from "@bcwdev/auth0provider";
import BaseController from "../utils/BaseController.js";
import { towerEventService } from "../services/TowerEvents.js";

export class TowerEvents extends BaseController {
  constructor() {
    super(`api/events`)
    this.router
      .get(``, this.getAllEvents)
      .get(`/:eventId`, this.getEventById)
      .use(Auth0Provider.getAuthorizedUserInfo)
      .post(``, this.createEvent)
  }

  async getEventById(request, response, next) {
    try {
      const eventId = request.params.eventId
      const foundEvent = await towerEventService.getEventById(eventId)
      response.send(foundEvent)
    } catch (error) {
      next(error)
    }
  }
  async getAllEvents(request, response, next) {
    try {
      const events = await towerEventService.getAllEvents();
      response.send(events)
    }
    catch (error) {
      next(error);
    }
  }
  async createEvent(request, response, next) {
    try {
      const eventData = request.body
      const user = request.userInfo
      const createdEvent = await towerEventService.createEvent(eventData, user.id)
      response.send(createdEvent)
    }
    catch (error) {
      next(error)
    }
  }

}