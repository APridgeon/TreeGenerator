import PixelatedFX from "./pixelatedFX";
import * as Phaser from 'phaser';
import TreeComponents from "./treeTiles";

type Position = {
    x: number,
    y: number
}

export default class GraphicsTree {

    _scene: Phaser.Scene;

    gOb: Phaser.GameObjects.Graphics;
    leafClumps: Phaser.GameObjects.Image[] = [];

    scale = 4;

    growthLengthInput: HTMLInputElement;
    wobbleInput: HTMLInputElement;
    branchWidthInput: HTMLInputElement;
    branchDelayInput: HTMLInputElement;
    branchAbilityInput: HTMLInputElement;
    internodeLengthInput: HTMLInputElement;
    overallGrowthInput: HTMLInputElement;
    branchWidthDecreaseInput: HTMLInputElement;
    randomSeedInput: HTMLInputElement;
    randomSeedCheckbox: HTMLInputElement;

    tree: Tree;


    constructor(scene: Phaser.Scene){

        this.setupControls();

        this._scene = scene;
        let pixel = (this._scene.renderer as Phaser.Renderer.WebGL.WebGLRenderer).pipelines.getPostPipeline('PixelatedFX') as PixelatedFX;


        this.gOb = scene.add.graphics();

        this._scene.input.on(Phaser.Input.Events.POINTER_DOWN, () => {
            this.gOb.clear();
            if(this.tree){
                this.tree.clear();
            }
    
            if(!this.randomSeedCheckbox.checked){
                console.log
                this.randomSeedInput.value = Math.random().toString();
            }
    
            let treeSettings: TreeSettings = {
                seed: this.randomSeedInput.value.toString(),
    
                life: 0,
    
                lineWidth: this.branchWidthInput.valueAsNumber,
                lineWidthDecrease: this.branchWidthDecreaseInput.valueAsNumber,
                
                growthAmount: this.growthLengthInput.valueAsNumber,
                wobbliness: this.wobbleInput.valueAsNumber,
                internodeLength: this.internodeLengthInput.valueAsNumber,
            
                branchDelay: this.branchDelayInput.valueAsNumber,
                abilityToBranch: this.branchAbilityInput.valueAsNumber,
                newBranchesTerminateSooner: 0,
                branchTermination: this.overallGrowthInput.valueAsNumber,
            }
    
    
            this.tree = new Tree({x: 400, y: 600}, treeSettings, this.gOb, this._scene);

        })

        this.gOb.setPostPipeline(pixel);
        let post = this.gOb.postPipelines[0] as PixelatedFX;
        post.setup(this.scale - 2, {NE: 0.1, SE: 0.1, SW: 0, NW: 0});

    }

    setupControls() {

        let gameDiv = document.getElementById("controls")

        let wobbleTitle = document.createElement("b");
        wobbleTitle.innerText = "wobble";
        this.wobbleInput = document.createElement("input");
        this.wobbleInput.type = "range";
        this.wobbleInput.min = "0";
        this.wobbleInput.max = "180";
        this.wobbleInput.value = "70";

        gameDiv.appendChild(wobbleTitle);
        gameDiv.appendChild(this.wobbleInput);


        let growthLengthTitle = document.createElement("b");
       growthLengthTitle.innerText = "growth length";
        this.growthLengthInput = document.createElement("input");
        this.growthLengthInput.type = "range";
        this.growthLengthInput.min = "0.00";
        this.growthLengthInput.max = "3.00";
        this.growthLengthInput.value = "1.00";
        this.growthLengthInput.step = "0.01";

        gameDiv.appendChild(growthLengthTitle);
        gameDiv.appendChild(this.growthLengthInput);

        let branchWidthTitle = document.createElement("b");
        branchWidthTitle.innerText = "branch width";
        this.branchWidthInput = document.createElement("input");
        this.branchWidthInput.type = "range";
        this.branchWidthInput.min = "3.00";
        this.branchWidthInput.max = "20.00";
        this.branchWidthInput.value = "4.00";
        this.branchWidthInput.step = "0.01";

        gameDiv.appendChild(branchWidthTitle);
        gameDiv.appendChild(this.branchWidthInput);




        let branchWidthDecreaseTitle = document.createElement("b");
        branchWidthDecreaseTitle.innerText = "branch width decrease";
        this.branchWidthDecreaseInput = document.createElement("input");
        this.branchWidthDecreaseInput.type = "range";
        this.branchWidthDecreaseInput.min = "0.900";
        this.branchWidthDecreaseInput.max = "0.999";
        this.branchWidthDecreaseInput.step = "0.001";
        this.branchWidthDecreaseInput.value = "0.980";

        gameDiv.appendChild(branchWidthDecreaseTitle);
        gameDiv.appendChild(this.branchWidthDecreaseInput);


        let branchAbilityTitle = document.createElement("b");
        branchAbilityTitle.innerText = "branch ability";
        this.branchAbilityInput = document.createElement("input");
        this.branchAbilityInput.type = "range";
        this.branchAbilityInput.min = "0";
        this.branchAbilityInput.max = "20";
        this.branchAbilityInput.value = "2";
        this.branchAbilityInput.step = "1";

        gameDiv.appendChild(branchAbilityTitle);
        gameDiv.appendChild(this.branchAbilityInput);


        let branchDelayTitle = document.createElement("b");
        branchDelayTitle.innerText = "branch delay";
        this.branchDelayInput = document.createElement("input");
        this.branchDelayInput.type = "range";
        this.branchDelayInput.min = "0";
        this.branchDelayInput.max = "150";
        this.branchDelayInput.value = "60";
        this.branchDelayInput.step = "1";

        gameDiv.appendChild(branchDelayTitle);
        gameDiv.appendChild(this.branchDelayInput);



        let internodeLengthTitle = document.createElement("b");
        internodeLengthTitle.innerText = "internode length";
        this.internodeLengthInput = document.createElement("input");
        this.internodeLengthInput.type = "range";
        this.internodeLengthInput.min = "3";
        this.internodeLengthInput.max = "50";
        this.internodeLengthInput.value = "5";
        this.internodeLengthInput.step = "1";

        gameDiv.appendChild(internodeLengthTitle);
        gameDiv.appendChild(this.internodeLengthInput);


        let overallGrowthTitle = document.createElement("b");
        overallGrowthTitle.innerText = "overall growth";
        this.overallGrowthInput = document.createElement("input");
        this.overallGrowthInput.type = "range";
        this.overallGrowthInput.min = "0";
        this.overallGrowthInput.max = "150";
        this.overallGrowthInput.value = "100";
        this.overallGrowthInput.step = "1";

        gameDiv.appendChild(overallGrowthTitle);
        gameDiv.appendChild(this.overallGrowthInput);


        let seedCheckboxTitle = document.createElement("b");
        seedCheckboxTitle.innerText = "set seed for randomness";
        this.randomSeedCheckbox = document.createElement("input");
        this.randomSeedCheckbox.type = "checkbox";
        this.randomSeedCheckbox.checked = false;


        gameDiv.appendChild(seedCheckboxTitle);
        gameDiv.appendChild(this.randomSeedCheckbox);

        let randomSeedTitle = document.createElement("b");
        randomSeedTitle.innerText = "seed for randomness";
        this.randomSeedInput = document.createElement("input");
        this.randomSeedInput.type = "range";
        this.randomSeedInput.min = "0.01";
        this.randomSeedInput.max = "1";
        this.randomSeedInput.value = "0.5";
        this.randomSeedInput.step = "0.01";

        gameDiv.appendChild(randomSeedTitle);
        gameDiv.appendChild(this.randomSeedInput);


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
            let branchColours = [0x816976, 0x4a3838];

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
            .setTint(0x413452) )
        
        this.leafClumps.push( this._scene.add.image(Math.round(bud.pos.x/this.scale) * this.scale, Math.round(bud.pos.y/this.scale) * this.scale, 'trees', TreeComponents.LeafComponents[choice].middle)
            .setScale(this.scale)
            .setTint(0x3b6e7f) )
        
        this.leafClumps.push( this._scene.add.image(Math.round(bud.pos.x/this.scale) * this.scale, Math.round(bud.pos.y/this.scale) * this.scale,  'trees', TreeComponents.LeafComponents[choice].top)
            .setScale(this.scale)
            .setTint(0x66ab8c) )
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
    branchTermination: number
}