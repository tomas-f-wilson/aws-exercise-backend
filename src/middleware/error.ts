import { NextFunction, Request, Response } from 'express'
import { UniqueConstraintError } from 'sequelize'
import HttpError from '../errors/http'

async function error(
    err: Error | HttpError | HttpError[],
    req: Request,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    next: NextFunction
): Promise<void> {
    let errors: HttpError[]

    if (err instanceof Array) errors = err
    else if (err instanceof HttpError) {
        errors = [err]
    } else if (err instanceof UniqueConstraintError) {
        const field = err.errors.map((e) => e.path.split('.')[1])

        errors = [new HttpError('DuplicatedField', 422, { field })]
    } else {
        console.error('error without handler', err)
        errors = [new HttpError('InternalServer', 500)]
    }

    const firstError = errors[0]

    res.status(firstError.status).json({
        error: {
            errors,
            code: firstError.status,
            message: firstError.message,
        },
    })
}

export default error
