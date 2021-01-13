function removeEmptyField(obj: any) {
    let newObj: any = {}
    if (typeof obj == 'string') {
        obj = JSON.parse(obj)
    }
    if (obj instanceof Array) {
        newObj = []
    }
    if (obj instanceof Object) {
        for (const attr in obj) {
            if (
                obj.hasOwnProperty(attr) &&
                obj[attr] !== '' &&
                obj[attr] !== null &&
                obj[attr] !== undefined
            ) {
                if (obj[attr] instanceof Object) {
                    newObj[attr] = removeEmptyField(obj[attr])
                } else if (
                    typeof obj[attr] == 'string' &&
                    ((obj[attr].indexOf('{') > -1 &&
                        obj[attr].indexOf('}') > -1) ||
                        (obj[attr].indexOf('[') > -1 &&
                            obj[attr].indexOf(']') > -1))
                ) {
                    try {
                        const attrObj = JSON.parse(obj[attr])
                        if (attrObj instanceof Object) {
                            newObj[attr] = removeEmptyField(attrObj)
                        }
                    } catch (e) {
                        newObj[attr] = obj[attr]
                    }
                } else {
                    newObj[attr] = obj[attr]
                }
            }
        }
    }
    return newObj
}

export default {
    removeEmptyField,
}
