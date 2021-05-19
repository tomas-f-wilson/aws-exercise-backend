import { Sequelize } from 'sequelize'

const User = (sequelize: Sequelize, Datatype: any) => {
    const UserModel = sequelize.define('user', {
        email: {
            type: new Datatype.STRING(128),
            allowNull: false,
            unique: true,
        },
        username: {
            type: new Datatype.STRING(128),
            allowNull: false,
            unique: true,
        },
    })

    return UserModel
}

export default User
