import { JsonProperty, Serializable} from 'typescript-json-serializer';

@Serializable()
export class RepresentationItem
{
    @JsonProperty()
    public constructionString: string = "";
}