import Router from 'next/router';
import * as actions from '../actions';
import { getCookie } from '../utils/cookie';

// checks if the page is being loaded on the server, and if so, get auth token from the cookie:
export default function({store, isServer, pathname, query, req}) {
	if(isServer){
		if(req.headers.cookie){
			const token = getCookie('token', req);
			if(token) store.dispatch(actions.reauthenticate(token));
		}
	}else{
		const token = store.getState().authentication.token;

		if(token && (pathname === '/auth/login' || pathname === '/auth/register')){
			setTimeout(function() {
				Router.push('/');
			}, 0);
		}
	}
}