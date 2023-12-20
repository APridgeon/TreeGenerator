import * as Phaser from "phaser";
import DevScene from "./development/devScene";


let phaserConfig: Phaser.Types.Core.GameConfig = {
    scale: {
        width: 400,
        height: 300,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: "game",
    backgroundColor: "#ff8888",
    scene: [DevScene]
}

new Phaser.Game(phaserConfig);