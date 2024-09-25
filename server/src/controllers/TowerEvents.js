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
      .put(`/:eventId`, this.updateEvent)
      .delete(`/:eventId`, this.cancelEvent)
  }
  async cancelEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const userId = request.userInfo.id
      const message = await towerEventService.cancelEvent(eventId, userId)
      response.send(message)
    } catch (error) {
      next(error)
    }
  }
  async updateEvent(request, response, next) {
    try {
      const eventId = request.params.eventId
      const updateData = request.body
      const userId = request.userInfo.id
      const updatedEvent = await towerEventService.updateEvent(updateData, userId, eventId)
      response.send(updatedEvent)
    }
    catch (error) {
      next(error)
    }
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
      const userId = request.userInfo.id
      eventData.creatorId = userId
      const createdEvent = await towerEventService.createEvent(eventData)
      response.send(createdEvent)
    }
    catch (error) {
      next(error)
    }
  }

}