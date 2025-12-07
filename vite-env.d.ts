declare module 'gifenc' {
  export class GIFEncoder {
    constructor();
    writeFrame(
      index: Uint8Array | Uint8ClampedArray | number[],
      width: number,
      height: number,
      options?: {
        palette?: number[][];
        delay?: number;
        transparent?: number;
        repeat?: number;
        dispose?: number;
      }
    ): void;
    finish(): void;
    bytes(): Uint8Array;
    stream(): ReadableStream;
  }

  export function quantize(
    rgba: Uint8Array | Uint8ClampedArray,
    maxColors: number,
    options?: {
      format?: 'rgb' | 'rgba' | 'rgb444' | 'rgba4444' | 'rgb565';
      onebit?: boolean;
      clearAlpha?: boolean;
      clearAlphaThreshold?: number;
      clearAlphaColor?: number;
    }
  ): number[][];

  export function applyPalette(
    rgba: Uint8Array | Uint8ClampedArray,
    palette: number[][],
    format?: 'rgb' | 'rgba' | 'rgb444' | 'rgba4444' | 'rgb565'
  ): Uint8Array;
}