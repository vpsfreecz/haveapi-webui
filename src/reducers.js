export function reducer (state, action) {
	if (state === undefined) {
		return {
			authenticated: false,
			username: null,
			actionStates: [],
		};
	}

	console.log('reduce: ', action);

	switch (action.type) {
		case 'LOGIN':
			return Object.assign({}, state, {
				authenticated: true,
				username: action.opts.username,
			});

		case 'LOGOUT':
			return Object.assign({}, state, {
				authenticated: false,
			});

		case 'ACTION_STATES':
			return Object.assign({}, state, {
				actionStates: action.opts,
			});
	}

	return state;
};
