export function toRadians(angle: number): number
{
    return angle/180*Math.PI;
}

export function toDegrees(radian: number): number
{
    return radian/Math.PI*180;
}

export function rotationMatrix2D(rotation: number): number [][]
{
    let theta = toRadians(rotation);
    return [[Math.cos(theta), -Math.sin(theta)],
            [Math.sin(theta), Math.cos(theta)]];
}

/**
 * calculates the Euler intrinsic rotation matrix in the order XYZ (Tait-Bryan xy'z'')
 * @param rotation euler angles around X,Y and Z angles respectively
 */
export function rotationMatrix3D(rotation: number[]): number[][]
{
    let theta = [toRadians(rotation[0]), toRadians(rotation[1]), toRadians(rotation[2])];

    let c1 = Math.cos(theta[0]);
    let s1 = Math.sin(theta[0]);
    let c2 = Math.cos(theta[1]);
    let s2 = Math.sin(theta[1]);
    let c3 = Math.cos(theta[2]);
    let s3 = Math.sin(theta[2]);

    return [[c1*c2, c1*s2*s3-c3*s1, s1*s3 + c1*c3*s2],
            [c2*s1, c1*c3 + s1*s2*s3, c3*s1*s2 - c1*s3],
            [-s2, c2*s3, c2*c3]];
}
