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
           

            context.response.body = "register";

        } catch (error) {
            console.log(error.message);
        }
    }

    signIn(){

    }
}
