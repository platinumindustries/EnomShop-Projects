import { Router } from "https://deno.land/x/oak/mod.ts"
import CouchDb from "../../System/Library/CouchDb.ts"

export default class Users{
    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", async (context, next) => { await this.signUp(context, next) }) 

       context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{
        let body = await context.request.body({ type: 'form-data'}), formData = await body.value.read(), data = formData.fields

        console.log(formData.fields);


            
            context.response.body = `ll`        
    }

    signIn(){

    }

    setup(){

    }
}
