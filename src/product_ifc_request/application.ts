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

    @JsonProperty()
    public organization: Organization = new Organization();
}