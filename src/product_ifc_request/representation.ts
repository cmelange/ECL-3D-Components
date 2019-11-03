import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { RepresentationItem } from './representation_item';

@Serializable()
export class Representation
{
    @JsonProperty({ type: RepresentationItem} )
    public representationItems: RepresentationItem[] = [];

    public addRepresentationItem(representationItem: RepresentationItem): Representation {
        this.representationItems.push(representationItem);
        return this;
    }

    public addRepresentationItems(representationItems: RepresentationItem[]): Representation {
        this.representationItems.concat(representationItems);
        return this;
    }
}