const Global = {


    async fetchpost(method, path, body) {
        return fetch(`${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "X-Company-Login": "regex1",
                "X-Token": "d6146226908e3431cc713d6e598e7f99fadfd7378696b047afba6095d3c294da"
            },
            body: body
        });
    }
}
export default Global;