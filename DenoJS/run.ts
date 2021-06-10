const file = await Deno.open('stdin.txt', {read: true, write: true, truncate: true, create: true});

Deno.run({
    cmd:["deno run --import-map=Import_Map.json --allow-net=0.0.0.0:8000 Index.ts 8000"],

})