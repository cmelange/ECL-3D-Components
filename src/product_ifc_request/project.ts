import { JsonProperty, Serializable} from 'typescript-json-serializer';

@Serializable()
export class Project
{
    @JsonProperty()
    public name: string = '';

    @JsonProperty()
    public description: string = '';

    public withName(name: string): Project {
        this.name = name;
        return this;
    }

    public withDescription(description: string): Project {
        this.description = description;
        return this;
    }
}