import * as Phaser from "phaser";
import DevScene from "./development/devScene";
import PixelatedFX from "./development/pixelatedFX";


let phaserConfig: Phaser.Types.Core.GameConfig = {
    scale: {
        width: 600,
        height: 600,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    parent: "game",
    backgroundColor: "#ffaaaa",
    scene: [DevScene],
    pixelArt: true,
    // @ts-ignore
    pipeline: {'PixelatedFX': PixelatedFX},
}

new Phaser.Game(phaserConfig);