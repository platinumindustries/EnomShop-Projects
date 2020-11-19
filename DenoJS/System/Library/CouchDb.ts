export default class CouchDb{
    private static readonly domain: string = '127.0.0.1'
    private static readonly port: number = 5984
    private static readonly username: string = 'admin'
    private static readonly password: string = 'Macho20!2'

    constructor() {
    }

    public static async fetch(url: string, args: object = {}, headers: object = {}): Promise<any>{
        return fetch(`http://${CouchDb.domain}:${CouchDb.port}/${url}`, { headers: Object.assign({}, headers, { 'Authorization': 'Basic ' + btoa(CouchDb.username + ":" + CouchDb.password) }), ...args})
    }
}
