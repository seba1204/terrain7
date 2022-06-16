
import { useGLTF } from '@react-three/drei';
import React from 'react';
// import { useFBX } from '@react-three/drei';
import treeGLTF from '../../../assets/3d-models/tree.gltf';
// import treeFBX from '../../assets/3d-models/tree.fbx';

const Tree = (props) => {

    // const fbx = useFBX(tree);
    const { nodes, materials } = useGLTF(treeGLTF, true);

    return (
        <group {...props} dispose={null} scale={0.002}>
            <mesh castShadow receiveShadow geometry={nodes.Tree_lp_11.geometry}>
                <meshStandardMaterial
                    color={0x00ff00}
                    aoMap={materials.aoMap}
                    normalMap={materials.normalMap}
                    roughnessMap={materials.roughnessMap}
                    metalnessMap={materials.metalnessMap}
                    envMapIntensity={0.8}
                />
            </mesh>
        </group>
    );
};

export default Tree;