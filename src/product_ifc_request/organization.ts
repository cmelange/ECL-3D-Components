import { JsonProperty, Serializable} from 'typescript-json-serializer';

@Serializable()
export class Organization
{
    @JsonProperty()
    public name: string = '';

    @JsonProperty()
    public description: string = '';

    @JsonProperty()
    public identifier: string = '';
}