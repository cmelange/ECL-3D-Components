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

    public withGivenName(givenName: string): Person {
        this.givenName = givenName;
        return this;
    }

    public withFamilyName(familyName: string): Person {
        this.familyName = familyName;
        return this;
    }

    public withIdentifier(identifier: string): Person {
        this.identifier = identifier;
        return this;
    }
}