import {Matrix, Quaternion, Scalar, Vector3} from '@babylonjs/core';

const _matrix = Matrix.Zero()
const _quaternion = Quaternion.Zero()

export function quaternionToEuler( quaternion, order, euler) {
    if (euler === undefined) euler = Vector3.Zero()
    if (order === undefined) order = 'XYZ'
    quaternion.toRotationMatrix(_matrix)
    rotationMatrixToEuler(_matrix, euler, order);
    return euler
}

export function reorderEuler(oldEuler, oldOrder, newOrder, newEuler) {
    if (newEuler === undefined) newEuler = Vector3.Zero()
    eulerToQuaternion(oldEuler, oldOrder, _quaternion)
    quaternionToEuler(_quaternion, newOrder, newEuler);
    return newEuler
}

export function eulerToQuaternion(euler, order, quaternion) {
    if (quaternion === undefined) quaternion = Quaternion.Zero()
    if (order === undefined) order = 'XYZ'

    const c1 = Math.cos( euler.x / 2 );
    const c2 = Math.cos( euler.y / 2 );
    const c3 = Math.cos( euler.z / 2 );

    const s1 = Math.sin( euler.x / 2 );
    const s2 = Math.sin( euler.y / 2 );
    const s3 = Math.sin( euler.z / 2 );

    switch ( order ) {

        case 'XYZ':
            quaternion.x = s1 * c2 * c3 + c1 * s2 * s3;
            quaternion.y = c1 * s2 * c3 - s1 * c2 * s3;
            quaternion.z = c1 * c2 * s3 + s1 * s2 * c3;
            quaternion.w = c1 * c2 * c3 - s1 * s2 * s3;
            break;

        case 'YXZ':
            quaternion.x = s1 * c2 * c3 + c1 * s2 * s3;
            quaternion.y = c1 * s2 * c3 - s1 * c2 * s3;
            quaternion.z = c1 * c2 * s3 - s1 * s2 * c3;
            quaternion.w = c1 * c2 * c3 + s1 * s2 * s3;
            break;

        case 'ZXY':
            quaternion.x = s1 * c2 * c3 - c1 * s2 * s3;
            quaternion.y = c1 * s2 * c3 + s1 * c2 * s3;
            quaternion.z = c1 * c2 * s3 + s1 * s2 * c3;
            quaternion.w = c1 * c2 * c3 - s1 * s2 * s3;
            break;

        case 'ZYX':
            quaternion.x = s1 * c2 * c3 - c1 * s2 * s3;
            quaternion.y = c1 * s2 * c3 + s1 * c2 * s3;
            quaternion.z = c1 * c2 * s3 - s1 * s2 * c3;
            quaternion.w = c1 * c2 * c3 + s1 * s2 * s3;
            break;

        case 'YZX':
            quaternion.x = s1 * c2 * c3 + c1 * s2 * s3;
            quaternion.y = c1 * s2 * c3 + s1 * c2 * s3;
            quaternion.z = c1 * c2 * s3 - s1 * s2 * c3;
            quaternion.w = c1 * c2 * c3 - s1 * s2 * s3;
            break;

        case 'XZY':
            quaternion.x = s1 * c2 * c3 - c1 * s2 * s3;
            quaternion.y = c1 * s2 * c3 - s1 * c2 * s3;
            quaternion.z = c1 * c2 * s3 + s1 * s2 * c3;
            quaternion.w = c1 * c2 * c3 + s1 * s2 * s3;
            break;

        default:
            console.warn( 'eulerToQuaternion encountered an unknown order: ' + order );

    }
    return quaternion
}

export function rotationMatrixToEuler(matrix, euler, order) {
    if (euler === undefined) euler = Vector3.Zero()
    if (order === undefined) order = 'XYZ'

    // assumes the upper 3x3 of m is a pure rotation matrix (i.e, unscaled)
    const te = matrix.m
    const m11 = te[ 0 ], m12 = te[ 4 ], m13 = te[ 8 ];
    const m21 = te[ 1 ], m22 = te[ 5 ], m23 = te[ 9 ];
    const m31 = te[ 2 ], m32 = te[ 6 ], m33 = te[ 10 ];

    switch ( order ) {

        case 'XYZ':
            euler.y = Math.asin( Scalar.Clamp( m13, - 1, 1 ) );
            if ( Math.abs( m13 ) < 0.9999999 ) {
                euler.x = Math.atan2( - m23, m33 );
                euler.z = Math.atan2( - m12, m11 );
            } else {
                euler.x = Math.atan2( m32, m22 );
                euler.z = 0;
            }
            break;

        case 'YXZ':
            euler.x = Math.asin( - Scalar.Clamp( m23, - 1, 1 ) );
            if ( Math.abs( m23 ) < 0.9999999 ) {
                euler.y = Math.atan2( m13, m33 );
                euler.z = Math.atan2( m21, m22 );
            } else {
                euler.y = Math.atan2( - m31, m11 );
                euler.z = 0;
            }
            break;

        case 'ZXY':
            euler.x = Math.asin( Scalar.Clamp( m32, - 1, 1 ) );
            if ( Math.abs( m32 ) < 0.9999999 ) {
                euler.y = Math.atan2( - m31, m33 );
                euler.z = Math.atan2( - m12, m22 );
            } else {
                euler.y = 0;
                euler.z = Math.atan2( m21, m11 );
            }
            break;

        case 'ZYX':
            euler.y = Math.asin( - Scalar.Clamp( m31, - 1, 1 ) );
            if ( Math.abs( m31 ) < 0.9999999 ) {
                euler.x = Math.atan2( m32, m33 );
                euler.z = Math.atan2( m21, m11 );
            } else {
                euler.x = 0;
                euler.z = Math.atan2( - m12, m22 );
            }
            break;

        case 'YZX':
            euler.z = Math.asin( Scalar.Clamp( m21, - 1, 1 ) );
            if ( Math.abs( m21 ) < 0.9999999 ) {
                euler.x = Math.atan2( - m23, m22 );
                euler.y = Math.atan2( - m31, m11 );
            } else {
                euler.x = 0;
                euler.y = Math.atan2( m13, m33 );
            }
            break;

        case 'XZY':
            euler.z = Math.asin( - Scalar.Clamp( m12, - 1, 1 ) );
            if ( Math.abs( m12 ) < 0.9999999 ) {
                euler.x = Math.atan2( m32, m22 );
                euler.y = Math.atan2( m13, m11 );
            } else {
                euler.x = Math.atan2( - m23, m33 );
                euler.y = 0;
            }
            break;

        default:
            console.warn( 'rotationMatrixToEuler encountered an unknown order: ' + order );

    }
    return euler;
}

