import Phaser from 'phaser'
import Player from '../entities/player';
import Mosquito from '../entities/mosquito';
import Spray from '../tools/ranged/projectile';
export default class HelloWorldScene extends Phaser.Scene {
  
  private player!: Player;
  private mosquito!: Mosquito;
  private mobs!: Phaser.Physics.Arcade.Group;
  constructor() {
    super('helloworld')
  }

  preload() {
    

    this.load.image('logo', 'assets/logo192.png')
    this.load.image('red', 'assets/logo192.png')
  }

  create() {
    this.mosquito = new Mosquito(this, 400, 450, 'player-key');
    // Create your square player sprite and initialize its properties
    this.player = new Player(this, 100, 450, 'player-key');
    this.mobs = this.physics.add.group(
      {
        classType: Mosquito
      }

    );

    this.physics.world.enable([this.player, this.mosquito]);
    this.add.existing(this.player);
    this.add.existing(this.mosquito); 
    // Enable physics for entitiesGroup and player.Spraysd
    this.mobs.add(this.mosquito);
 
    this.physics.world.enable(this.player.Projectiles);

    this.physics.add.collider(this.player.Projectiles, this.mobs , this.handleCollision as any, undefined, this);
    this.physics.add.collider(this.player, this.mosquito , this.handlePlayerCollision as any, undefined, this);
     
  }
  update() {
    if(this.player !== undefined){
      this.player.update();
    }
    
    
    
    this.mosquito.update(this.player.getPosition());
    
    // console.log('Numbers of sprites', this.entitiesGroup.getLength())
    console.log('Numbers of shots', this.player.Projectiles.getLength())

 

  

  }
  private handleCollision( spray:any, mosquito:Mosquito) {
    console.log('Collision');
    console.log(mosquito);
    mosquito.damaged(4);
    spray.destroy();
  
  }
  private handlePlayerCollision(player:any, mosquito:any) {
    console.log('Collision');
    console.log(mosquito);
    console.log(player.health);
    const hitDirection = player.x - mosquito.x;
    console.log(mosquito.attackDamage)
    player.damaged(hitDirection, mosquito.attackDamage);
    
  
  }
  


}
