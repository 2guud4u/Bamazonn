import Phaser from "phaser";
import Player from "./player";
import {Weapon} from './States/Weapon';
import Projectile from '../tools/ranged/projectile';
import fireProjectile from '../tools/ranged/spawn';
import CandyCane from '../tools/melee/candyCane';

export default class PlayerContainer extends Phaser.GameObjects.Container {
    private pointer!: Phaser.Input.Pointer;
    private box: Phaser.GameObjects.Sprite;
    body!: Phaser.Physics.Arcade.Body;
    private cursors: any;
    private speed: number = 300;
    private jumpheight: number = 200;
    private equipment: number = 0;
    private hotbar = [Weapon.Fist, Weapon.BugSpray, Weapon.BugASalt, Weapon.CandyCane];
    private timeSinceLastFire: number = 0;
    public Projectiles: Phaser.Physics.Arcade.Group;
    private cane: CandyCane;
    private aimAngle: number = 0;
    constructor(scene: Phaser.Scene, x: number, y: number) {
        super(scene, x, y);

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        

        
        
        this.body.setCollideWorldBounds(true);

        //set up player controls
        this.cursors = this.scene.input.keyboard.addKeys({
          up: Phaser.Input.Keyboard.KeyCodes.W,
          left: Phaser.Input.Keyboard.KeyCodes.A,
          right: Phaser.Input.Keyboard.KeyCodes.D,
          swap: Phaser.Input.Keyboard.KeyCodes.Q
        });
        this.pointer = this.scene.input.mousePointer; 
        

        //add player to container
        this.box = this.scene.add.sprite( 0, 0, 'player-key');
        this.add(this.box);

        this.Projectiles = scene.physics.add.group({
          classType: Projectile,
          runChildUpdate: true,
        });
        
        //add candy cane
        this.cane = new CandyCane(this.scene, 20, 0, 'candy-cane');
        
        this.add(this.cane);

        
        this.scene.input.on('pointermove', (pointer:Phaser.Input.Pointer) => {
          // Calculate the angle between the player and the world x/y of the mouse, and offset it by Pi/2
          this.aimAngle = (Phaser.Math.Angle.Between(this.x, this.y, pointer.x, pointer.y) - Math.PI / 2);
    
        });
      }
    update() {
      const { left, right, up, swap } = this.cursors;
      const pointer = this.pointer;
      // player movement
      if (left.isDown)
      {
          this.body.setVelocityX(-this.speed);
      }
      else if (right.isDown){
          this.body.setVelocityX(this.speed);
      }
      else {
        this.body.setVelocityX(0);
      }
      if(this.body.blocked.down && up.isDown){
        this.body.setVelocityY(-this.jumpheight);
      }
      
      // player weapon functionality
      if(Phaser.Input.Keyboard.JustDown(swap)){
        this.changeEquipment()
      }
      if (pointer.leftButtonDown()) {
        
        
        if(fireProjectile(this.hotbar[this.equipment], this.Projectiles, this.scene, this.timeSinceLastFire, this.pointer.position, this.getPosition())){
         this.timeSinceLastFire = this.scene.time.now; 
        }
        
  
      }
      this.aimAngle = (Phaser.Math.Angle.Between(this.x, this.y, pointer.position.x, pointer.position.y) - Math.PI / 2);
    this.cane.setRotation(this.aimAngle);
      //fire rate logic
      
      
      //update plyer pos
      this.cane.setRotation(this.aimAngle);
    }


    private changeEquipment(){
      
      this.equipment = (this.equipment + 1) % this.hotbar.length;
      console.log(this.hotbar[this.equipment]);
      
    }

    public getPosition(): { x: number; y: number } {
      return { x: this.x, y: this.y };
    }
    
    private mouseClicked(){
      console.log("mouse clicked");
    }
    private getRotation(){
      console.log("move")
    }

}