import { Router } from "https://deno.land/x/oak/mod.ts"
import CouchDb from "../../System/Library/CouchDb.ts"

export default class Users{
    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", async (context, next) => { await this.signUp(context, next) }) 

       context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{
        if(!context.request.hasBody){
            throw new Error("Body not found");
        }
        try {
            const result = context.request.body();
            const body = result.value;
            console.log(await body);


            
            context.response.body = `ll`
        } catch (error) {
            console.log(error)
        }
        
    }

    signIn(){

    }

    setup(){

    }
}
