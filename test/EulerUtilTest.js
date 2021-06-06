import assert from 'assert';
import sinon from 'sinon';
import chai from 'chai';
import {Axis, NullEngine, Quaternion, Space, TransformNode, Scene, Vector3} from '@babylonjs/core';
import {eulerToQuaternion, quaternionToEuler} from "../module.js";

const {expect} = chai;

describe('EulerUtilTest', function() {

    it('EulerUtilTest1', async function() {
        const inputQuat = new Quaternion(-0.346, 0.331, -0.110,0.871)
        const euler = quaternionToEuler(inputQuat, 'XYZ')

        expect(euler.x).to.be.closeTo(-0.775, 0.001)
        expect(euler.y).to.be.closeTo( 0.711, 0.001)
        expect(euler.z).to.be.closeTo( 0.049, 0.001)

        const quaternion = eulerToQuaternion(euler, 'XYZ')

        expect(quaternion.x).to.be.closeTo(inputQuat.x, 0.0001)
        expect(quaternion.y).to.be.closeTo(inputQuat.y, 0.0001)
        expect(quaternion.z).to.be.closeTo(inputQuat.z, 0.0001)
        expect(quaternion.w).to.be.closeTo(inputQuat.w, 0.0001)
    });

    it('EulerUtilTest2', async function() {
        const yaw = Math.random() * 2 * Math.PI;
        const pitch = Math.random() * 2 * Math.PI;
        const roll =  Math.random() * 2 * Math.PI;

        const engine = new NullEngine();
        const scene = new Scene(engine);
        const n = new TransformNode("n",scene);
        n.rotate(Axis.X, pitch, Space.GLOBAL);
        n.rotate(Axis.Y, yaw, Space.GLOBAL);
        n.rotate(Axis.Z, roll, Space.GLOBAL);

        const euler = new Vector3(pitch, yaw, roll)
        const quaternion = eulerToQuaternion(euler, 'XYZ')

        expect(quaternion.x).to.be.closeTo(n.rotationQuaternion.x, 0.0001)
        expect(quaternion.y).to.be.closeTo(n.rotationQuaternion.y, 0.0001)
        expect(quaternion.z).to.be.closeTo(n.rotationQuaternion.z, 0.0001)
        expect(quaternion.w).to.be.closeTo(n.rotationQuaternion.w, 0.0001)
    });
});