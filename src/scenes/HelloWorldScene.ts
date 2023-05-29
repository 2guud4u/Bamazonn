import Phaser from 'phaser'
import Player from '../entities/player';
import Mosquito from '../entities/mosquito';
import Spray from '../entities/spray';
export default class HelloWorldScene extends Phaser.Scene {
  
  private player!: Player;
  private mosquito!: Mosquito;
  constructor() {
    super('helloworld')
  }

  preload() {
    

    this.load.image('logo', 'assets/logo192.png')
    this.load.image('red', 'assets/logo192.png')
  }

  create() {
    this.mosquito = new Mosquito(this, 200, 450, 'player-key');
    // Create your square player sprite and initialize its properties
    this.player = new Player(this, 100, 450, 'player-key');


    this.physics.world.enable([this.player, this.mosquito]);
    this.add.existing(this.player);
    this.add.existing(this.mosquito); 
    // Enable physics for entitiesGroup and player.Spraysd
    
 
    this.physics.world.enable(this.player.Sprays);

    this.physics.add.collider(this.player.Sprays, this.mosquito , this.handleCollision as any, undefined, this);

     
  }
  update() {

    this.player.update();
    
    
    this.mosquito.update(this.player.getPosition());
    
    // console.log('Numbers of sprites', this.entitiesGroup.getLength())
     console.log('Numbers of shots', this.player.Sprays.getLength())

 

  

  }
  private handleCollision(mosquito:any, spray:any) {
    console.log('Collision');
    console.log(mosquito);
    mosquito.damaged();
    spray.destroy();
  
  }
  


}
