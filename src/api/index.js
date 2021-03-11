import request from '../utils/request';

// export const fetchData = (query) => {
//     return request({
//         url: '/ms/table/list',
//         method: 'post',
//         data: query
//     })
// }
let baseUrl = "http://156.234.211.62:9200"

export const fetchData = (url,query) => {
    var urlParams = [];
    if(query){
        let params = JSON.parse(JSON.stringify(query))
        for (var key in params) {
            if (params[key]) {
                urlParams.push(`${key}=${encodeURIComponent(params[key])}`)
            }
        }
        if(urlParams.length > 0){
            url += '?' + urlParams.join('&');
        }
    }
    return request({
        url: url,
        method: 'GET',
        data: query
    })
}

export const exportData = (url,query) => {
    var urlParams = [];
    if(query){
        let params = JSON.parse(JSON.stringify(query))
        for (var key in params) {
            if (params[key]) {
                urlParams.push(`${key}=${encodeURIComponent(params[key])}`)
            }
        }
        if(urlParams.length > 0){
            url += '?' + urlParams.join('&');
        }
    }
    let _url = `${baseUrl}${url}`
    window.location.href = _url
}



export const postData = (url,query) => {
    return request({
        url: url,
        method: 'POST',
        data: query,
        headers: {
            "Accept": "application/json"
        }
    })
}

export const updateData = (url,query) => {
    return request({
        url: url,
        method: 'put',
        data: query
    })
}

export const deleteData = (url,query) => {
    return request({
        url: url,
        method: 'delete',
        data: query
    })
}

export const imgUpload = (url,query) => {
    return request({
        url: url,
        method: 'POST',
        data: query,
        headers: {
            'Content-type': 'multipart/form-data'
        }
    })
}
