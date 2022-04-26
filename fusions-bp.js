function Fusion(el1, el2, result) {
    this.el1 = el1;
    this.el2 = el2;
    this.uels = [el1, el2];
    this.result = result;
    this.contains = function(el) {
        if (this.el1 == el || this.el2 == el)  {
            return true;
        }
        return false;
    }
    this.hasFusionOf = function(els) {
        // If el1 and el2 are the same
        console.log(els)
        if (els[0] == els[1] && els.includes(this.el1)) {
            return result;
        }
        // If el1 and el2 are different
        else if (els.includes(this.el1) && els.includes(this.el2) && this.el1 != this.el2) {
            return result;
        }
        return false;
    }
    
}

function fuse(els) {
    console.log("fuse called")
    console.log(els)
    /*
    for (let i of fusions) {
        console.log(i)
        if (i.hasFusionOf(els)) {
            return i.hasFusionOf(els)
        }
    }*/
    let ok = fusions.filter(function(f) {
        if (els[0] == els[1] && els.includes(f.el1)) {
            return true;
        }
        // If el1 and el2 are different
        else if (els.includes(f.el1) && els.includes(f.el2) && f.el1 != f.el2) {
            return true;
        }
        return false;
    })
    if (ok[0]) {
        return ok[0].result;
    }
    return false
    
}