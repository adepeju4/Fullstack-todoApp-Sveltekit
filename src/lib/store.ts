import { writable } from 'svelte/store';
import type { TodoAttributes } from '../sequelize/models/todo.model';
import type { UserInstance } from '../sequelize/models/user.model';

export interface UserStore {
	isAuthenticated: boolean;
	data: UserInstance | null;
}

export type FetchStoreData = {
	loading: boolean;
	data: unknown | null;
};

export const user = writable<UserStore>({
	isAuthenticated: false,
	data: null
});

export const FetchStore = writable<FetchStoreData>({
	loading: false,
	data: null
});

export const todos = writable<TodoAttributes[]>([]);
