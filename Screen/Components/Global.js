const Global = {


    async fetchpost(method, path, body) {
        return fetch(`${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "X-Company-Login": "regex1",
                "X-Token": "dabf1f4993bcfa4b3c9a980a35e04de0c6fe1b3475fdb0e22d15c775405c2b46"
            },
            body: body
        });
    }
}
export default Global;