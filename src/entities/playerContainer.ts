import Phaser from "phaser";
import Player from "./player";

export default class PlayerContainer extends Phaser.GameObjects.Container {
    private graphics: Phaser.GameObjects.Graphics;
    private box: Phaser.GameObjects.Sprite;
    body!: Phaser.Physics.Arcade.Body;
    private cursors: any;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);
        
        scene.physics.world.enable(this);
        scene.add.existing(this);
        this.graphics = scene.add.graphics();
        this.box = this.scene.add.sprite( x, y, 'player-key');
        this.body.setCollideWorldBounds(true);
        this.cursors = this.scene.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W,
          left: Phaser.Input.Keyboard.KeyCodes.A,
          right: Phaser.Input.Keyboard.KeyCodes.D
        });
        this.add(this.box);
    }
    update() {
        
      if (this.cursors.left.isDown)
      {
          this.body.setVelocityX(-300);
      }
      else if (this.cursors.right.isDown){
          this.body.setVelocityX(300);
      }
      else {
        this.body.setVelocityX(0);
      }
        // Set the line style for the outline
        const lineColor = 0xff0000;
        const lineWidth = 2;
        this.graphics.clear();
        this.graphics.lineStyle(lineWidth, lineColor);
    
        // Draw a rectangle around the container
        const containerWidth = this.getBounds().width;
        const containerHeight = this.getBounds().height;
        const containerX = this.x - containerWidth * this.originX;
        const containerY = this.y - containerHeight * this.originY;
        this.graphics.strokeRect(containerX, containerY, containerWidth, containerHeight);
      }
}    