var slotGame = new Phaser.Class({
  Extends: Phaser.Scene,
  initialize:
    function slotGame() {
      Phaser.Scene.call(this, { key: "slotGame" })
    },
  preload: function () {

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

  },

  create: function () {

    //Here you can put the images inside the canvas: this.add.image(x, y, "name"); the name asigned on the preload function
    //All the images in phaser have a pivot in the center, if you want to put a background you should use the size divided by 2
    //Or you can add at the end: .setOrigin(0,0); to send the pivot to the top left cornet (or put it wherever you want)
    //Also it's important the order in which you create the images, first create the background and later the things that goes in front
    this.add.image(245, 245, "background");
    this.add.image(100, 530, "prizeWindow");
    spinButton = this.add.image(390, 530, "spinBtn");
    spinButton.setInteractive();
    // If you touch spin it triggers the spin function that recives as a parameter the list of the containers of the reels
    spinButton.on("pointerdown", () => { this.spin(containerReels.list); });
    //.on("pointerover", () => { console.log("Pointer over"); })
    //   .on("pointerout", () => { console.log("Pointer out"); })
    //   .on("pointerup", () => { console.log("Pointer up"); })



    //Create the reels on here
    var containerReels = this.add.container(0, 100); // Has the array of images of the 3 reels
    // var containerScreen  = this.add.container(0, 0);
    let reels = wrapper.getReels();
    for (let i = 0; i < reels.length; i++) {
      // Creates a container to hold all the images of the reel
      let containerReelAux = this.add.container(100 + (i * 145), -2465);
      // Creates a rectangle of the size of the reel
      let rectangle = this.make.graphics();
      rectangle.fillStyle(0xffffff);
      rectangle.fillRect(30 + (i * 145), 30, 140, 435);
      // Creates a geometry Mask with the rectangle and applies it to the container
      let mask = rectangle.createGeometryMask();
      containerReelAux.setMask(mask);
      for (let j = 0; j < reels[i].length; j++) {
        // Adds the corresponding image gotten from the getReels() function and adds the image to the container that holds the images of the entire reel
        let image = this.add.image(0, j * 145, reels[i][j].toString());
        containerReelAux.add(image);
      }
      // Adds the container of the reel to the Array of reels
      containerReels.add(containerReelAux);
    }
    console.log(containerReels.list);
  },

  spin: function (reels) {
    let spin = wrapper.spin();

    //The reels don't work so weel this way, so I need to make them after the spin button has been pressed, put the ones on the screen on the same position and arrange 
    //the ones that will scroll down on top of the visible screen

    this.tweens.add({
      targets: reels[0],
      y: { from: -2365, to: (spin.stopPoints[0] * -145) },
      ease: "Back",
      duration: 3000
    });
    this.tweens.add({
      targets: reels[1],
      y: { from: -2365, to: (spin.stopPoints[1] * -145) },
      ease: "Back",
      duration: 3000,
      delay: 100
    });
    this.tweens.add({
      targets: reels[2],
      y: { from: -2365, to: (spin.stopPoints[2] * -145) },
      ease: "Back",
      duration: 3000,
      delay: 200
    });

    console.log(spin);
  },

  update: function () {

  }
});

var config = {
  type: Phaser.AUTO,
  width: 490,
  height: 570,
  scene: [slotGame]
};

var game = new Phaser.Game(config);