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
    
    
}

function fuse(els) {
    //console.log("fuse called")
    //console.log(els)
    let ok = fusions.filter(function(f) {
        // If el1 and el2 are the same
        if (f.el1 == f.el2 && els[0] == els[1] && els.includes(f.el1)) {
            //console.log(f.el1 + " == " + f.el2)
            return true;
        }
        // If el1 and el2 are different
        else if (els.includes(f.el1) && els.includes(f.el2) && f.el1 != f.el2) {
            //console.log(f.el1 + " == " + f.el2)
            return true;
        }
        return false;
    })
    if (ok[0]) {
        return ok[0].result;
    }
    return false
    
}