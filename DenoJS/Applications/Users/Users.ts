import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    private readonly domain: string = '127.0.0.1'
    private readonly port: number = 5984
    private readonly db_name: string = 'users'
    private readonly db_user: string = 'admin'
    private readonly db_pass: string = 'Macho20!2'

    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", async (context, next) => { await this.signUp(context, next) }) 


       context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{
            let body = context.request.body(),
                email = (await body.value).get("e-mail")

            let x = await fetch(`http://${this.domain}:${this.port}/${this.db_name}`, {method: 'GET'})

            console.log(x)

            //create an account with the email adress and force user to activate via email
            context.response.body = 'name'
    }

    signIn(){

    }

    setup(){

    }
}
