
import React from "react";
import Lights from './Lights';
import Terrain from './Terrain';
import Tree from './Tree';


const Scene = () => {

    return (
        <>
            <Lights />
            <Terrain />
            <Tree position={[10, 0, 0]} />
        </>
    );
};

export default Scene;
