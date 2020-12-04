import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", async (context, next) => { await this.signUp(context, next) }) 

       context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{
        try{
            let body = await context.request.body({ type: 'form-data'}), formData = await body.value.read(), data = formData.fields, mail = data.mail
            
            delete data.mail
            data.role = 'basic'
            let res = await fetch('http://localhost:8091/settings/rbac/users/local/' + mail, { 
                headers: { 
                    'Authorization': 'Basic ' + btoa('Administrator' + ":" + 'Macho2012'),
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify(data), 
                method: 'PUT'
            })



            console.log(JSON.stringify(data), res)
            
            context.response.body = 'll'
        } catch(e){
            console.log(e)
        }
             
    }

    signIn(){

    }

    setup(){

    }
}
