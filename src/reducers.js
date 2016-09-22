export function reducer (state, action) {
	if (state === undefined) {
		return {
			authenticated: false,
		};
	}

	console.log('reduce: ', action);

	switch (action.type) {
		case 'LOGIN':
			return Object.assign({}, state, {
				authenticated: true,
			});

		case 'LOGOUT':
			return Object.assign({}, state, {
				authenticated: false,
			});
	}

	return state;
};
