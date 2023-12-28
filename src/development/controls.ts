import * as Phaser from "phaser";

export enum Effects {
    Wobble = 'Wobble',
    GrowthLength = 'Growth Length',
    BranchWidth = 'Branch Width',
    BranchWidthDecrease = 'Decrease in Branch Width',
    BranchAbility = 'Ability to Branch',
    BranchDelay = 'Branch Delay',
    SegmentLength = 'Length Between Branches',
    Age = 'Age',
    LeafColours = 'Leaf Colours',
    BranchColours = "Branch Colours"
}

export type LeafColours = {
    dark: string,
    middle: string,
    light: string
}

export type BranchColours = {
    dark: string,
    light: string
}


export default class InputControllers {

    controlParentDiv: HTMLDivElement;
    colours: HTMLDivElement;
    sliders: HTMLDivElement;
    effectsMap: Map<Effects, HTMLElement> = new Map();

    randomSeedInput: HTMLInputElement;
    randomSeedCheckbox: HTMLInputElement;

    constructor(){

        this.controlParentDiv = document.getElementById("controls") as HTMLDivElement;
        this.colours = document.createElement("div") as HTMLDivElement;
        this.colours.className = "sliders";
        this.sliders = document.createElement("div") as HTMLDivElement;
        this.sliders.className = 'sliders';
        this.controlParentDiv.appendChild(this.colours);
        this.controlParentDiv.appendChild(this.sliders);
        this.setupControls();
    }
 
    setupControls() {

        this.addSlider(Effects.Wobble, 0, 180, 70, 1);
        this.addSlider(Effects.GrowthLength, 0.00, 3.00, 1.00, 0.01);
        this.addSlider(Effects.BranchWidth, 3.00, 20.00, 4.00, 0.01);
        this.addSlider(Effects.BranchWidthDecrease, 0.900, 0.999, 0.98, 0.001);
        (this.effectsMap.get(Effects.BranchWidthDecrease) as HTMLInputElement).value = '0.980';
        this.addSlider(Effects.BranchAbility, 0, 20, 2, 1);
        this.addSlider(Effects.BranchDelay, 0, 150, 60, 1);
        this.addSlider(Effects.SegmentLength, 3, 50, 5, 1);
        this.addSlider(Effects.Age, 0, 200, 120, 1);

        let defaultLeafColours: LeafColours = {
            dark: '#413452',
            middle: '#3b6e7f',
            light: '#66ab8c'
        }

        this.addLeafColourChoices(Effects.LeafColours, defaultLeafColours);

        let defaultBranchColours: BranchColours = {
            dark: '#816976',
            light: '#4a3838'
        }

        this.addBranchColourChoices(Effects.BranchColours, defaultBranchColours);

        let parentCheckbox = document.createElement('div');
        parentCheckbox.style.display = "flex";
        parentCheckbox.style.flexFlow = "column nowrap";

        let seedCheckboxTitle = document.createElement("b");
        seedCheckboxTitle.innerText = "Set Seed for Randomness";
        this.randomSeedCheckbox = document.createElement("input");
        this.randomSeedCheckbox.type = "checkbox";
        this.randomSeedCheckbox.checked = false;

        parentCheckbox.appendChild(seedCheckboxTitle);
        parentCheckbox.appendChild(this.randomSeedCheckbox);


        let parentSlider = document.createElement('div');
        parentSlider.style.display = "flex";
        parentSlider.style.flexFlow = "column nowrap";

        let randomSeedTitle = document.createElement("b");
        randomSeedTitle.innerText = "Seed for Randomness";
        this.randomSeedInput = document.createElement("input");
        this.randomSeedInput.type = "range";
        this.randomSeedInput.min = "0.01";
        this.randomSeedInput.max = "1";
        this.randomSeedInput.value = "0.5";
        this.randomSeedInput.step = "0.01";
        this.randomSeedInput.style.margin = '30px';
        this.randomSeedInput.style.marginBottom = '5px';
        this.randomSeedInput.style.marginTop = '0px';

        parentSlider.appendChild(randomSeedTitle);
        parentSlider.appendChild(this.randomSeedInput);

        let parent = document.createElement('div');
        parent.appendChild(parentCheckbox);
        parent.appendChild(parentSlider);
        parent.style.margin = '25px'

        this.controlParentDiv.appendChild(parent);

    }

    addSlider(effect: Effects, min: number, max: number, auto: number, step: number){

        let parent = document.createElement("div");
        parent.style.display = "flex";
        parent.style.flexFlow = "column nowrap";

        let titleElement = document.createElement("b");
        titleElement.innerText = effect.toString();

        let inputElement = document.createElement("input");
        inputElement.type = "range";
        inputElement.min = min.toString();
        inputElement.max = max.toString();
        inputElement.value = auto.toString();
        inputElement.step = step.toString();

        inputElement.style.margin = '30px';
        inputElement.style.marginBottom = '5px';
        inputElement.style.marginTop = '0px';


        parent.appendChild(titleElement);
        parent.appendChild(inputElement);
        parent.style.margin = '5px'

        this.sliders.appendChild(parent);

        this.effectsMap.set(effect, inputElement);
    }

    addLeafColourChoices(effect: Effects, colourDefault: LeafColours){
        let parent = document.createElement("div");
        parent.style.display = "flex";
        parent.style.flexFlow = "column nowrap";

        let colourParent = document.createElement("div");
        colourParent.style.display = "flex";
        colourParent.style.flexFlow = "row nowrap";
        colourParent.style.margin = '5px';

        let titleElement = document.createElement("b");
        titleElement.innerText = effect.toString();

        let darkColorChoice = document.createElement("input");
        darkColorChoice.type = "color";
        darkColorChoice.value = colourDefault.dark; 
        darkColorChoice.id = "dark"

        let middleColorChoice = document.createElement("input");
        middleColorChoice.type = "color";
        middleColorChoice.value = colourDefault.middle; 
        middleColorChoice.id = "middle"

        let lightColorChoice = document.createElement("input");
        lightColorChoice.type = "color";
        lightColorChoice.value = colourDefault.light; 
        lightColorChoice.id = "light"

        colourParent.appendChild(darkColorChoice);
        colourParent.appendChild(middleColorChoice);
        colourParent.appendChild(lightColorChoice);

        parent.appendChild(titleElement);
        parent.appendChild(colourParent);
        parent.style.margin = '5px'

        this.colours.appendChild(parent);

        this.effectsMap.set(effect, colourParent);
    }

    addBranchColourChoices(effect: Effects, colourDefault: BranchColours){
        let parent = document.createElement("div");
        parent.style.display = "flex";
        parent.style.flexFlow = "column nowrap";

        let colourParent = document.createElement("div");
        colourParent.style.display = "flex";
        colourParent.style.flexFlow = "row nowrap";
        colourParent.style.margin = '5px';

        let titleElement = document.createElement("b");
        titleElement.innerText = effect.toString();

        let darkColorChoice = document.createElement("input");
        darkColorChoice.type = "color";
        darkColorChoice.value = colourDefault.dark; 
        darkColorChoice.id = "dark"

        let lightColorChoice = document.createElement("input");
        lightColorChoice.type = "color";
        lightColorChoice.value = colourDefault.light; 
        lightColorChoice.id = "light"

        colourParent.appendChild(darkColorChoice);
        colourParent.appendChild(lightColorChoice);

        parent.appendChild(titleElement);
        parent.appendChild(colourParent);
        parent.style.margin = '5px'

        this.colours.appendChild(parent);

        this.effectsMap.set(effect, colourParent);
    }


}