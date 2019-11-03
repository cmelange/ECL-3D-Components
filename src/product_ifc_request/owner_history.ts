import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { Organization } from './organization';
import { Person } from './person';
import { Application } from './application';

@Serializable()
export class OwnerHistory
{
    @JsonProperty({ type: Person })
    public person: Person = new Person();

    @JsonProperty({ type: Organization })
    public organization: Organization = new Organization();

    @JsonProperty({ type: Application })
    public application: Application = new Application();
}