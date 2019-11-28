import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { RepresentationItem } from './representation_item';
import { Material } from './material';

@Serializable()
export class Representation
{
    @JsonProperty({ type: RepresentationItem} )
    public representationItems: RepresentationItem[] = [];

    @JsonProperty({ type: Material} )
    public materials: Material[] = [];

    public addRepresentationItem(representationItem: RepresentationItem): Representation {
        this.representationItems.push(representationItem);
        return this;
    }

    public addRepresentationItems(representationItems: RepresentationItem[]): Representation {
        this.representationItems = this.representationItems.concat(representationItems);
        return this;
    }

    public addMaterial(material: Material): Representation {
        this.materials.push(material);
        return this;
    }

    public addMaterials(materials: Material[]): Representation {
        this.materials = this.materials.concat(materials);
        return this;
    }

}