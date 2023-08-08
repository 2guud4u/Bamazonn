import Phaser from 'phaser';

export default class Projectile extends Phaser.Physics.Arcade.Sprite {
    private ProjectileDirection!: {x: number, y: number};
    private ProjectileSpeed!: number; 
    private Damage!: number;
    private knockbackStrength!: number;
    private stunStrength!: number;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string, projectileSpeed: number, damage: number, knockbackStrength: number, stunStrength: number) {
    super(scene, x, y, texture);
    scene.physics.world.enable(this);
    scene.add.existing(this);
    (this.body as Phaser.Physics.Arcade.Body).allowGravity = true;
    //this.setScale(.4);
    this.scene.physics.add.existing(this);
    this.body.onCollide = true;
    this.ProjectileSpeed = projectileSpeed;
    this.Damage = damage;
    this.knockbackStrength = knockbackStrength;
    this.stunStrength = stunStrength;
    }

  public setProjectileDirection(direction: {x: number, y: number}){
    this.ProjectileDirection = direction;
    const angle = Phaser.Math.Angle.Between(this.x, this.y, this.ProjectileDirection.x, this.ProjectileDirection.y);
    
    // Set the velocity of the Projectile based on the angle
    console.log("angling")
    this.setVelocityX(Math.cos(angle) * this.ProjectileSpeed);
    this.setVelocityY(Math.sin(angle) * this.ProjectileSpeed);
}
  update() {
    // Calculate the angle between player and click position
    
   
    
  }
  public getDamage(){
    return this.Damage;
  }
  public getKnockback(){
    return this.knockbackStrength;
  }
  public getStunStrength(){
    return this.stunStrength;
  }

}