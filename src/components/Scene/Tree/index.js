
import { useGLTF } from '@react-three/drei';
import React from 'react';
import treeGLTF from '../../../assets/3d-models/tree.gltf';

const Tree = (props) => {
    const { nodes, materials } = useGLTF(treeGLTF, true);

    return (
        <mesh castShadow receiveShadow geometry={nodes.Tree_lp_11.geometry} {...props}  >
            <meshStandardMaterial
                color={0x00ff00}
                aoMap={materials.aoMap}
                normalMap={materials.normalMap}
                roughnessMap={materials.roughnessMap}
                metalnessMap={materials.metalnessMap}
                envMapIntensity={0.8}
            />
        </mesh>
    );
};

const Trees = ({ ...props }) => {
    const min = 2000;
    const max = 10000;
    const rand = () => {
        return Math.random() * (max - min) + min;
    };
    return (
        <group {...props} dispose={null} scale={0.0005} position={[0, -0.1, 0]} rotation={[Math.PI / 8, 0, 0]}>
            {
                Array.from({ length: 30 }, (_, i) => {
                    return (
                        <Tree key={i} position={[rand(), 0, rand()]} />
                    );
                })
            }
        </group>
    );
};

export default Trees;