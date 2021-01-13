import { ActivityService } from '../service/ActivityService'
import { ResultUtil } from '../utils/result.util'
import { Request } from 'express'
import { Result } from '../utils/result'
import { Controller, Get, Post } from '../common'

@Controller('/test')
export class ActivityController {
    private activityService = new ActivityService()

    @Post('/a')
    async findActivityByConditions(req: Request): Promise<Result> {
        return ResultUtil.success(
            await this.activityService.findActivityByConditions({
                ...req.body,
            }),
        )
    }
}
