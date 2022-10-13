const Global = {


    async fetchpost(method, path, body) {
        return fetch(`${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "X-Company-Login": "regex1",
                "X-Token": "88cdec6180eee4ca451a5fc1b3c9ee427093d95cdfa9c5b3836a2e09b24c7fdc"
            },
            body: body
        });
    }
}
export default Global;