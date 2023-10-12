import { DataTypes, Model } from 'sequelize';
import type { Optional } from 'sequelize';

import { sequelize } from '../db/db';

export interface UserAttributes {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}

export interface UserInstance extends Model {
	id: number;
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export class User extends Model<UserAttributes, UserCreationAttributes> implements UserInstance {
	get id(): number {
		return this.getDataValue('id');
	}

	get firstName(): string {
		return this.getDataValue('firstName');
	}

	get lastName(): string {
		return this.getDataValue('lastName');
	}

	get email(): string {
		return this.getDataValue('email');
	}

	get password(): string {
		return this.getDataValue('password');
	}
}

User.init(
	{
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		firstName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastName: {
			type: DataTypes.STRING,
			allowNull: false
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				isEmail: true
			}
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				is: {
					args: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/,
					msg: 'The password should contain at least one letter, one number, and one special character'
				}
			}
		}
	},
	{ sequelize, timestamps: true, createdAt: 'created_at', updatedAt: 'updated_at' }
);

const syncdb = async (): Promise<void> => {
	try {
		await User.sync();
	} catch (error) {
		console.error('Error syncing database:', error);
	}
};

syncdb();
