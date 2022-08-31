
import React from "react";
import Lights from './Lights';
import Stats from './Stats';
import Terrain from './Terrain';


const Scene = (props) => {

    return (<>
        <Lights />
        <Terrain {...props} />
        <Stats {...props} />;
    </>);
};

export default Scene;
