import { isHttpError, Status } from "oak"

class Permission {
    constructor() {
        
    }

    static async setPermissions(context: Record<string, any>, next: Function):Promise<void> {
        const AppFolderPerm = { name: "read", path: "./Applications/" } as const
            await Deno.permissions.request(AppFolderPerm)

        const SysLibFolderPerm = { name: "read", path: "./System Library/" } as const
            await Deno.permissions.request(SysLibFolderPerm)

        const LocalHostNetPerm = { name: "net", host: "127.0.0.1:8000" } as const
            await Deno.permissions.request(LocalHostNetPerm)

        const DenoNetPerm = { name: "net", host: "deno.land" } as const
            await Deno.permissions.request(DenoNetPerm)

        const CouchbaseNetPerm = { name: "net", host: "dev.jspm.io" } as const
            await Deno.permissions.request(CouchbaseNetPerm)

        await next()
    }
}

let  setPermissions = Permission.setPermissions; export { setPermissions }