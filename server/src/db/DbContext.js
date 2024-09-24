import mongoose from 'mongoose'
import { AccountSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { TowerEventSchema } from "../models/TowerEvent.js";

class DbContext {
  Account = mongoose.model('Account', AccountSchema);
  Event = mongoose.model(`Event`, TowerEventSchema)
}

export const dbContext = new DbContext()
