import {Vector2D} from './vector2d';
import { Shape } from './shape';

export interface Curve2D {

    calcPath(): Vector2D[];

    translate(vector: Vector2D): Curve2D;

    rotate(rotation: number): Curve2D;

    copy(): Curve2D;

    shape(): Shape;

    generateConstructionString(): string;
}