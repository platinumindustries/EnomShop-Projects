import { Application, Router, isHttpError, Status  } from "oak"

class Index{
    private readonly app = new Application()
    private readonly router = new Router()
    private readonly port:number = parseInt(Deno.args[0], 10)

    constructor() {
        this.init()
    }

    private async init(){
        //run error handling middleware before this
        const controller = new AbortController()
        const { signal } = controller
        
        this.router.get("/:application", async (context, next) => {
            try{
                let application = await import(`./Applications/${context.params.application}/${context.params.application}.ts`)
                
                context.app.state.controller = controller

                new application.default(context, next, this.router)
            } catch(e){
                if (isHttpError(e)) {
                    switch (e.status) {
                        case Status.NotFound:
                            context.response.status = 404; context.response.body = { 'msg': 'we couldn\'t find that page' }
                            break;
                         case Status.InternalServerError:
                            context.response.status = 500; context.response.body = { 'msg': 'whoops! looks like the server made a boo boo!' }
                            break;    
                        default:
                            context.response.status = e.status; context.response.body = { 'msg': e.message }
                    }
                    } else {
                    // rethrow if you can't handle the error
                    throw e;
                    }
            }    
        })
        this.app.use(this.router.routes(), this.router.allowedMethods())
        await this.app.listen({ port: this.port, signal })
        //revoke runtime app permisions?
    }
}

new Index()

// deno run --import-map=Import_Map.json Index.ts port[8000] 
// deno run --import-map=Import_Map.json --allow-net=0.0.0.0:8000 Index.ts 8000
