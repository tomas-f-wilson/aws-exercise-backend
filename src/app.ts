import express = require('express')
import cors = require('cors')
import mongoSanitize = require('express-mongo-sanitize')
import hpp = require('hpp')
import helmet = require('helmet')

import errorMiddleware from './middleware/error'
import RouteNotFound from './errors/routeNotFound'
import routes from './routes'

import database from './config/database'

class App {
    public app = express()

    public port = process.env.PORT || 4000

    constructor() {
        this.iniMiddleware()
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.info(`[Server]: Running at http://localhost:${this.port}`)
        })
    }

    private iniMiddleware() {
        this.app.use(cors())
        this.app.use(express.json({ limit: '50mb' }))
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(hpp())
        this.app.use(mongoSanitize())
        this.app.use(helmet())

        this.app.use(routes)

        this.app.use((req, res, next) => next(new RouteNotFound()))

        this.app.use(errorMiddleware)
    }
}

database.sequelize
    .sync()
    .then(() => console.log('[Database]: Connected....'))
    .catch((err) => console.error(`[Error]: ${err}`))

if (module === require.main) {
    new App().listen()
}

export default new App().app
