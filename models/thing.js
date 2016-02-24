import mongoose from 'mongoose';

const Schema = mongoose.Schema;

var ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
});

export default mongoose.model('Thing', ThingSchema);
