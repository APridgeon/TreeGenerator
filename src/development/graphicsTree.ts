import PixelatedFX from "./pixelatedFX";
import * as Phaser from 'phaser';
import TreeComponents from "./treeTiles";
import InputControllers, { BranchColours, Effects, LeafColours } from "./controls";

type Position = {
    x: number,
    y: number
}

export default class GraphicsTree {

    _scene: Phaser.Scene;


    gOb: Phaser.GameObjects.Graphics;
    leafClumps: Phaser.GameObjects.Image[] = [];

    scale = 4;

    controls: InputControllers;

    tree: Tree;


    constructor(scene: Phaser.Scene){

        this.controls = new InputControllers();


        this._scene = scene;
        let pixel = (this._scene.renderer as Phaser.Renderer.WebGL.WebGLRenderer).pipelines.getPostPipeline('PixelatedFX') as PixelatedFX;


        this.gOb = scene.add.graphics();
        this.makeTree();

        this._scene.input.on(Phaser.Input.Events.POINTER_DOWN, () => this.makeTree());

        this.gOb.setPostPipeline(pixel);
        let post = this.gOb.postPipelines[0] as PixelatedFX;
        post.setup(this.scale - 2, {NE: 0.1, SE: 0.1, SW: 0, NW: 0});

    }

    makeTree(){
        this.gOb.clear();
        if(this.tree){
            this.tree.clear();
        }

        if(!this.controls.randomSeedCheckbox.checked){
            this.controls.randomSeedInput.value = Math.random().toString();
        }

        let treeSettings: TreeSettings = {
            seed: this.controls.randomSeedInput.value.toString(),

            life: 0,

            lineWidth: (this.controls.effectsMap.get(Effects.BranchWidth) as HTMLInputElement).valueAsNumber,
            lineWidthDecrease: (this.controls.effectsMap.get(Effects.BranchWidthDecrease) as HTMLInputElement).valueAsNumber,
            
            growthAmount: (this.controls.effectsMap.get(Effects.GrowthLength) as HTMLInputElement).valueAsNumber,
            wobbliness: (this.controls.effectsMap.get(Effects.Wobble) as HTMLInputElement).valueAsNumber,
            internodeLength: (this.controls.effectsMap.get(Effects.SegmentLength) as HTMLInputElement).valueAsNumber,
        
            branchDelay: (this.controls.effectsMap.get(Effects.BranchDelay) as HTMLInputElement).valueAsNumber,
            abilityToBranch: (this.controls.effectsMap.get(Effects.BranchAbility) as HTMLInputElement).valueAsNumber,
            newBranchesTerminateSooner: 0,
            branchTermination: (this.controls.effectsMap.get(Effects.Age) as HTMLInputElement).valueAsNumber,

            leafColours: {
                dark: ((this.controls.effectsMap.get(Effects.LeafColours).children[0] as HTMLInputElement).value),
                middle: ((this.controls.effectsMap.get(Effects.LeafColours).children[1] as HTMLInputElement).value),
                light: ((this.controls.effectsMap.get(Effects.LeafColours).children[2] as HTMLInputElement).value)
            },

            branchColours: {
                dark: ((this.controls.effectsMap.get(Effects.BranchColours).children[0] as HTMLInputElement).value),
                light: ((this.controls.effectsMap.get(Effects.BranchColours).children[1] as HTMLInputElement).value)
            }
        }

        this.tree = new Tree({x: this._scene.game.scale.width/2, y: this._scene.game.scale.height}, treeSettings, this.gOb, this._scene);

    }

}


export class Tree {

    private _graphicsOb: Phaser.GameObjects.Graphics;
    private _scene: Phaser.Scene;

    leafClumps: Phaser.GameObjects.Image[] = [];

    private pos: Position;
    private scale = 4;
    public treeSettings: TreeSettings;

    private buds: GrowthBud[] = [];


    constructor(pos: Position, treeSettings: TreeSettings, graphicsOb: Phaser.GameObjects.Graphics, scene: Phaser.Scene){

        this._graphicsOb = graphicsOb;
        this._scene = scene;

        this.pos = pos;
        this.treeSettings = treeSettings;

        this.buds.push(new GrowthBud(this.pos, 0, 0, 1));


        Phaser.Math.RND.sow([`${this.treeSettings.seed}`]);
        for(let i = 0; i < this.treeSettings.branchTermination; i ++){
            this.generateTree();
        }

    }

    private generateTree() {
        this.buds.forEach((bud, i) => {
            let choice = Phaser.Math.RND.between(0,1);
            let branchColours = [Number((this.treeSettings.branchColours.light).replace('#', '0x')), Number((this.treeSettings.branchColours.dark).replace('#', '0x'))];

            this._graphicsOb.setDefaultStyles({lineStyle: {width: (this.treeSettings.lineWidth * this.scale), color: branchColours[choice]}, fillStyle: {color: branchColours[choice]}});

            this._graphicsOb.beginPath();
            this._graphicsOb.moveTo(bud.pos.x, bud.pos.y);

            //Choosing angle
            let angle = Phaser.Math.RND.between(90 - (1* this.treeSettings.wobbliness), 90 + (1 * this.treeSettings.wobbliness));
            angle += bud.angle;

            //stop branches growing below the screen
            if(bud.pos.y > (this.pos.y) - (10 * this.scale)){
                if(angle < 0){
                    bud.angle += 90
                }else if(angle > 180){
                    bud.angle -=90
                }
            }

            //generate new growth
            let dx = (Math.cos((Math.PI/180) * angle) * (this.treeSettings.growthAmount * bud.growthLength)) * this.scale;
            let dy = (Math.sin((Math.PI/180) * angle) * (this.treeSettings.growthAmount * bud.growthLength)) * this.scale;

            bud.pos = {x: (bud.pos.x - dx), y: (bud.pos.y - dy)};

            this._graphicsOb.lineTo(bud.pos.x, bud.pos.y);
            this._graphicsOb.stroke();
            this._graphicsOb.fillCircle(bud.pos.x, bud.pos.y, this.treeSettings.lineWidth * 0.5 * this.scale);
    
            bud.life += 1;

            //decide whether branching should happen
            if(this.treeSettings.life > this.treeSettings.branchDelay && bud.life % this.treeSettings.internodeLength === 0 && i < this.treeSettings.abilityToBranch && this.treeSettings.life < this.treeSettings.branchTermination){

                let newAngle = Phaser.Math.RND.between(0, 90) * Phaser.Math.RND.sign();
                let newGrowthLength = 1 * bud.growthLength;
                this.buds.push(new GrowthBud(bud.pos, newAngle, bud.life + this.treeSettings.newBranchesTerminateSooner, newGrowthLength));
                // this.drawLeafClump(bud);
            }

            //draw leaf clump at end of branch (except initial branch)
            if(bud.life === this.treeSettings.branchTermination && i !== 0){
                this.drawLeafClump(bud);
                // this.buds.splice(i, 1);
            }



            if(i === 0){
                this.treeSettings.life += 1;
                this.treeSettings.lineWidth *= this.treeSettings.lineWidthDecrease;
                if(this.treeSettings.lineWidth < 1) this.treeSettings.lineWidth = 1;
            }


        })

    }

    private drawLeafClump(bud: GrowthBud){
        let choice = Phaser.Math.RND.between(0, TreeComponents.LeafComponents.length-1);

        this.leafClumps.push( this._scene.add.image(Math.round(bud.pos.x/this.scale) * this.scale, Math.round(bud.pos.y/this.scale) * this.scale, 'trees', TreeComponents.LeafComponents[choice].bottom)
            .setScale(this.scale)
            .setTint(Number((this.treeSettings.leafColours.dark).replace('#', '0x'))));
        
        this.leafClumps.push( this._scene.add.image(Math.round(bud.pos.x/this.scale) * this.scale, Math.round(bud.pos.y/this.scale) * this.scale, 'trees', TreeComponents.LeafComponents[choice].middle)
            .setScale(this.scale)
            .setTint(Number((this.treeSettings.leafColours.middle).replace('#', '0x'))));
        
        this.leafClumps.push( this._scene.add.image(Math.round(bud.pos.x/this.scale) * this.scale, Math.round(bud.pos.y/this.scale) * this.scale,  'trees', TreeComponents.LeafComponents[choice].top)
            .setScale(this.scale)
            .setTint(Number((this.treeSettings.leafColours.light).replace('#', '0x'))));
    }

    public clear(){
        this.leafClumps.forEach(clump => clump.destroy());
    }

    public growOne(){
        // this._graphicsOb.clear();
        this.leafClumps.forEach(clump => clump.destroy());
        this.generateTree();
    }
}

export class GrowthBud {

    pos: Position;
    angle: number;
    life: number;
    growthLength: number;

    constructor(pos: Position, angle: number, life: number, growthLength: number){
        this.pos = pos;
        this.angle = angle;
        this.life = life;
        this.growthLength = growthLength;
    }

}

export type TreeSettings = {
    seed: string,
    life: number,
    lineWidth: number,
    lineWidthDecrease: number,
    growthAmount: number,
    wobbliness: number,
    internodeLength: number,
    branchDelay: number,
    abilityToBranch: number,
    newBranchesTerminateSooner: number,
    branchTermination: number,

    leafColours: LeafColours,
    branchColours: BranchColours
}