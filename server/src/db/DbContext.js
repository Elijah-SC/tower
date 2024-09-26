import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { TowerEventSchema } from "../models/TowerEvent.js";
import { TicketSchema } from "../models/Ticket.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Events = mongoose.model(`Event`, TowerEventSchema)
  Tickets = mongoose.model(`Ticket`, TicketSchema)
}

export const dbContext = new DbContext()
