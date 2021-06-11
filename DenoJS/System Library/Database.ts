import { createRequire } from "https://deno.land/std@0.98.0/node/module.ts";

const require = createRequire(import.meta.url); 
// Loads native module polyfill.
const path = require("path");
// Loads extensionless module.
//const cjsModule = require("./my_mod");
// Visits node_modules.
const couchbase = require("couchbase");

export default class Database{
    private readonly info = {"version":"0.01", "author":"EnomShop"}

    /*constructor(context: Record<string, any>, next: Function, router: Router) {
        context.response.body = this.info
    }*/

    constructor() {
        console.log(couchbase)
    }
}

//  deno run --allow-read --allow-env --unstable --reload 
// deno run --allow-read --allow-env --unstable --reload  '/home/enomshop/Documents/Work/EnomShop-Projects/DenoJS/System Library/Database.ts'