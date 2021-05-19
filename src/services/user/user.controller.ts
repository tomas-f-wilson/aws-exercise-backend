import { Request, Response, NextFunction } from 'express'

import database from '../../config/database'
import asyncHandler from '../../middleware/asynHandler'
import HttpError from '../../errors/http'

const User = database.users
class UserControllerClass {
    public find = asyncHandler(
        async (req: Request, res: Response, next: NextFunction) => {
            if (!req.params.userId) {
                return next(new HttpError('InvalidId', 422))
            }

            const user = await User.findByPk(req.params.userId)

            if (!user) return next(new HttpError('UserDoesNotExists', 422))

            req.user = user

            return next()
        }
    )

    public list = asyncHandler(async (req: Request, res: Response) => {
        const users = await User.findAll()
        res.json({ data: users })
    })

    public create = asyncHandler(async (req: Request, res: Response) => {
        const { email, username } = req.body

        const body = { email, username }

        const users = await User.create(body)

        res.json({ data: users })
    })

    public update = asyncHandler(async (req: Request, res: Response) => {
        const removeField = ['id', 'createdAt', 'updatedAt']

        removeField.forEach((field) => delete req.body[field])

        Object.assign(req.user, req.body)

        req.user.save()

        res.json({ data: req.user })
    })

    public delete = asyncHandler(async (req: Request, res: Response) => {
        req.user.destroy()

        res.json({ data: req.user })
    })
}

const UserController = new UserControllerClass()
export default UserController
