import { Model } from 'sequelize'

export interface UserAttributes {
    email: string
    username: string
}

export interface UserDocument extends Model, UserAttributes {}
