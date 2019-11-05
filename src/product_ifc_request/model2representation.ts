import { Representation } from "./representation";
import { RepresentationItem } from "./representation_item";
import { Group } from "../3d_model_representation";
import { Vector3D } from "../3d_model_representation";
import { Transformation } from "./transformation";

export function group2Representation(group: Group): Representation {
    let representation = new Representation();
    representation.addRepresentationItems(group2RepresentationItems(group,
                                                                    new Vector3D(0,0,0),
                                                                    [0,0,0],
                                                                    1));    
    return representation;
}

function group2RepresentationItems(group: Group,
                                   translation: Vector3D,
                                   rotation: number[],
                                   scale: number): RepresentationItem[]
{
    let items : RepresentationItem[] = [];
    let newTranslation: Vector3D = group.translation.copy()
                                                    .rotate(rotation)  
                                                    .translate(translation);
    let newRotation = [rotation[0] + group.rotation[0],
                       rotation[1] + group.rotation[1],
                       rotation[2] + group.rotation[2]];
    let newScale = scale*group.scale[0];
    let transformation: Transformation =
        new Transformation().withRotation(newRotation)
                            .withTranslation([newTranslation.vector[0],
                                              newTranslation.vector[1],
                                              newTranslation.vector[2]])
                            .withScale(newScale);
    for(let i=0; i<group.meshes.length; ++i) {
        items.push( 
            new RepresentationItem().withConstructionString(group.meshes[i].geometry.constructionString)
                                    .withTransformation(transformation));
    }

    for(let i=0; i<group.children.length; ++i) {
        items = items.concat(group2RepresentationItems(group.children[i],
                                                       newTranslation,
                                                       newRotation,
                                                       newScale));
    }
    return items;
}