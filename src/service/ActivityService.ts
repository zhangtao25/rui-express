import { createConnection, getRepository } from 'typeorm'
import { Activity } from '../entity/Activity'

export class ActivityService {
    private activityRepository = getRepository(Activity, 'db1Connection')

    // const repository = connection.getRepository(User);
    // private activityRepository: any
    // constructor() {
    //     // const connection = await createConnection('db2Connection')
    //     createConnection('db1Connection').then((connection) => {
    //         this.activityRepository = connection.getRepository(Activity)
    //     })
    // }

    async findActivityByConditions(params: any): Promise<any> {
        return this.activityRepository.find()
    }
}
