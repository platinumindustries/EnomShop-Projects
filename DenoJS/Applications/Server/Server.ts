import { Router } from "oak"

export default class Server{ 
    private readonly info = parseInt(Deno.args[0], 10)

    constructor(context: Record<string, any>, next: Function, router: Router) {
        router.post("/Server/Stop", async (context, next) => { await this.stopServer(context, next) })
        context.response.body = "Server App!"; 
    }

    async stopServer(context: Record<string, any>, next: Function): Promise<void>{
        try{
            const controller = context.app.state.controller
            controller.abort();

            context.response.status = 200; context.response.body = { 'msg': 'okay' }; return;        
        } catch(e){
            context.response.status = 500; context.response.body = { 'type': e.name, 'msg': e.message }
        }       
    }

    async dummy(context: Record<string, any>, next: Function): Promise<void>{
        try{     
            context.response.status = 502; context.response.body = { 'msg': 'undocumented response' }; return;
        } catch(e){
            context.response.status = 500; context.response.body = { 'type': e.name, 'msg': e.message }
        }       
    }
}
