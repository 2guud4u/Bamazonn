import Phaser from 'phaser';
import Projectile from '../tools/ranged/projectile';
import BugSpray from '../tools/ranged/BugSpray';
import {Weapon} from './States/Weapon';
import BugASalt from '../tools/ranged/BugASalt';


export default class Player extends Phaser.Physics.Arcade.Sprite {
  public Projectiles: Phaser.Physics.Arcade.Group;
  private wKey!: Phaser.Input.Keyboard.Key;
  private aKey!: Phaser.Input.Keyboard.Key;
  private dKey!: Phaser.Input.Keyboard.Key;
  private qKey!: Phaser.Input.Keyboard.Key;
  private pointer!: Phaser.Input.Pointer;
  private timeSinceLastFire: number = 0;
  private spriteX = 1;
  private spriteY = 2;
  private playerSpeed = 200;
  private playerJumpSpeed = 200; 
  public health = 100;
  private equipment = Weapon.Fist;
  private timeSinceLastSwap: number = 0;
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    //player physics
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setBounce(.2);
    this.setCollideWorldBounds(true);
    //player controls
    this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    this.aKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    this.dKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    this.qKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Q);

    this.Projectiles = scene.physics.add.group({
      classType: Projectile,
      runChildUpdate: true,
    });

    //chracter sizing
    this.setScale(this.spriteX, this.spriteY); // Scale the player sprite
    
    const newWidth = this.width * this.spriteX;
    const newHeight = this.height * this.spriteY;
    this.setDisplaySize(newWidth, newHeight);

    // Update the size of the physics body to match the new scale
    this.body.setSize(newWidth, newHeight-30);
    scene.input.mouse.disableContextMenu();
    this.pointer = this.scene.input.activePointer; 
}

  update() {
    // STOP MOVEMENT IF PLAYER IS DEAD
    if (!this || !this.active) {
        return;
      }
    
    //player movement
    if (this.aKey.isDown) {
      this.setVelocityX(-this.playerSpeed);
    } else if (this.dKey.isDown) {
      this.setVelocityX(this.playerSpeed);
    } else {
      this.setVelocityX(0);
    }
    if (this.wKey.isDown && this.body.blocked.down) {
      this.setVelocityY(-this.playerJumpSpeed);
    }
    //player equipment control
    if (this.qKey.isDown){
      console.log("Q Pressed")
      this.changeEquipment(this.equipment, this.timeSinceLastSwap)
    }
    
      
    
    //player shooting
    if (this.pointer.leftButtonDown()) {
      this.fireProjectile(this.timeSinceLastFire, this.pointer.position);
    }

    //fire rate logic
    this.timeSinceLastFire += this.scene.sys.game.loop.delta;
    this.timeSinceLastSwap += this.scene.sys.game.loop.delta;
  }

  public getPosition(): { x: number; y: number } {
    return { x: this.x, y: this.y };
  }
  public damaged(movement: number, damage: number){
    if(this.health <= 1){
        this.destroy();
        return
    }
    this.health -= damage;
    console.log(this.health);
    this.x = this.x + 20*(Math.sign(movement));
}

  private fireProjectile(timeSinceLastFire: number, shootPos: { x: number; y: number }) {
    switch(this.equipment){
      case Weapon.BugSpray:
        this.fireBugSpray(timeSinceLastFire, shootPos);
        break;
      case Weapon.BugASalt:
        this.fireBugASalt(timeSinceLastFire, shootPos);
        break;
      default:
        break;
    } 
  }
  private changeEquipment(tool: any, timeSinceLastSwap: number){
    if(timeSinceLastSwap > 1000){
      if(tool === Weapon.Fist){
        this.equipment = Weapon.BugSpray;
      }
      else if(tool === Weapon.BugSpray){
        this.equipment = Weapon.BugASalt;
      }
      
      this.timeSinceLastSwap = 0;
    }
  }
  private fireBugSpray(timeSinceLastFire: number, shootPos: { x: number; y: number }) {
     if (timeSinceLastFire > 1000) {
      const Projectile1 = new BugSpray(this.scene,this.x, this.y, 'Projectile-key');
      const Projectile2 = new BugSpray(this.scene,this.x, this.y-20, 'Projectile-key');
      const Projectile3 = new BugSpray(this.scene,this.x, this.y+20, 'Projectile-key');
      this.Projectiles.add(Projectile1);
      this.Projectiles.add(Projectile2);
      this.Projectiles.add(Projectile3);
      Projectile1.setProjectileDirection(shootPos);
      Projectile2.setProjectileDirection(shootPos);
      Projectile3.setProjectileDirection(shootPos);
      this.timeSinceLastFire = 0;
    }
  }
  private fireBugASalt(timeSinceLastFire: number, shootPos: { x: number; y: number }) {
    if (timeSinceLastFire > 1000) {
      
      const Projectile1 = new BugASalt(this.scene,this.x, this.y, 'Projectile-key');
      
      this.Projectiles.add(Projectile1);
      
      Projectile1.setProjectileDirection(shootPos);
      
      this.timeSinceLastFire = 0;
    }
  }
}
