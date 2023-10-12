/** @type {import('./$types').PageLoad} */

import type { Config } from '@sveltejs/adapter-vercel';

export const config: Config = { runtime: 'nodejs18.x' };

export const load = ({ locals }: { locals: App.Locals }) => {
	if (locals?.user) {
		return {
			user: locals.user
		};
	}
};
