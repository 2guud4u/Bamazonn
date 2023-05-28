import Phaser from 'phaser'
import Player from '../entities/player';
import Mosquito from '../entities/mosquito';
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

    
  }
  update() {
    this.player.update();
    
    this.mosquito.update(this.player.getPosition());
  }

}
