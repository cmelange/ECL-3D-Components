import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { RepresentationItem } from './representation_item';

@Serializable()
export class Representation
{
    @JsonProperty()
    public representationItems: RepresentationItem[] = [];
}