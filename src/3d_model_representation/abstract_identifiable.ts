import { v4 as uuid } from 'uuid';

export abstract class AbstractIdentifiable {
    
    public get id(): string { return this._id };

    constructor() {
        this._id = uuid();
    }

    private _id: string;
}