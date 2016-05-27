import { REUs } from '../../api/REUs.js';
import { Meteor } from 'meteor/meteor';

Meteor.publish('reus', function reuPub() {
	return REUs.find({});
});