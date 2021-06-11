import couchbase from "couchbase"

class Database{
    private readonly info = {"version":"0.01", "author":"EnomShop"}

    /*constructor(context: Record<string, any>, next: Function, router: Router) {
        context.response.body = this.info
    }*/

    constructor() {
        console.log(couchbase)
    }
}

let  Db = new Database(); export { Db }