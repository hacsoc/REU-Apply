import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';

export const REUs = new Mongo.Collection('reus');

REUs.schema = new SimpleSchema({
	name: { type: String },
	location: { type: String},
	school: { type: String },
	website: { type: String },
	startDate: { type: Date },
});