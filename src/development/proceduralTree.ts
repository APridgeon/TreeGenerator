import * as Phaser from 'phaser';
import { Position } from "../plant/plantData";
import TreeComponents, { BranchFrames, FrameType, LeafFrames } from "./treeTiles";

type TreeComponent<FrameType> = {
    pos: Position,
    frames: FrameType,
    colours: number[]
}

export default class ProceduralTree {

    _scene: Phaser.Scene;

    scale: number = 2;

    pos: Position;
    growth: Position = {x: 1, y: 1};



    leafComponents: TreeComponent<LeafFrames>[] = [];
    branchComponents: TreeComponent<BranchFrames>[] = [];

    leafColours: number[] = [0x413452, 0x3b6e7f, 0x66ab8c];
    branchColours: number[] = [0x4a3838, 0x816976];


    currentImages: Phaser.GameObjects.Image[] = [];


    constructor(scene: Phaser.Scene){

        this._scene = scene;

        this.pos = {x:  50 , y:  100 };
        
        this.drawingBranches();

        // this.placeComponentRandomly(FrameType.Branch);
        // this.placeComponentRandomly(FrameType.Leaf);
        // this.renderComponents();

        // this._scene.input.on(Phaser.Input.Events.POINTER_UP, () => {
        //     this.grow(true, true);
        //     this.placeComponentRandomly(FrameType.Leaf);
        //     this.renderComponents();
        // })

    }


    addBranchComponent(pos: Position, type: number){
        let frames = TreeComponents.BranchComponents[type];

        this.branchComponents.push({
            colours: this.branchColours,
            frames: frames,
            pos: pos
        });
    }

    addLeafComponent(pos: Position, type: number){

        let frames = TreeComponents.LeafComponents[type];
        let color = Phaser.Display.Color.RandomRGB();

        this.leafComponents.push({
            colours: this.leafColours,
            frames: frames,
            pos: pos
        });
    }

    placeComponentRandomly(component: FrameType){

        if(component == FrameType.Leaf){

            let accepted = false;
            let randomXoffset;
            let growthYValue;

            do {
                if(this.leafComponents.length > 0){
                    randomXoffset = Phaser.Math.Between(this.growth.x * -0.5, this.growth.x * 0.5) ;
                    growthYValue = Phaser.Math.Between(0, (this.growth.y - 1) * -1);
        
                    this.leafComponents.forEach(comp => {
                        let newPos = new Phaser.Math.Vector2(randomXoffset, growthYValue);
                        let compPos = new Phaser.Math.Vector2(comp.pos.x, comp.pos.y)
    
                        let distSq = newPos.distanceSq(compPos);
                        let minDistanceSq = 8*8;
                        let maxDistanceSq = 9*9;

                        if(distSq < maxDistanceSq && distSq > minDistanceSq){
                            accepted = true;
                        } else if (distSq < minDistanceSq){
                            accepted = false;
                        }
                    })
                } else {
                    randomXoffset = Phaser.Math.Between(this.growth.x * -0.5, this.growth.x * 0.5) ;
                    growthYValue = Phaser.Math.Between(0, (this.growth.y - 1) * -1);
                    accepted = true;
                }
            } while (!accepted);

            let frameChoice = Phaser.Math.Between(0, TreeComponents.LeafComponents.length - 1);

            this.addLeafComponent({x: randomXoffset, y: growthYValue}, frameChoice);
            

        } else {

            let accepted = false;
            let randomXoffset;
            let growthYValue;

            while(!accepted){
    
                randomXoffset = Phaser.Math.Between(this.growth.x * -0.5, this.growth.x * 0.5) ;
                growthYValue = Phaser.Math.Between(0, (this.growth.y - 1) * -1);
    
                this.leafComponents.forEach(comp => {
                    let newPos = new Phaser.Math.Vector2(randomXoffset, growthYValue);
                    let compPos = new Phaser.Math.Vector2(comp.pos.x, comp.pos.y)
                })
    
                accepted = true;
            }

            this.addBranchComponent({x: randomXoffset, y: growthYValue}, 1);
        }

    }

    grow(x: boolean, y: boolean){
        let growthAmount = 10;

        if(x) this.growth = {x: this.growth.x + growthAmount, y: this.growth.y};
        if(y) this.growth = {x: this.growth.x, y: this.growth.y + growthAmount};
    }


    renderComponents(){
        this.currentImages.forEach((image, i) => {
            image.destroy();
            this.currentImages.splice(i, 1);
        })

        this.branchComponents.forEach((comp, i) => {
            this.renderBranchComponent(comp, i);
        })
        this.leafComponents.forEach((comp, i) => {
            this.renderLeafComponent(comp, i);
        })

    }

    renderLeafComponent(comp: TreeComponent<LeafFrames>, index: number){

        let renderPos: Position = {x: (comp.pos.x + this.pos.x) * this.scale, y: (this.pos.y + comp.pos.y) * this.scale}

        this.currentImages.push( this._scene.add.image(renderPos.x, renderPos.y, 'trees', comp.frames.bottom) 
            .setTint(comp.colours[0])
            // .setOrigin(0,0)
            .setScale(this.scale)
            .setDepth(-1 * index) );
        this.currentImages.push( this._scene.add.image(renderPos.x, renderPos.y, 'trees', comp.frames.middle)
            .setTint(comp.colours[1])
            // .setOrigin(0,0)
            .setScale(this.scale)
            .setDepth(-1 * index) );
        this.currentImages.push( this._scene.add.image(renderPos.x, renderPos.y, 'trees', comp.frames.top)
            .setTint(comp.colours[2])
            // .setOrigin(0,0)
            .setScale(this.scale)
            .setDepth(-1 * index) );

        this._scene.add.circle(renderPos.x, renderPos.y, 1, 0xff0000);

    }

    renderBranchComponent(comp: TreeComponent<BranchFrames>, index: number){

        let renderPos: Position = {x: (comp.pos.x + this.pos.x) * this.scale, y: (this.pos.y + comp.pos.y) * this.scale}

        this.currentImages.push( this._scene.add.image(renderPos.x, renderPos.y, 'trees', comp.frames.shadow)
            .setTint(comp.colours[0])
            // .setOrigin(0,0)
            .setScale(this.scale)
            .setDepth(-1 * index) );
        this.currentImages.push( this._scene.add.image(renderPos.x, renderPos.y, 'trees', comp.frames.main)
            .setTint(comp.colours[1])
            // .setOrigin(0,0)
            .setScale(this.scale)
            .setDepth(-1 * index) );
    }


    drawingBranches(){


        let branchNodes: Position[] = [];
        let gOb = this._scene.add.graphics({x: 0, y: 0});

        gOb.setDepth(-100);
        branchNodes.push({x: this.pos.x + 3, y: this.pos.y - 15});
        branchNodes.push({x: this.pos.x + 6, y: this.pos.y - 29});
        branchNodes.push({x: this.pos.x - 2, y: this.pos.y - 37});

        let branchColor = new Phaser.Display.Color(0x81, 0x69, 0x76);
        let width = 5;

        branchNodes.forEach((node, i) => {
            width *= 0.75

            if(i == 0){
                this.drawMainTrunk(this.pos, node, width, branchColor, gOb);
            } else {
                this.drawMainTrunk(branchNodes[i-1], node, width, branchColor, gOb);
            }
        })

        //pixelate is 2 less than scale **unknown why???***
        gOb.postFX.addPixelate(this.scale-2);

    }

    drawMainTrunk(oldPos: Position, newPos: Position, width: number, colour: Phaser.Display.Color, gOb: Phaser.GameObjects.Graphics){

        gOb.setDefaultStyles({lineStyle: {color: colour.color, width: width*this.scale, alpha: 1}});
        gOb.beginPath();
        gOb.moveTo(oldPos.x * this.scale, oldPos.y * this.scale);
        gOb.lineTo((newPos.x) * this.scale, (newPos.y) * this.scale);
        gOb.stroke();


    }

}