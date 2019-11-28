import { JsonProperty, Serializable} from 'typescript-json-serializer';

@Serializable()
/**
 * Color components are defined as a ratio between 0.0 and 1.0
 */
export class ColorRGBa
{
    @JsonProperty()
    public red: number;

    @JsonProperty()
    public green: number;

    @JsonProperty()
    public blue: number;

    @JsonProperty()
    public alpha: number;

    constructor(red: number, green: number, blue: number, alpha: number) {
        this.red = red;
        this.green = green;
        this.blue = blue;
        this.alpha = alpha;
    }
}