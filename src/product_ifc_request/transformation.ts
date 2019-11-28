import { JsonProperty, Serializable} from 'typescript-json-serializer';

export class Transformation
{
    @JsonProperty()
    public translation: number[] = [0,0,0];

    @JsonProperty()
    public rotation: number[] = [0,0,0];

    @JsonProperty()
    public scale: number = 1;

    public withTranslation(translation: number[]): Transformation {
        this.translation = translation;
        return this;
    }

    /**
     * Set the rotation component of the transformation
     * @param rotation rotation in Quaternion format [w x y z]
     */
    public withRotation(rotation: number[]): Transformation {
        this.rotation = rotation;
        return this;
    }

    public withScale(scale: number): Transformation {
        this.scale = scale;
        return this;
    }
}