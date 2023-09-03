import phaser from 'phaser';
import CandyCane from '../tools/DamageTools/melee/candyCane';
import HelloWorldScene from '../scenes/HelloWorldScene';
import {Weapon} from '../tools/ToolStates/Weapon';
import bugSpray from '../tools/DamageTools/ranged/bugSpray';
import BugASalt from '../tools/DamageTools/ranged/bugAsalt';
import Fist from '../tools/DamageTools/melee/fist';
import Tool from '../tools/Tool';
export default function loadAssets(scene: HelloWorldScene) {
    loadWeapons(scene);
    giveAttributes(scene);
}

function loadWeapons(scene: HelloWorldScene){
    //scene.load.image("candycane", "assets/toolSprites/candycane.png");
    scene.toolsDict.set(Weapon.CandyCane,new CandyCane(scene, 50, 50, "candycane"));
    scene.toolsDict.set(Weapon.BugSpray, new bugSpray(scene, 20, 0, 'bugspray'));
    scene.toolsDict.set(Weapon.BugASalt, new BugASalt(scene, 20, 0, 'bug-a-salt'));
    scene.toolsDict.set(Weapon.Fist, new Fist(scene, 0, 0, 'fist'));
}

function giveAttributes(scene: HelloWorldScene){
    //set no gravity
    scene.toolsDict.forEach((value: Tool, key:String) => {
        
        console.log("setting ", value, key)
        value.body.setAllowGravity(false);
        value.body.pushable = false;
        value.setVisible(false);

    });
    //set invisible
    // scene.toolsDict.forEach((key: any, value: any) => {
    //     scene.toolsDict.get(key)?.setVisible(false);
    // });
    
    
}