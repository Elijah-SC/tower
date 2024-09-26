import { Schema, Types } from "mongoose";

export const TicketSchema = new Schema({

  eventId: { type: Schema.ObjectId, required: true, ref: `Event` },
  accountId: { type: Schema.ObjectId, required: true, ref: `Account` },
}, { toJSON: { virtuals: true } })

TicketSchema.virtual(`event`, {
  foreignField: `_id`,
  ref: `Event`,
  localField: `eventId`,
  justOne: true
})
TicketSchema.virtual(`profile`, {
  foreignField: `_id`,
  ref: `Account`,
  localField: `accountId`,
  justOne: true
})