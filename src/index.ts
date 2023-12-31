import * as Phaser from "phaser";
import DevScene from "./development/devScene";
import PixelatedFX from "./development/pixelatedFX";


let phaserConfig: Phaser.Types.Core.GameConfig = {
    scale: {
        width: 500,
        height: 500,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: "game",
    backgroundColor: "#ffdddd",
    scene: [DevScene],
    pixelArt: true,
    // @ts-ignore
    pipeline: {'PixelatedFX': PixelatedFX},
}

new Phaser.Game(phaserConfig);