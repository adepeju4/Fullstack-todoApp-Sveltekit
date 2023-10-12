import type { Load } from '@sveltejs/kit';

export const load: Load = async (params) => {
	const response = await params.fetch('api/auth/verify');
	const data = await response.json();

	return {
		user: data.data
	};
};


