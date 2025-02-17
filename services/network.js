const errorHandler = (err) => {
    try {
        const parsedError = JSON.parse(err.message);
        return parsedError?.message || err.message || 'An unexpected error occurred!';
    } catch {
        return err.message || 'An unexpected error occurred!';
    }
};

const fetchAPI = async ({ method, url, urlQueriesObj = {}, payloadObj = null, headersObj = {} }) => {
    const queryString = new URLSearchParams(urlQueriesObj).toString();
    const fetchOptions = {
        method,
        headers: { 'Content-Type': 'application/json', ...headersObj },
        body: payloadObj ? JSON.stringify(payloadObj) : null
    };

    try {
        const response = await fetch(`${url}${queryString ? `?${queryString}` : ''}`, fetchOptions);
        const contentType = response.headers.get('content-type');

        if (!response.ok) {
            const errorText = contentType?.includes('application/json') ? await response.json() : await response.text();
            throw new Error(response.status === 401 ? 'Unauthorized... Kindly check your authentication!' : errorText);
        }

        return contentType?.includes('application/json') ? response.json() : response.text();
    } catch (err) {
        throw new Error(errorHandler(err));
    }
};

module.exports = { fetchAPI };