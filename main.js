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
    this.winsText = this.add.text(100, 530, "WIN: $0", {fontFamily: "Arial", fontSize: "25px", color: "rgb(27, 55, 104)", fontStyle: "Bold"}).setOrigin(0.5, 0.5);
    /*prizeWindow = this.add.image(100, 530, "prizeWindow");
    prizeWindow.setInteractive();
    prizeWindow.on("pointerdown", () => { this.test(); });*/
    spinButton = this.add.image(390, 530, "spinBtn");
    spinButton.setInteractive();



    // If you touch spin it triggers the spin function that recives as a parameter the list of the containers of the reels
    spinButton.on("pointerdown", () => { this.spin(); });


    this.lineWinImages = [];
    this.getReels = wrapper.getReels();
    this.containerReels = this.add.container(0, 100); // The container of the 3 containers that have the images of the reels (1 container per reel)

    //Create the reels on here
    // var containerScreen  = this.add.container(0, 0);
    for (let i = 0; i < this.getReels.length; i++) {
      // Creates a container to hold all the images of the reel
      let containerReelAux = this.add.container(100 + (i * 145), 0);
      // Creates a rectangle of the size of the reel
      let rectangle = this.make.graphics();
      rectangle.fillStyle(0xffffff);
      rectangle.fillRect(30 + (i * 145), 30, 140, 435);
      // Creates a geometry Mask with the rectangle and applies it to the container
      let mask = rectangle.createGeometryMask();
      containerReelAux.setMask(mask);
      for (let j = this.getReels[i].length - 1; j >= this.getReels[i].length - 3; j--) {
        let position = j - 17;
        let image = this.add.image(0, (145 * position), this.getReels[i][j]);
        image.name = this.getReels[i][j];
        containerReelAux.add(image);
      }
      // Adds the container of the reel to the Array of reels
      this.containerReels.add(containerReelAux);
    }
  },

  spin: function () {

    this.winsText.text = "WIN: $0";
    spinButton.disableInteractive();

    for (image of this.lineWinImages) {
      image.destroy();
    }
    this.lineWinImages = [];

    let spin = wrapper.spin();
    console.log(spin);

    this.makeTopReels(spin);
    this.tweens.add({
      targets: this.containerReels.list[0],
      y: 2175,
      ease: "Back.easeInOut",
      easeParams: [0.35],
      duration: 3500
    });
    this.tweens.add({
      targets: this.containerReels.list[1],
      y: 2175,
      ease: "Back.easeInOut",
      easeParams: [0.35],
      duration: 3500,
      delay: 200
    });
    this.tweens.add({
      targets: this.containerReels.list[2],
      y: 2175,
      ease: "Back.easeInOut",
      easeParams: [0.35],
      duration: 3500,
      delay: 400,
      callbackScope: this,
      onComplete: function () {
        for (wins in spin.prizes) {
          this.checkPrizes(spin, spin.prizes[wins].lineId);
        }
        spinButton.setInteractive();
        for (let i = 0; i < 3; i++) {
          // Erase the old images and makes the containers go back to the starting position (of the spin animation)
          this.containerReels.list[i].list = [];
          this.containerReels.list[i].y = 0;

          // After erasing the old containers with the reels adds the actual images of the spin just spinned, so the next time there is a spin this images are already on place
          for (let j = 0; j < 3; j++){
            let image = this.add.image(0, (j * 145), spin.reelsLayout[i][j]);
            this.containerReels.list[i].add(image);
          }
        }
      }
    });
  },

  makeTopReels: function (spinResults) {
    for (let i = 0; i < 3; i++) {

      // Chooses a image to start from, going 5 spaces away from the "stop position" and going the opposite way, which will make it move 15 spaces
      // An example will be, if the stop position is 11 it takes 5 away and it starts going down to the 11 again in this order 6,5,4,3,2,1,19,18,17,16,15,14,13,12,11
      let imageToStart = spinResults.stopPoints[i] - 5;
      for (let j = 0; j < 15; j++) {
        imageToStart--;
        if (imageToStart < 0) {
          imageToStart += 20;
        }
        // Sets the image and saves it on the containers
        let image = this.add.image(0, (-145 * (j + 1)), this.getReels[i][imageToStart]);
        image.name = this.getReels[i][imageToStart];
        //console.log("In the loop ImgToStart: " + imageToStart);
        this.containerReels.list[i].add(image);
      }
    }
  },

  checkPrizes: function (spinInfo, prizes) {
    switch (prizes) {
      case 0:
        this.lineWinImages.push(this.add.image(245, 240, "lineH"));
        break;
      case 1:
        this.lineWinImages.push(this.add.image(245, 100, "lineH"));
        break;
      case 2:
        this.lineWinImages.push(this.add.image(245, 380, "lineH"));
        break;
      case 3:
        this.lineWinImages.push(this.add.image(245, 245, "lineUpDown"));
        break;
      case 4:
        this.lineWinImages.push(this.add.image(245, 245, "lineDownUp"));
        break;

      default:
        console.log("Something went wrong");
        break;
    }
    this.winsText.text = "WIN: $" + spinInfo.winnings;
  },

  update: function () {

    // if (this.lineWinImages.length === 2) {
    //   spinButton.disableInteractive();
    // }

  }
});

var config = {
  type: Phaser.AUTO,
  width: 490,
  height: 570,
  scene: [slotGame]
};

var game = new Phaser.Game(config);