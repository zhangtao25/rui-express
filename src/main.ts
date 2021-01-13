import 'reflect-metadata'
import express from 'express'
import { createConnection } from 'typeorm'
import bodyParser from 'body-parser'
import { Request, Response } from 'express'
import { Routes } from './router'
import { dbconfig } from './db'
// import { ActivityController } from './controller/ActivityController'
import colors = require('colors')
// import { UserController } from './controller/UserController'

console.log(
    `${colors.green('[app]')}   - 2021-01-06 15:53:57   ${colors.yellow(
        '[Start]',
    )} Starting application...`,
)

createConnection(dbconfig)
    .then(async (connection) => {
        const app = express()
        app.use(bodyParser.json())

        // service测试广场~

        // setTimeout(()=>{
        //     const s = new ActivityController()
        //
        //     console.log(s)
        // },5000)

        //

        // const s = new ActivityController()

        // for (const appKey in s) {
        //     console.log(appKey)
        // }

        const Routesx: any = [
            // {
            //     method: 'post',
            //     route: '/user/getWxUserInfo',
            //     controller: UserController,
            //     action: 'getWxUserInfo',
            // },
        ]

        // Object.keys(s).forEach((key) => {
        //     console.log(key)
        //
        //     Routesx.push({
        //         method: 'post',
        //         route: '/' + key,
        //         controller: UserController,
        //         action: key,
        //     })
        // })

        // console.log(Routesx, 'Routesx')

        Routes().forEach((route: { method: string | number; route: any; controller: any; action: string | number }) => {
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
        })
        app.listen(3001)
        console.log('应用已运行~')
    })
    .catch((error: any) => console.log(error))
