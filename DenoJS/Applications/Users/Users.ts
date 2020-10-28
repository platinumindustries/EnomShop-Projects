import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    private readonly db_name: string = 'users'

    private readonly db_user: string = 'users'

    constructor(context: any, next: Function, router: Router) {
        router.get("/Users/Register", (context, next) => { this.signUp(context, next) }) 


       context.response.body = "Hello world Users!";
    }

    signUp(context: any, next: any): void{
        //let mail: string = 
        console.log(context.params)
        context.response.body = "register";
    }

    signIn(){

    }
}
