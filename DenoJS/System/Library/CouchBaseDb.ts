export default class CouchBaseDb{
    private static domain: string = '127.0.0.1'
    private static port: number = 8091
    private static username: string 
    private static password: string 

    constructor() {
    }

    public static async fetch(url: string, args: object = {}, headers: object = {}): Promise<any>{
        return fetch(`http://${CouchDb.domain}:${CouchDb.port}/${url}`, { headers: Object.assign({}, headers, { 'Authorization': 'Basic ' + btoa(CouchDb.username + ":" + CouchDb.password) }), ...args})
    }
}
