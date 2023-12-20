import * as Phaser from 'phaser';



const fragShader = `
    #define SHADER_NAME PIXELATE_FS'
    precision mediump float;
    uniform sampler2D uMainSampler;
    uniform vec2 resolution;
    uniform float amount;
    uniform float SW ;
    uniform float SE ;
    uniform float NE ;
    uniform float NW ;
    varying vec2 outTexCoord;
    void main ()
    {
        float pixelSize = floor(2.0 + amount);
        vec2 center = pixelSize * floor(outTexCoord * resolution / pixelSize) + pixelSize * vec2(0.5, 0.5);
        vec2 corner1 = center + pixelSize * vec2(-0.5, -0.5);
        vec2 corner2 = center + pixelSize * vec2(+0.5, -0.5);
        vec2 corner3 = center + pixelSize * vec2(+0.5, +0.5);
        vec2 corner4 = center + pixelSize * vec2(-0.5, +0.5);
        vec4 pixel = 1.0 * texture2D(uMainSampler, center / resolution);
        pixel += SW * texture2D(uMainSampler, corner1 / resolution);
        pixel += SE * texture2D(uMainSampler, corner2 / resolution);
        pixel += NE * texture2D(uMainSampler, corner3 / resolution);
        pixel += NW * texture2D(uMainSampler, corner4 / resolution);

        gl_FragColor = pixel;
    }
`;


export default class PixelatedFX extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline
{

    amount: number = 4;
    shadows: {NE: number, SE: number, SW: number, NW: number} = {NE: 0.2, SE: 0, SW: 0, NW: 0};

    constructor (game)
    {
        super({
            game,
            renderTarget: true,
            fragShader,
            /* @ts-ignore */
            uniforms: [
                'uProjectionMatrix',
                'uMainSampler',
                'resolution',
                'amount'
            ]
        });
    }

    onBoot ()
    {
        this.set2f('resolution', this.renderer.width, this.renderer.height);
    }

    onPreRender ()
    {
        this.set1f('amount', this.amount);
        this.set1f('NE', this.shadows.NE);
        this.set1f('SE', this.shadows.SE);
        this.set1f('SW', this.shadows.SW);
        this.set1f('NW', this.shadows.NW);
    }

    public setup (amount: number, shadows: {NE: number, SE: number, SW: number, NW: number}){
        this.amount = amount;
        this.shadows = {
            NE: shadows.NE,
            SE: shadows.SE,
            SW: shadows.SW,
            NW: shadows.NW
        }
    }
}