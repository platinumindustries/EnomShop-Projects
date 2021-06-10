import { isHttpError, Status } from "oak"

class Err {
    static async err(context: Record<string, any>, next: Function):Promise<void> {
        try{
            await next()
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
            } else if (e instanceof TypeError) {
                context.response.status = 500; context.response.body = { 'error': e.name, 'msg': e.message }
            } else { 
                // rethrow if you can't handle the error
                console.log(e)
                throw e;
            }
        }
    }
}
let  err = Err.err; export { err }