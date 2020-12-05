import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    private static readonly Cert: string = btoa('Administrator' + ":" + 'Macho2012')

    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", async (context, next) => { await this.signUp(context, next) }) 
        context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{
        try{
            let body = await context.request.body({ type: 'form-data'}), 
                formData = await body.value.read(), 
                data = formData.fields, 
                url = 'http://localhost:8091/settings/rbac/users/local/' + data.mail
            
                delete data.mail
                data.roles = 'basic'

            let res = await fetch(url, { method: 'GET', headers: { 'Authorization': 'Basic ' + Users.Cert } })   
                if (res.status === 200) { //USERS#3000 - username already exists
                     throw Object.assign({ '_code': 'USERS#3000' }, res)
                }

                res = await fetch(url, { method: 'PUT', headers: { 'Authorization': 'Basic ' + Users.Cert, 'Content-Type': 'application/json' }, mode: "cors", body: JSON.stringify(data) })
                console.log(res, await res.json())
                
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
