export class Image
{
    name: string;
    image: string;

    constructor(name: string = 'image')
    {
        this.name = name;
    }

    Name(name: string): Image
    {
        this.name = name;
        return this;
    }

    Image(uri: string): Image
    {
        this.image = uri;
        return this;
    }
}