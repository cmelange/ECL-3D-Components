import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { Organization } from './organization';

@Serializable()
export class Application
{
    @JsonProperty()
    public name: string = '';

    @JsonProperty()
    public version: string = '';

    @JsonProperty()
    public identifier: string = '';

    @JsonProperty({ type: Organization })
    public organization: Organization = new Organization();

    public withName(name: string): Application {
        this.name = name;
        return this;
    }

    public withVersion(version: string): Application {
        this.version = version;
        return this;
    }

    public withIdentifier(identifier: string): Application {
        this.identifier = identifier;
        return this;
    }

    public withOrganization(organization: Organization): Application {
        this.organization = organization;
        return this;
    }
}