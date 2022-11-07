const setHeaders = (xhr, headers) => {
    Object.entries(headers).forEach(entry => {
        const [name, value] = entry;
        xhr.setRequestHeader(name, value);
    });
};

const parseResponse = xhr => {
    const { status, responseText } = xhr;

    let data;

    if (status !== 204) {
        data = JSON.parse(responseText);
    }

    return {
        status,
        data
    };
};

const request = params => {
    return new Promise((res, rej) => {
        const xhr = new XMLHttpRequest();

        const {
            method = 'GET',
            url,
            headers = {},
            body
        } = params;

        xhr.open(method, url);

        setHeaders(xhr, headers);

        xhr.send(JSON.stringify(body));

        xhr.onerror = () => {
            rej(new Error('HTTP Error'));
        }

        xhr.ontimeout = () => {
            rej(new Error('Timeout Error'))
        }

        xhr.onload = () => res(parseResponse(xhr));
    });
}

const get = async(url, header) => {
    const response = await request({
        url,
        header,
        method: 'GET'
    });

    return response.data;
}

const post = async(url, body, headers) => {
    const response = await request({
        url,
        headers,
        method: 'POST',
        body
    });

    return response.data;
}

const put = async(url, body, headers) => {
    const response = await request({
        url,
        headers,
        method: 'PUT',
        body
    });

    return response.data;
}

const patch = async(url, body, headers) => {
    const response = await request({
        url,
        headers,
        method: 'PATCH',
        body
    });

    return response.data;
}

const deleteRequest = async(url, headers) => {
    const response = await request({
        url,
        headers,
        method: 'DELETE'
    });
    return response.data;
}

export default {
    get,
    post,
    put,
    patch,
    delete: deleteRequest
};