import { FlowRouter } from 'meteor/kadira:flow-router';
import { BlazeLayout } from 'meteor/kadira:blaze-layout';

import '../../ui/layouts/MainLayout.js';
import '../../ui/pages/pages.js';

FlowRouter.route('/home', {
	name: 'home',
	action() {
		BlazeLayout.render('MainLayout', {main: 'index'});
	}
});

FlowRouter.route('/', {
	name: 'base',
	action() {
		BlazeLayout.render('MainLayout', {main: 'index'});
	}
});

FlowRouter.route('/about', {
	name: 'about',
	action() {
		BlazeLayout.render('MainLayout', {main: 'about'});
	}
});

FlowRouter.route('/reu-list', {
	name: 'reu-list',
	action() {
		BlazeLayout.render('MainLayout', {main: 'reu_list'});
	}
});

FlowRouter.route('/sign-up', {
	name: 'sign-up',
	action() {
		BlazeLayout.render('MainLayout', {main: 'sign_up'});
	}
});

FlowRouter.route('/sign-in', {
	name: 'sign-in',
	action() {
		BlazeLayout.render('MainLayout', {main: 'sign_in'});
	}
});