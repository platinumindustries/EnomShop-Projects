import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    private readonly db_name: string = 'users'

    private readonly db_user: string = 'users'

    private readonly validateEmail: Function = (email: string): boolean  => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; return re.test(email.toLowerCase())
    }

    constructor(context: any, next: Function, router: Router) {
        router.get("/Users/Register", (context, next) => { this.signUp(context, next) }) 


       context.response.body = "Hello world Users!";
    }

    signUp(context: any, next: any): void{
        let mail: string = 

        context.response.body = "register";
    }

    signIn(){

    }
}
