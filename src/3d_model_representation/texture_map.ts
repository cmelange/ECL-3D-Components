import { Image } from "./image";
import { Texture } from "three";

export enum FilterType {
    NEAREST = 9728,
    LINEAR = 9729
}

export enum WrapMethod {
    CLAMP_TO_EDGE = 33071,
    MIRRORED_REPEAT = 33648,
    REPEAT = 10497
}

export class TextureMap 
{
    image: Image;

    magFilter: FilterType;
    minFilter: FilterType;
    wrapS: WrapMethod;
    wrapT: WrapMethod;

    offset: [number, number];
    rotation: number;
    scale: [number, number];

    WithImage(image: Image): TextureMap
    {
        this.image = image;
        return this;
    }

    withMagFilter(filterType: FilterType): TextureMap
    {
        this.magFilter = filterType;
        return this;
    }

    withMinFilter(filterType: FilterType): TextureMap
    {
        this.minFilter = filterType;
        return this;
    }

    withWrapS(wrapMethod: WrapMethod): TextureMap
    {
        this.wrapS = wrapMethod;
        return this;
    }

    withWrapT(wrapMethod: WrapMethod): TextureMap
    {
        this.wrapT = wrapMethod;
        return this;
    }

    withOffset(offset: [number, number]): TextureMap
    {
        this.offset = offset;
        return this;
    }

    withRotation(angle: number): TextureMap
    {
        this.rotation = angle;
        return this;
    }

    withScale(scale: [number, number]): TextureMap
    {
        this.scale = scale;
        return this;
    }
}