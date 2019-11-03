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

    @JsonProperty()
    public representations: Representation[] = [];
}