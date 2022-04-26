var width = window.innerWidth;
var height = window.innerHeight;

var stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
});
var layer = new Konva.Layer();
stage.add(layer);
var textLayer = new Konva.Layer();
stage.add(textLayer)

var text = new Konva.Text({
  x: 10,
  y: 10,
  fontFamily: 'Calibri',
  fontSize: 24,
  text: '',
  fill: 'black',
});

textLayer.add(text)

function writeMessage(message) {
  text.text(message);
}

let theObj = null

stage.on("pointerdblclick", function() {
  if (theObj == null) {
    var mousePos = this.getPointerPosition()
    spawn4(mousePos.x, mousePos.y)
  }
})


function collides(a, b) {
  return !(
    ((a.y + a.height) < (b.y)) ||
    (a.y > (b.y + b.height)) ||
    ((a.x + a.width) < b.x) ||
    (a.x > (b.x + b.width))
  );
}

function spawnObject(name, x, y) {
  var imageObj = new Image();
  imageObj.src = "images/" + name + ".png"
  var box = new Konva.Image({
    x: x,
    y: y,
    width: 64,
    height: 64,
    image: imageObj,
    //fill: '#00D2FF',
    //stroke: 'black',
    //strokeWidth: 4,
    draggable: true,
    name: name,
    realName: `${materials[name].name}${materials[name].terminal ? "*" : ""}`,
    bbox: {
      x: x,
      y: y,
      width: 64,
      height: 64
    }
  });
  // add cursor styling
  box.on('pointerenter', function () {
    theObj = this
    document.body.style.cursor = 'pointer';
    writeMessage(this.attrs.realName)
  });
  box.on('pointerdown', function() {
    this.moveToTop()
  })
  box.on('pointerout', function () {
    theObj = null
    document.body.style.cursor = 'default';
    writeMessage("")
  });
  box.on('pointerdblclick', function () {
    spawnObject(box.attrs.name, box.attrs.x + 32, box.attrs.y + 32)
  })
  box.on('dragstart', function() {
    this.moveToTop()
  })
  box.on('dragend', function() {
    writeMessage("")
    //console.log(this.parent.getIntersection({x: this.attrs.x, y: this.attrs.y}))
    //console.log(this)

    this.attrs.bbox = {
      x: this.attrs.x,
      y: this.attrs.y,
      width: 64,
      height: 64
    }

    let me = this
    // The object that intersects with the object you're dragging
    //let secondObj = this.parent.getIntersection({x: this.attrs.x, y: this.attrs.y})
    let secondObj = stage.getLayers()[0].children.find(function(i) {
      console.log(me)
      return collides(me.attrs.bbox, i.attrs.bbox)
    });
    // If there is no second object
    if (!secondObj) {
      return;
    // If secondObj is the object you're dragging
    } else if (secondObj._id == this._id) {
      return;
    }
    let secondName = secondObj.attrs.name
    // Fuse the items
    let fusion = fuse([this.attrs.name, secondName]);
    console.log(fusion)
    // If there is a fusion
    if (fusion) {
      console.log(fusion)
      let ctr = 0;
      for (let i of fusion) {
        let o = spawnObject(i, this.attrs.x + (32 * ctr), this.attrs.y + (32 * ctr))
        writeMessage(o.attrs.realName)
      }
      
      secondObj.destroy()
      this.destroy()
    }

  })
  layer.add(box);
  return box
  
}

var rectX = stage.width() / 2 - 50;
var rectY = stage.height() / 2 - 25;

function spawn4(x,y) {
  spawnObject("fire", x, y - 128);
  spawnObject("water", x - 128, y);
  spawnObject("earth", x, y + 128);
  spawnObject("air", x + 128, y)
}

spawn4(rectX, rectY)