import Phaser from 'phaser'

export default class HelloWorldScene extends Phaser.Scene {
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private player!: Phaser.Physics.Arcade.Sprite;
  private wKey!: Phaser.Input.Keyboard.Key;
  private aKey!: Phaser.Input.Keyboard.Key;
  private sKey!: Phaser.Input.Keyboard.Key;
  private dKey!: Phaser.Input.Keyboard.Key;
  constructor() {
    super('helloworld')
  }

  preload() {
    

    this.load.image('logo', 'assets/logo192.png')
    this.load.image('red', 'assets/logo192.png')
  }

  create() {
    
    // Create your square player sprite and initialize its properties
    this.player = this.physics.add.sprite(100, 100/* initial position */, 'player-key');

    // ...

    // Enable cursor keys for WASD input
    this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.physics.add.existing(this.player);
    this.player.setCollideWorldBounds(true); 
    //this.player.setGravityY(200);
  }
  update() {
    // Define player movement speed
    const playerSpeed = 5;
    const playerJumpSpeed = 7;
    // Handle player movement logic based on WASD input
    if (this.aKey.isDown) {
      this.player.x -= playerSpeed;
    } else if (this.dKey.isDown) {
      this.player.x += playerSpeed;
    }

    if (this.wKey.isDown) {
      this.player.y -= playerJumpSpeed;
    } 
    // else if (this.sKey.isDown) {
    //   this.player.y += playerJumpSpeed;
    // }
  }

}
