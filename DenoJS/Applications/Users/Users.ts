import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    private readonly db_name: string = 'users'

    private readonly db_user: string = 'users'

    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", async (context, next) => { await this.signUp(context, next) }) 


       context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{
            let body = context.request.body(),
                email = (await body.value).get("e-mail")

            //create an account with the email adress and force user to activate via email
            context.response.body = name
    }

    signIn(){

    }
}
