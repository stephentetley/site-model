// Acknowledgement - based on Andy Gill's Haskell `Text.Dot`

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


type Dot<A> = (st: number, w: Array<ModelElement>) => {state: number, w: Array<ModelElement>, ans: A};


function runDot<A>(fn: Dot<A>): {state: number, w: Array<ModelElement>, ans: A} { 
    return fn(1, [])
}


function getDot<A>(fn: Dot<A>, ns: number, w: Array<ModelElement>): {state: number, w: Array<ModelElement>, ans: A} { 
    return fn(ns, w)
}

function pure<A>(a: A): Dot<A>;
function pure<A>(a: A) { 
    return function(st: number, w: Array<ModelElement>) {
        return {state: st, w: w, ans: a}
    }
}


function fmap<A, B>(func: (a: A) => B, m: Dot<A>): Dot<B> { 
    return function(st: number, w: Array<ModelElement>) {
        let {state: st1, w: w1, ans: a} = getDot(m, st, w);
        let b = func(a);
        return {state: st1, w: w1, ans: b}
    }
}

