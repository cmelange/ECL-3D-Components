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

export function rotationMatrix3D(rotation: number[]): number[][]
{
    let theta = [toRadians(rotation[0]), toRadians(rotation[1]), toRadians(rotation[2])];

    let cosa = Math.cos(theta[0]);
    let sina = Math.sin(theta[0]);
    let cosb = Math.cos(theta[1]);
    let sinb = Math.sin(theta[1]);
    let cosc = Math.cos(theta[2]);
    let sinc = Math.sin(theta[2]);

    return [[cosb*cosc, -cosb*sinc, sinb],
            [sina*sinb*cosc + cosa*sinc, -sina*sinb*sinc + cosa*cosc, -sina*cosb],
            [-cosa*sinb*cosc + sina*sinc, cosa*sinb*sinc + sina*cosc, cosa*cosb]];
}
