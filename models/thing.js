import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// TODO: Tenodi - Research if we should add strict: 'throw' option to produce
// errors when values passed to model constructor are not specified in schema.
// http://mongoosejs.com/docs/guide.html#strict
const ThingSchema = new Schema({
  name: String,
  info: String,
  active: Boolean,
});

export default mongoose.model('Thing', ThingSchema);
