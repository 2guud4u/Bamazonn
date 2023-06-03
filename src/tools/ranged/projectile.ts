import Phaser from 'phaser';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    private ProjectileDirection!: {x: number, y: number};
    private ProjectileSpeed!: number; 
    private Damage!: number;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, projectileSpeed: number, damage: number) {
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    (this.body as Phaser.Physics.Arcade.Body).allowGravity = true;
    //this.setScale(.4);
    this.scene.physics.add.existing(this)
    this.body.onCollide = true;
    this.ProjectileSpeed = projectileSpeed;
    this.Damage = damage;
    
    }
  public setProjectileDirection(direction: {x: number, y: number}){
    this.ProjectileDirection = direction;
    const angle = Phaser.Math.Angle.Between(this.x, this.y, this.ProjectileDirection.x, this.ProjectileDirection.y);
    
    // Set the velocity of the Projectile based on the angle
    
    this.setVelocityX(Math.cos(angle) * this.ProjectileSpeed);
    this.setVelocityY(Math.sin(angle) * this.ProjectileSpeed);
}
  update() {
    // Calculate the angle between player and click position
    
    if (this.x > this.scene.sys.canvas.width || 
        this.y < 0 ||
        this.x < 0 ||
        this.y > this.scene.sys.canvas.height) {
        this.destroy(); // Remove the bullet from the scene
    }
    
  }
  public getDamage(){
    return this.Damage;
}

}