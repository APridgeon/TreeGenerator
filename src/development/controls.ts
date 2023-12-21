export default class InputControllers {


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

    constructor(){
        this.setupControls();


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