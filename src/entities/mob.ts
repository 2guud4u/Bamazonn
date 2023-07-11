import phaser from 'phaser';

export default class Mob extends phaser.Physics.Arcade.Sprite {
    private health!: number;
    public attackDamage!: number;
    constructor(scene: phaser.Scene, x: number, y: number, texture: string, health: number, attackDamage: number) { 
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
    public getAttackDamage(){
        return this.attackDamage;
    }
    
}