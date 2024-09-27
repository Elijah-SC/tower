import { Schema, Types } from "mongoose";

export const CommentSchema = new Schema({
  body: { type: String, required: true },
  creatorId: { type: Schema.ObjectId, required: true, ref: `Account` },
  eventId: { type: Schema.ObjectId, required: true, ref: `Event` }
}, { timestamps: true, toJSON: { virtuals: true } })

CommentSchema.virtual(`creator`, {
  localField: `creatorId`,
  foreignField: `_id`,
  ref: `Account`,
  justOne: true
})