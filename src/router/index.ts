import { ActivityController } from '../controller/ActivityController'
import {mapControllerRoute} from "../common";

const Controllers = [ActivityController]

export const Routes:any = () => {
    let arr:any = []
    Controllers.forEach(item=>{
        arr = [...arr,...mapControllerRoute(item)]
    })
    return arr
}
