import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';

import { sequelize } from '../../lib/server/database';
import { User } from './user.model';

export interface TodoAttributes {
	id: number;
	title: string;
	description?: string;
	completed: boolean;
	userId: number;
	created_at?: Date;
	updated_at?: Date;
}

interface TodoCreationAttributes extends Optional<TodoAttributes, 'id'> {}

export interface TodoInstance extends Model {
	id: number;
	title: string;
	description?: string;
	completed: boolean;
	userId: number;

}

export class Todo extends Model<TodoAttributes, TodoCreationAttributes> implements TodoInstance {

	get id(): number {
		return this.getDataValue('id');
	}

	get title(): string {
		return this.getDataValue('title');
	}

	get description(): string | undefined {
		return this.getDataValue('description');
	}

	get completed(): boolean {
		return this.getDataValue('completed');
	}

	get userId(): number {
		return this.getDataValue('userId');
	}


}

Todo.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false
		},
		description: {
			type: DataTypes.STRING,
			allowNull: true
		},
		completed: {
			type: DataTypes.BOOLEAN,
			allowNull: false,
			defaultValue: false
		},
		userId: {
			type: DataTypes.INTEGER,
			references: {
				model: 'Users',
				key: 'id'
			}
		}
	},
	{ sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

const syncdb = async (): Promise<void> => {
	try {
		await Todo.sync({ alter: true });
	} catch (error) {
		console.error('Error syncing database:', error);
	}
};

syncdb();
