import { Template } from 'meteor/templating';

import './sign-up.html';

Template.sign_up.events({
	'submit'(event, instance) {
		event.preventDefault();
		console.log(instance);
	},
	'click #linkedin'(events, instance) {
		event.preventDefault();
	},
});

Template.sign_up.helpers({
});