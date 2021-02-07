import request from '../utils/request';

// export const fetchData = (query) => {
//     return request({
//         url: '/ms/table/list',
//         method: 'post',
//         data: query
//     })
// }

export const fetchData = (url,query) => {
    return request({
        url: url,
        method: 'GET',
        data: query
    })
}

export const postData = (url,query) => {
    return request({
        url: url,
        method: 'POST',
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
