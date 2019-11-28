import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { ColorRGBa } from './color_rgba';

@Serializable()
export class Material
{
    @JsonProperty()
    public name: string;

    @JsonProperty({ type: ColorRGBa})
    public color: ColorRGBa;

    @JsonProperty()
    public metal: boolean;

    /**
     * roughness must be between 0.0 (smooth) and 1.0 rough
     */
    @JsonProperty()
    public roughness: number;

    public withName(name: string): Material {
        this.name = name;
        return this;
    }

    public withColor(color: ColorRGBa): Material {
        this.color = color;
        return this;
    }

    public isMetallic(metallic: boolean): Material {
        this.metal = metallic;
        return this;
    }

    public withRoughness(roughness: number): Material {
        this.roughness = roughness;
        return this;
    }
}