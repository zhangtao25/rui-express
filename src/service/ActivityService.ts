import { getRepository } from 'typeorm'
import { Activity } from '../entity/Activity'
// import { FileService } from './FileService'
// import { User } from '../entity/User'
// import { ActivityRelation } from '../entity/ActivityRelation'
// import { UserService } from './UserService'

export class ActivityService {
    private activityRepository = getRepository(Activity)
    // private userRepository = getRepository(User)
    // private userService = new UserService()
    // private activityRelationRepository = getRepository(ActivityRelation)
    // private fileService = new FileService()

    async findActivityByConditions(params: any): Promise<any> {
        return this.activityRepository.find()
    }
}
