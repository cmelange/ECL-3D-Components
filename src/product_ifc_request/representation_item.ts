import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { Transformation } from './transformation';

@Serializable()
export class RepresentationItem
{
    @JsonProperty()
    public constructionString: string = "";

    @JsonProperty()
    public material: string;

    @JsonProperty({ type: Transformation })
    public transformation: Transformation;

    public withConstructionString(constructionString: string): RepresentationItem {
        this.constructionString = constructionString;
        return this;
    }

    public withMaterial(material: string): RepresentationItem {
        this.material = material;
        return this;
    }

    public withTransformation(transformation: Transformation): RepresentationItem {
        this.transformation = transformation;
        return this;
    }
}