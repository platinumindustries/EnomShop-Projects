import { Router } from "https://deno.land/x/oak/mod.ts"
import CouchBaseDb from "../../System/Library/CouchBaseDb.ts"

export default class Users{
    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", async (context, next) => { await this.signUp(context, next) }) 

       context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{
        try{
            let body = await context.request.body({ type: 'form-data'}), formData = await body.value.read(), data = formData.fields
            let res  = await CouchBaseDb.fetch('/_utils/#login', { body: JSON.stringify(data), method: 'GET' })
        
            console.log(res)
            context.response.body = `ll`   
        } catch(e){
            console.log(e)
        }
             
    }

    signIn(){

    }

    setup(){

    }
}
