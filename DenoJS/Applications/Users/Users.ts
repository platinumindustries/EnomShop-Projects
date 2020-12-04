import { Router } from "https://deno.land/x/oak/mod.ts"

export default class Users{
    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Users/Register", async (context, next) => { await this.signUp(context, next) }) 

       context.response.body = "Hello world Users!";
    }

    async signUp(context: Record<string, any>, next: Function): Promise<void>{
        try{
            let body = await context.request.body({ type: 'form-data'}), formData = await body.value.read(), data = formData.fields





            /*
                return fetch(`http://${CouchBaseDb.domain}:${CouchDb.port}/${url}`, { headers: Object.assign({}, headers, { 'Authorization': 'Basic ' + btoa(CouchDb.username + ":" + CouchDb.password) }), ...args})
                        let res  = await CouchBaseDb.fetch('/_utils/#login', { body: JSON.stringify(data), method: 'GET' })
        */
            console.log(data)
            context.response.body = JSON.stringify(data)
        } catch(e){
            console.log(e)
        }
             
    }

    signIn(){

    }

    setup(){

    }
}
