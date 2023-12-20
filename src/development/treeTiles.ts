export enum FrameType {
    Branch,
    Leaf
}


export type LeafFrames = {
    top: number,
    middle: number,
    bottom: number,
}

export type BranchFrames = {
    shadow: number,
    main: number,
}

const ROWLENGTH = 6;


export default class TreeComponents {

    static LeafComponents: LeafFrames[] = [
        // {top: (ROWLENGTH * 3) + 3, middle: (ROWLENGTH * 3) + 2, bottom: (ROWLENGTH * 3) + 1},
        // {top: (ROWLENGTH * 4) + 3, middle: (ROWLENGTH * 4) + 2, bottom: (ROWLENGTH * 4) + 1},
        // {top: (ROWLENGTH * 5) + 3, middle: (ROWLENGTH * 5) + 2, bottom: (ROWLENGTH * 5) + 1},
        // {top: (ROWLENGTH * 6) + 3, middle: (ROWLENGTH * 6) + 2, bottom: (ROWLENGTH * 6) + 1},
        // {top: (ROWLENGTH * 7) + 3, middle: (ROWLENGTH * 7) + 2, bottom: (ROWLENGTH * 7) + 1},
        {top: (ROWLENGTH * 8) + 3, middle: (ROWLENGTH * 8) + 2, bottom: (ROWLENGTH * 8) + 1},
        {top: (ROWLENGTH * 9) + 3, middle: (ROWLENGTH * 9) + 2, bottom: (ROWLENGTH * 9) + 1},
        // {top: (ROWLENGTH * 10) + 3, middle: (ROWLENGTH * 10) + 2, bottom: (ROWLENGTH * 10) + 1}

    ];

    static BranchComponents: BranchFrames[] = [
        {shadow: (ROWLENGTH * 0) + 1, main: (ROWLENGTH * 0) + 2},
        {shadow: (ROWLENGTH * 1) + 1, main: (ROWLENGTH * 1) + 2},
        {shadow: (ROWLENGTH * 0) + 4, main: (ROWLENGTH * 0) + 5},
        {shadow: (ROWLENGTH * 1) + 4, main: (ROWLENGTH * 1) + 5},
    ]

    static pixelRes = 16;

}