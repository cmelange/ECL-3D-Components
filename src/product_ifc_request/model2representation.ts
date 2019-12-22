import { Representation } from "./representation";
import { RepresentationItem } from "./representation_item";
import { Group, Vector3D, Quaternion } from "../3d_model_representation";
import { Transformation } from "./transformation";
import { Material } from "./material";
import { ColorRGBa } from "./color_rgba";

export function group2Representation(group: Group): Representation {
    let representation = new Representation();
    var materials: Material[] = [];
    representation.addRepresentationItems(group2RepresentationItems(group,
                                                                    new Vector3D(0,0,0),
                                                                    new Quaternion().setFromEuler([0,0,0]),
                                                                    1,
                                                                    materials))
                  .addMaterials(materials);    
    return representation;
}

function group2RepresentationItems(group: Group,
                                   translation: Vector3D,
                                   rotation: Quaternion,
                                   scale: number,
                                   materials: Material[]): RepresentationItem[]
{
    let items : RepresentationItem[] = [];
    let newTranslation: Vector3D = group.translation.copy()
                                                    .multiply(scale)
                                                    .rotateByQuaternion(rotation)
                                                    .translate(translation);
    let newRotation = rotation.multiply(new Quaternion().setFromEuler(group.rotation));
    let newScale = scale*group.scale[0];
    let transformation: Transformation =
        new Transformation().withRotation([newRotation.w,
                                           newRotation.x,
                                           newRotation.y,
                                           newRotation.z])
                            .withTranslation([newTranslation.vector[0],
                                              newTranslation.vector[1],
                                              newTranslation.vector[2]])
                            .withScale(newScale);
    for(let i=0; i<group.meshes.length; ++i) {
        if (group.meshes[i].material !== undefined) {
            let materialId = group.meshes[i].material.id;
            let modelMaterial = group.meshes[i].material;
            if (materials.find(material => material.id === materialId) === undefined) {
                materials.push(new Material().withId(materialId)
                                             .withName(modelMaterial.name)
                                             .withColor(new ColorRGBa(modelMaterial.baseColor[0],
                                                                      modelMaterial.baseColor[1],
                                                                      modelMaterial.baseColor[2],
                                                                      modelMaterial.baseColor[3]))
                                             .isMetallic(modelMaterial.metallic > 0.5)
                                             .withRoughness(modelMaterial.roughness))
            }
        }
        items.push( 
            new RepresentationItem().withConstructionString(group.meshes[i].geometry.constructionString)
                                    .withTransformation(transformation)
                                    .withMaterial(group.meshes[i].material.id));
    }

    for(let i=0; i<group.children.length; ++i) {
        items = items.concat(group2RepresentationItems(group.children[i],
                                                       newTranslation,
                                                       newRotation,
                                                       newScale,
                                                       materials));
    }
    return items;
}