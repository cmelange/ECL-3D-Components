import { JsonProperty, Serializable, serialize } from 'typescript-json-serializer';
import { Project } from './project';
import { OwnerHistory } from './owner_history';
import { Product } from './product';

export enum IfcSchema {
    IFC2X3 = 'IFC2X3',
    IFC4 = 'IFC4',
    IFC4x1 = 'IFC4X1'
}

@Serializable()
export class ProductIfcRequest
{
    @JsonProperty({ type: Project })
    public project: Project;

    @JsonProperty({ type: OwnerHistory })
    public owner: OwnerHistory;

    @JsonProperty({ type: Product })
    public product: Product;

    @JsonProperty()
    public schema: IfcSchema = IfcSchema.IFC2X3;

    public withProject(project: Project): ProductIfcRequest {
        this.project = project;
        return this;
    }

    public withOwner(owner: OwnerHistory): ProductIfcRequest {
        this.owner = owner;
        return this;
    }

    public withProduct(product: Product): ProductIfcRequest {
        this.product = product;
        return this;
    }

    public withSchema(schema: IfcSchema): ProductIfcRequest {
        this.schema = schema;
        return this;
    }

    public serialize(): any {
        return serialize(this);
    }

}