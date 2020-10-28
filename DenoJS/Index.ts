import { Application, Router } from "https://deno.land/x/oak/mod.ts"

class Index{
    private readonly app = new Application()

    private readonly router = new Router()

    private readonly application_folder = './Applications'

    private readonly port = 8000

    constructor() {
        this.init()
    }

    private async init(){ 
        this.router.get("/:application", async (context, next) => { 
            try {
                let application = await import(`${this.application_folder}/${context.params.application}/${context.params.application}.ts`)  //add error handler before this to catch import error
                
                new application.default(context, next, this.router)
            } catch (error) {
                console.error(error)
            }
        })

        this.app.use(this.router.routes())
        this.app.use(this.router.allowedMethods())

        await this.app.listen({ port: this.port })
    }
}

new Index()
