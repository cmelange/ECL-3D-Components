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

    public withName(name: string): Organization {
        this.name = name;
        return this;
    }

    public withDescription(description: string): Organization {
        this.description = description;
        return this;
    }

    public withIdentifier(identifier: string): Organization {
        this.identifier = identifier;
        return this;
    }
}