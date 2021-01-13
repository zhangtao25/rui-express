
// import {isConstructor, isFunction, METHOD_METADATA, PATH_METADATA} from "./src/common";
// import {SomeClass} from "./src/SomeController";



import {ActivityController} from "../controller/ActivityController";

export const METHOD_METADATA = 'method'
export const PATH_METADATA = 'path'

export const Controller = (path: string): ClassDecorator => {
    return target => {
        Reflect.defineMetadata(PATH_METADATA, path, target);
    }
}

const createMappingDecorator = (method: string) => (path: string): MethodDecorator => {
    return (target, key, descriptor:any) => {
        Reflect.defineMetadata(PATH_METADATA, path, descriptor.value);
        Reflect.defineMetadata(METHOD_METADATA, method, descriptor.value);
    }
}

export const Get = createMappingDecorator('get');
export const Post = createMappingDecorator('post');

export const isConstructor=(value:any) => {
    try {
        return new value(), true;
    } catch(err) {
        return false;
    }
}

export const isFunction = (functionToCheck:any) => {
    return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
}












export function mapRoute(instance: Object) {
    const prototype = Object.getPrototypeOf(instance);
    // 筛选出类的 methodName
    const methodsNames = Object.getOwnPropertyNames(prototype)
        .filter(item => {
            console.log(item,'item')
            return !isConstructor(item) && isFunction(prototype[item])
        })
    return methodsNames.map(methodName => {
        console.log(prototype,'prototype')
        const fn = prototype[methodName];
        // console.log(fn().)
        // 取出定义的 metadata
        const route = Reflect.getMetadata(PATH_METADATA, fn);
        const method = Reflect.getMetadata(METHOD_METADATA, fn)


        // fn =
        return {
            route,
            method,
            fn:fn.bind(instance),
            methodName
        }
    })
};


// 这个函数作用是生成ControllerRoute
export function mapControllerRoute(classInstance:any) {
    const instance = new classInstance()
    const mapRouteController = mapRoute(instance)

    // 获取controllerPath
    let controllerPath = ''
    mapRouteController.forEach(item=>{
        if (item.methodName === 'constructor'){
            controllerPath = item.route
        }
    })
    return mapRouteController.map(item=>{
        console.log(item,instance)
        return ({
            method: item.method,
            route: controllerPath + item.route,
            controller: classInstance,
            action: item.methodName,
        })
    }).filter(item=>{
        // 过滤constructor
        if (item.action === 'constructor'){
            return false
        } else {
            return true
        }
    })
}
