import serverless = require('serverless-http')
import app from './app'

// eslint-disable-next-line import/prefer-default-export
export const handler = serverless(app, {
    callbackWaitsForEmptyEventLoop: false,
})
