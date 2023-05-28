import Phaser from 'phaser';

export default class Spray extends Phaser.Physics.Arcade.Sprite {
    private sprayDirection!: {x: number, y: number};
    private playerPosition!: {x: number, y: number};
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    (this.body as Phaser.Physics.Arcade.Body).allowGravity = true;
    this.playerPosition = {x, y};
  }
  public setSprayDirection(direction: {x: number, y: number}){
    this.sprayDirection = direction;
  const angle = Phaser.Math.Angle.Between(this.x, this.y, this.sprayDirection.x, this.sprayDirection.y);
    
    // Set the velocity of the spray based on the angle
    const spraySpeed = 400; // Adjust the spray speed as needed
    this.setVelocityX(Math.cos(angle) * spraySpeed);
    this.setVelocityY(Math.sin(angle) * spraySpeed);
}

  update() {
    // Calculate the angle between player and click position
    
    if (this.x > this.scene.sys.canvas.width || this.y < 0) {
        this.destroy(); // Remove the bullet from the scene
    }
  }
}