import { JsonProperty, Serializable} from 'typescript-json-serializer';

@Serializable()
export class Project
{
    @JsonProperty()
    public name: string = '';

    @JsonProperty()
    public description: string = '';
}