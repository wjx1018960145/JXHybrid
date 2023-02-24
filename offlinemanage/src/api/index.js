import request from '../utils/request';

export function listOffline(appId) {
    return request({
        url: '/api/v1.0/offline/list',
        method: 'post',
        params:{
            appId
        }
    })
}

export function queryOfflineByStatus(params) {
    return request({
        url:'/api/v1.0/offline/query',
        method:'post',
        data:params
    })

}
export function insertOffline(params) {
    return request({
        url: '/api/v1.0/offline/insert',
        method: 'post',
        data:params
    })
}
export function deleteOffline(id) {
    return request({
        url: '/api/v1.0/offline/delete',
        method: 'post',
        params:{id}
    })
}

//h5app

export function listH5App(appId) {
    return request({
        url: '/api/v1.0/offline/H5App/list',
        method: 'post',
        params: {
            appId
        }
    })
}

export function getH5AppByAppId(appId) {
    return request({
        url: '/api/v1.0/offline/H5App/h5AppByAppId',
        method: 'post',
        params: {
            appId
        }
    })
}

export function insertH5App(params) {
    return request({
        url: '/api/v1.0/offline/H5App/insert',
        method: 'post',
        data:params
    })
}
export function deleteH5App(id) {
    return request({
        url: '/api/v1.0/offline/H5App/delete',
        method: 'post',
        params:{id}
    })
}



//离线包

export const fetchData = Id => {
    return request({
        url: '/api/v1.0/offline/package/list',
        method: 'post',
        params:{Id}
    });
};


export function listPackageByAppid(appId) {
    return request({
        url: '/api/v1.0/offline/package/listByAppId',
        method: 'post',
        params:{
            appId
        }
    })
}


export function insertPackage(params) {
    return request({
        url: '/api/v1.0/offline/package/insert',
        method: 'post',
        data:params
    })
}
export function insertIncrement(params){
    return request({
        url: '/api/v1.0/offline/package/insertIncrement',
        method: 'post',
        data:params
    })
}
export function deletePackage(id) {
    return request({
        url: '/api/v1.0/offline/package/delete',
        method: 'post',
        params:{id}
    })
}

export function uploadPackage(params) {
    return request({
        url:'/api/v1.0/offline/uploadFile',
        method:'post',
        header:{"Content-Type": "multipart/form-data"},
        data:params
    })

}

// 网关接口
export const fetchGetaway = id => {
    return request({
        url: '/api/v1.0/getaway/list',
        method: 'post',
        params:{id}
    });
};


export function listGetawayByOperation(operation) {
    return request({
        url: '/api/v1.0/getaway/listByAppId',
        method: 'post',
        params:{
            operation
        }
    })
}


export function insertGetaWay(params) {
    return request({
        url: '/api/v1.0/getaway/insert',
        method: 'post',
        data:params
    })
}

export function deleteGetaWay(id) {
    return request({
        url: '/api/v1.0/getaway/delete',
        method: 'post',
        params:{id}
    })
}
export function updateGetaWay(params) {
    return request({
        url: '/api/v1.0/getaway/update',
        method: 'post',
        data:params
    })
}


