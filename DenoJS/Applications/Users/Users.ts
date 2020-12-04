import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    private static readonly Cert: string = btoa('Administrator' + ":" + 'Macho2012')

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
                    'Authorization': 'Basic ' + Users.Cert,
                    'Content-Type': 'application/json'
                },
                method: 'GET'
            })

            if(res.status === 404){
                res = await fetch('http://localhost:8091/settings/rbac/users/local/' + mail, { 
                    headers: { 
                        'Authorization': 'Basic ' + Users.Cert,
                        'Content-Type': 'application/json',
                        'cache': 'no-cache'
                    }, 
                    body: JSON.stringify(data), 
                    method: 'PUT'
                })
            }
            


            console.log(res)
            
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
