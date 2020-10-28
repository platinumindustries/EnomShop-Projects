import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    private readonly db_name: string = 'users'

    private readonly db_user: string = 'users'

    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", (context, next) => { this.signUp(context, next) }) 


       context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{
        let body = await context.request.body();

        


        console.log(body)
        context.response.body = "register";
    }

    signIn(){

    }
}
