import { Application, Router,composeMiddleware  } from "oak"
import { err } from "err"
import { setPermissions } from "permission"

class Index{  
    private readonly app = new Application()
    private readonly router = new Router()
    private readonly port:number = parseInt(Deno.args[0], 10)

    constructor() {
        this.init()
    }

    private async init(){
        const controller = new AbortController()
        const { signal } = controller
        
        this.router.get("/:application", composeMiddleware([err, setPermissions]), async (context, next) => { 
            let application = await import(`./Applications/${context.params.application}/${context.params.application}.ts`)
            
            context.app.state.controller = controller

            new application.default(context, next, this.router)  
        })
 
        this.app.use(this.router.routes(), this.router.allowedMethods())
        await this.app.listen({ port: this.port, signal }) 
    }
}

new Index() 

// deno run --import-map=Import_Map.json Index.ts port[8000] 
// deno run --import-map=Import_Map.json --allow-net=0.0.0.0:8000 Index.ts 8000
