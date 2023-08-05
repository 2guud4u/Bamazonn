import { publicDecrypt } from 'crypto';
import phaser from 'phaser';

export default class Mob extends phaser.Physics.Arcade.Sprite {
    private health!: number;
    public attackDamage!: number;
    private playerPos!: {x: number, y: number};
    private stun: boolean = false;
    public body!: Phaser.Physics.Arcade.Body;
    private stunResist!: number;
    constructor(scene: phaser.Scene, x: number, y: number, texture: string, health: number, attackDamage: number, stunResist: number) { 
        super(scene, x, y, texture);
        this.scene.physics.add.existing(this);
        
        this.scene.add.existing(this);
        
        
        this.setCollideWorldBounds(true);
        this.scene.physics.world.enable(this); 
        (this.body as Phaser.Physics.Arcade.Body).allowGravity = true;
        this.body.onCollide = true;
        

       
        
       
        

        // add the monster to the existing scenes
       
        


        //mob stats
        this.health = health;
        this.attackDamage = attackDamage;
        this.stunResist = stunResist;
    }
    public damaged(damage: number){
        if(this.health <= 1){
            
            this.destroy();
            return
        }
            this.health -= damage;
            console.log(this.health);
            this.x = this.x + 20*(Math.sign(this.body.velocity.x));   
        
        
    }
    public getDamage(){
        return this.attackDamage;
    }
    public updatePlayerPos(playerPos: {x: number, y: number}){
        this.playerPos = playerPos;
    }
    public getPlayerPos(){
        return this.playerPos;
    }
    public getHealth(){
        return this.health;
    }
    public setHealth(health: number){
        this.health = health;
    }
    public isStunned(){
        return this.stun;
    }
    public setStun(stun: boolean){
        this.stun = stun;
    }
    public getStunResist(){
        return this.stunResist;
    }
}