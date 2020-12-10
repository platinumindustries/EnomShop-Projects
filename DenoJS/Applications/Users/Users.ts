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

            let res = await fetch(url, { method: 'GET', headers: { 'Authorization': 'Basic ' + Users.Cert } })   
                if (res.status === 200) {
                     context.response.status = 409
                     context.response.body = { 'code': 'USERS#3000', 'msg': 'user already exists!' }; return;
                }
                
                res = await fetch(url, { method: 'PUT', headers: { 'Authorization': 'Basic ' + Users.Cert, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, body: new URLSearchParams(data).toString() })
                
                console.log(res, await res.json())

            context.response.body = 'll'
        } catch(e){
            console.log(e)
            if(!e._code){ console.log('damn')}
            if(e.code === 'USERS#3000') context.throw(409)
        }
             
    }

    signIn(){

    }

    setup(){

    }
}
