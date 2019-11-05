import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { Representation } from './representation';

export enum ProductType {
    Proxy = "PROXY"
}

@Serializable()
export class Product
{
    @JsonProperty()
    public type: ProductType = ProductType.Proxy;

    @JsonProperty()
    public name: string = '';

    @JsonProperty()
    public description: string = '';

    @JsonProperty({ type: Representation })
    public representations: Representation[] = [];

    public withType(type: ProductType): Product {
        this.type = type;
        return this;
    }

    public withName(name: string): Product {
        this.name = name;
        return this;
    }

    public withDescription(description: string): Product {
        this.description = description;
        return this;
    }

    public addRepresentation(representation: Representation): Product {
        this.representations.push(representation);
        return this;
    }

    public addRepresentations(representations: Representation[]): Product {
        this.representations = this.representations.concat(representations);
        return this;
    }
}