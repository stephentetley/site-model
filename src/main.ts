type NodeId = string | number


type ModelElement =
    | { kind: "node"; nid: NodeId }
    | { kind: "connector"; cfrom: NodeId; cto: NodeId }



function show(x: NodeId): string;
function show(x: ModelElement): string;
function show(x: ModelElement | NodeId): string {
    if (typeof x === "object") { 
        if (x.kind === "node") {
            return show(x.nid) + ";"
        } else if (x.kind === "connector") {
            return `${show(x.cfrom)} -> ${show(x.cto)}`
        } else {
            return ""
        }
    } else if (typeof x === "string") {
        return x
    } else {
        return `u${x}`
    }
}

let e1: ModelElement = {kind: "node", nid : 1}  
let e2: ModelElement = {kind: "node", nid : 2}  

let e3: ModelElement = {kind: "connector", cfrom : 1, cto:2}  

console.log(show(e1))
console.log(show(e2))
console.log(show(e3))
