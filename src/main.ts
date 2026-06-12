type NodeId = string | number


type ModelElement =
  | { kind: "connector"; cfrom: NodeId; cto: NodeId }

let e1: ModelElement = {kind: "connector", cfrom : 1, cto:2}  


function show(a: ModelElement): string | null {
    if(a.kind === "connector")
        return `${a.cfrom} -> ${a.cto}`
    else
        return null
}

console.log(show(e1))
