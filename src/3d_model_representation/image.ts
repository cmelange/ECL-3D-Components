export class Image
{
    name: string;
    image: string;

    constructor(name: string = 'image')
    {
        this.name = name;
    }

    withName(name: string): Image
    {
        this.name = name;
        return this;
    }

    withImage(uri: string): Image
    {
        this.image = uri;
        return this;
    }
}