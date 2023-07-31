import Phaser from "phaser";
import Player from "./player";
import {Weapon} from '../tools/ToolStates/Weapon';
import Projectile from '../tools/DamageTools/ranged/projectile/projectile';
import fireProjectile from '../tools/DamageTools/ranged/projectile/spawnProjectiles';
import CandyCane from '../tools/DamageTools/melee/candyCane';
import Tool from "../tools/Tool";
import HelloWorldScene from "../scenes/HelloWorldScene";
import Melee from "../tools/DamageTools/melee/Melee";
import Ranged from "../tools/DamageTools/ranged/Ranged";
export default class PlayerContainer extends Phaser.GameObjects.Container {
    private pointer!: Phaser.Input.Pointer;
    private box: Phaser.GameObjects.Sprite;
    body!: Phaser.Physics.Arcade.Body;
    private cursors: any;
    private speed: number = 300;
    private jumpheight: number = 200;
    private equipment_ind: number = 0;
    private hotbar = [Weapon.Fist, Weapon.BugSpray, Weapon.BugASalt, Weapon.CandyCane];
    private timeSinceLastFire: number = 0;
    public Projectiles: Phaser.Physics.Arcade.Group;
    public cane: CandyCane;
    private aimAngle: number = 0;
    private health: number = 100;
    public inHand: Tool;
    public scene: HelloWorldScene;
    
    constructor(scene: HelloWorldScene, x: number, y: number) {
        super(scene, x, y);

        this.scene = scene;
        scene.add.existing(this);
        scene.physics.world.enable(this);
        //this.body.setAllowGravity(false);

        
        

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
        // this.cane = new CandyCane(this.scene, 20, 0, 'candy-cane');
        // this.cane.body.setAllowGravity(false);
        // this.add(this.cane);
        
        this.scene.input.on('pointermove', (pointer:Phaser.Input.Pointer) => {
          // Calculate the angle between the player and the world x/y of the mouse, and offset it by Pi/2
          this.aimAngle = (Phaser.Math.Angle.Between(this.body.x, this.body.y, pointer.x, pointer.y) - Math.PI / 2);
          
          
        });
        // this.scene.input.on('pointerdown', (pointer:Phaser.Input.Pointer) => {
        //   if(this.inHand instanceof CandyCane)
        //     this.inHand.stab(this.pointer.position, this.aimAngle, this.body.position);
        //     //this.cane.stab(this.pointer.position, this.aimAngle, this.body.position);
        //   });
        //make cur weapon fist
        this.inHand=scene.toolsDict.get(this.hotbar[this.equipment_ind])
        
        
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
      
      this.inHand.setRotation(this.aimAngle);
      this.handleClick(pointer);
      
    }

    private handleClick(pointer: Phaser.Input.Pointer) {
      if (pointer.leftButtonDown()) {
        if(this.inHand instanceof Ranged){
          let coord = {x: 0, y: 0};
        
          this.inHand.getBottomCenter(coord,true);
          this.timeSinceLastFire = this.inHand.shoot(this.timeSinceLastFire, this.pointer.position, coord);
        } else if(this.inHand instanceof Melee){
          if(this.scene.time.now - this.timeSinceLastFire  > 500){
            
            this.timeSinceLastFire = this.inHand.attack(this.aimAngle, this.timeSinceLastFire);
          }
            
          
        
        }

        
         
          
    
        }
    }
    
    private changeEquipment(){
      //unequip current weapon
      this.inHand.setVisible(false);
      this.remove(this.inHand);
      //equip new weapon
      this.equipment_ind = (this.equipment_ind + 1) % this.hotbar.length;
      this.equip();


    }
    private equip(){
      this.inHand = this.scene.toolsDict.get(this.hotbar[this.equipment_ind])!;
      this.add(this.inHand);
      this.inHand.setVisible(true);
      console.log(this.inHand.constructor.name)
    }

    public getPosition(): { x: number; y: number } {
      return { x: this.x, y: this.y };
    }
    
    public getHealth(){
      return this.health;
    }
    public setHealth(health: number){
      this.health = health;
    }

}