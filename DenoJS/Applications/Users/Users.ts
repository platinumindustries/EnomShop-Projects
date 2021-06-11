import { Router } from "oak" 

export default class Users{
    private readonly info = {"version":"0.01", "author":"EnomShop"}

    constructor(context: Record<string, any>, next: Function, router: Router) {
        context.response.body = this.info
    }
}
