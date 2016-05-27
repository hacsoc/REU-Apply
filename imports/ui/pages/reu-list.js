import { ReactiveDict } from 'meteor/reactive-dict';
import { Template } from 'meteor/templating';
import { REUs } from '../../api/REUs.js';

import "./reu-list.html";

Template.reu_list.onCreated(function appBodyOnCreated() {
	this.subscribe('reus');

	this.state = new ReactiveDict();
});

Template.reu_list.helpers({
	reus() {
		return REUs.find({});
	},
});