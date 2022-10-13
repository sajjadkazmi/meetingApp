const Global = {


    async fetchpost(method, path, body) {
        return fetch(`${path}`, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                "X-Company-Login": "regex1",
                "X-Token": "80e57b31aa5565155bf76f5196bc512faed65c5fd5ca49227292f0227559b7c5"
            },
            body: body
        });
    }
}
export default Global;