var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
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

}

function create ()
{
  //Here you can put the images inside the canvas: this.add.image(x, y, "name"); the name asigned on the preload function
  //All the images in phaser have a pivot in the center, if you want to put a background you should use the size divided by 2
  //Or you can add at the end: .setOrigin(0,0); to send the pivot to the top left cornet (or put it wherever you want)
  //Also it's important the order in which you create the images, first create the background and later the things that goes in front

}

function update ()
{

}
