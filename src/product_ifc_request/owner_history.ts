import { JsonProperty, Serializable} from 'typescript-json-serializer';
import { Organization } from './organization';
import { Person } from './person';
import { Application } from './application';

@Serializable()
export class OwnerHistory
{
    @JsonProperty()
    public person: Person = new Person();

    @JsonProperty()
    public organization: Organization = new Organization();

    @JsonProperty()
    public application: Application = new Application();
}