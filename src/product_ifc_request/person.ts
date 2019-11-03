import { JsonProperty, Serializable} from 'typescript-json-serializer';

@Serializable()
export class Person
{
    @JsonProperty()
    public givenName: string = '';

    @JsonProperty()
    public familyName: string = '';

    @JsonProperty()
    public identifier: string = '';
}