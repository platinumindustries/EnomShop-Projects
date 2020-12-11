import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    private static readonly Cert: string = btoa('Administrator' + ":" + 'Macho2012')

    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/users/create-account", async (context, next) => { await this.createAccount(context, next) }) 
        router.post("/users/delete-account", async (context, next) => { await this.deleteAccount(context, next) }) 
        context.response.body = "Hello world Users!";
    }

    async createAccount(context: Record<string, any>, next: Function): Promise<void>{
        try{ //enforce username password //add default data
            let body = await context.request.body({ type: 'form-data'}), 
                formData = await body.value.read(), 
                data = formData.fields, 
                url = 'http://localhost:8091/settings/rbac/users/local/' + data.mail
            
                delete data.mail

            let res = await fetch(url, { method: 'GET', headers: { 'Authorization': 'Basic ' + Users.Cert } })   
                if (res.status === 200){ context.response.status = 409; context.response.body = { 'msg': 'user already exists!' }; return; }
                if (res.status === 401){ context.response.status = 401; context.response.body = { 'msg': 'invalid app certificate ' }; return; }
                
                res = await fetch(url, { method: 'PUT', headers: { 'Authorization': 'Basic ' + Users.Cert, 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' }, body: new URLSearchParams(data).toString() })
                    if (res.status === 401){ context.response.status = 401; context.response.body = { 'msg': 'invalid app certificate ' }; return; }
                    if (res.status === 400){ context.response.status = 400; context.response.body = { 'msg': await res.json() }; return; } //simplify this into a simple sentence
                    if (res.status === 200){ context.response.status = 201; context.response.body = { 'msg': 'user created' }; return; }
                    
                context.response.status = 502; context.response.body = { 'msg': 'undocumented response' }; return;
        } catch(e){
            context.response.status = 500; context.response.body = { 'type': e.name, 'message': e.message }
        }       
    }

    async deleteAccount(context: Record<string, any>, next: Function): Promise<void>{
        try{ 
            let body = await context.request.body({ type: 'form-data'}), 
                formData = await body.value.read(), 
                data = formData.fields, 
                url = 'http://localhost:8091/settings/rbac/users/local/' + data.mail //enforce username validity
           
            let res = await fetch(url, { method: 'DELETE', headers: { 'Authorization': 'Basic ' + Users.Cert } })   
                if (res.status === 200){ context.response.status = 200; context.response.body = { 'msg': 'user deleted!' }; return; }
                if (res.status === 404){ context.response.status = 404; context.response.body = { 'msg': 'user was not found' }; return; }
                if (res.status === 401){ context.response.status = 401; context.response.body = { 'msg': 'invalid app certificate' }; return; }
                    
                context.response.status = 502; context.response.body = { 'msg': 'undocumented response' }; return;
        } catch(e){
            context.response.status = 500; context.response.body = { 'type': e.name, 'message': e.message }
        }       
    }

    signIn(){
 
    }

    setup(){

    }
}
