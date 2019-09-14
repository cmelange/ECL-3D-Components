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

    Image(image: Image): TextureMap
    {
        this.image = image;
        return this;
    }

    MagFilter(filterType: FilterType): TextureMap
    {
        this.magFilter = filterType;
        return this;
    }

    MinFilter(filterType: FilterType): TextureMap
    {
        this.minFilter = filterType;
        return this;
    }

    WrapS(wrapMethod: WrapMethod): TextureMap
    {
        this.wrapS = wrapMethod;
        return this;
    }

    WrapT(wrapMethod: WrapMethod): TextureMap
    {
        this.wrapT = wrapMethod;
        return this;
    }

    Offset(offset: [number, number]): TextureMap
    {
        this.offset = offset;
        return this;
    }

    Rotation(angle: number): TextureMap
    {
        this.rotation = angle;
        return this;
    }

    Scale(scale: [number, number]): TextureMap
    {
        this.scale = scale;
        return this;
    }
}