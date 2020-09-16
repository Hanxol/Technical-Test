var config = {
    type: Phaser.AUTO,
    width: 490,
    height: 570,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

function preload ()
{
  //You should put here every image or content you want to preload. Example: this.load.image("name", "url,path");
  //You can also preload other kind of things like sprite sheets and slice them like this:
  //this.load.spritesheet("name" "url,path",{ frameWidth: 32, frameHeight: 48 }); frameWidth and frameHeight controls the slicing of the sprite sheet
  this.load.image("background", "images/frame.png");
  this.load.image("prizeWindow", "images/prize_window.png");
  this.load.image("spinBtn", "images/btn_spin.png");
  this.load.image("lineH", "images/line_1.png");
  this.load.image("lineUpDown", "images/line_4.png");
  this.load.image("lineDownUp", "images/line_5.png");
  this.load.image("a", "images/symbols/sym_a.png");
  this.load.image("b", "images/symbols/sym_b.png");
  this.load.image("c", "images/symbols/sym_c.png");
  this.load.image("d", "images/symbols/sym_d.png");
  this.load.image("e", "images/symbols/sym_e.png");
}

function create ()
{
  //Here you can put the images inside the canvas: this.add.image(x, y, "name"); the name asigned on the preload function
  //All the images in phaser have a pivot in the center, if you want to put a background you should use the size divided by 2
  //Or you can add at the end: .setOrigin(0,0); to send the pivot to the top left cornet (or put it wherever you want)
  //Also it's important the order in which you create the images, first create the background and later the things that goes in front
  this.add.image(245, 245, "background");
  this.add.image(100, 530, "prizeWindow");
  spinButton = this.add.image(390, 530, "spinBtn");
  spinButton.setInteractive();
//   spinButton.on("pointerover", () => { console.log("Pointer over"); })
//   .on("pointerout", () => { console.log("Pointer out"); })
//   .on("pointerup", () => { console.log("Pointer up"); })
//   .on("pointerdown", () => { console.log("Pointer down"); });
}

function update ()
{

}
