// import { User } from '../entity/User'
import { Activity } from '../entity/Activity'
import { Connection } from 'typeorm'
import { ConnectionOptions } from 'typeorm/connection/ConnectionOptions'
// import { Userinfo } from '../entity/Userinfo'
// import { ActivityRelation } from '../entity/ActivityRelation'

export const dbconfig: ConnectionOptions = {
    type: 'mysql',
    host: '11',
    port: 3307,
    username: '11',
    password: '11',
    database: '11',
    synchronize: false,
    logging: false,
    entities: [Activity],
}
