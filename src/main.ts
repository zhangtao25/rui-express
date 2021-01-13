import 'reflect-metadata'
import express from 'express'
import { createConnection, createConnections } from 'typeorm'
import bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { Routes } from './router'
import { dbconfig } from './db'
import colors = require('colors')

console.log(
    `${colors.green('[app]')}   - 2021-01-06 15:53:57   ${colors.yellow(
        '[Start]',
    )} Starting application...`,
)

async function bootstarp() {
    const connections = await createConnections([dbconfig])

    const app = express()
    app.use(bodyParser.json())

    // service测试广场~

    Routes().forEach(
        (route: {
            method: string | number
            route: any
            controller: any
            action: string | number
        }) => {
            // app.post('/user/test',(req,res,next)=>{
            //   // do something...
            // })
            ;(app as any)[route.method](
                route.route,
                async (req: Request, res: Response, next: any) => {
                    const result = await new (route.controller as any)()[
                        route.action
                    ](req, res, next)
                    res.send(result)
                },
            )
        },
    )
    app.listen(3001)
    console.log('应用已运行~')

    // createConnection(dbconfig)
    //     .then(async (connection) => {
    //
    //     })
    //     .catch((error: any) => console.log(error))
}


bootstarp()
