import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { Transformation } from './transformation';

@Serializable()
export class RepresentationItem
{
    @JsonProperty()
    public constructionString: string = "";

    @JsonProperty({ type: Transformation })
    public transformation: Transformation;

    public withConstructionString(constructionString: string): RepresentationItem {
        this.constructionString = constructionString;
        return this;
    }

    public withTransformation(transformation: Transformation): RepresentationItem {
        this.transformation = transformation;
        return this;
    }
}