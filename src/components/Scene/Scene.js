
import React from "react";
import Lights from './Lights';
import Stats from './Stats';
import Terrain from './Terrain';
// import Tree from './Tree';


const Scene = (props) => (
    <>
        <Lights />
        <Terrain {...props} />
        <Stats {...props} />;

        {/* <Tree position={[10, 0, 0]} /> */}
    </>
);

export default Scene;
