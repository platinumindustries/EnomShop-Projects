import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    private readonly db_name: string = 'users'

    private readonly db_user: string = 'users'

    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", async (context, next) => { await this.signUp(context, next) }) 


       context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{




        try {
            let body = await context.request.body();

            //let bodyValue = await body.value;
            let name = body.value.get("name");

            console.log(name)

            context.response.body = "register";

        } catch (error) {
            console.log(error.message);
        }
    }

    signIn(){

    }
}
