import { Router } from "oak" 
import { Db } from "database"

export default class Uses{
    private readonly info = {"version":"0.01", "author":"EnomShop"}

    constructor(context: Record<string, any>, next: Function, router: Router) {
        console.log(Db)
        context.response.body = this.info
    }
}
