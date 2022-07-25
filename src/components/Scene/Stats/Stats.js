import { Stats } from '@react-three/drei';
import React from "react";
import './Stats.css';

const Statis = (props) => (
    <>
        {
            props.showStats &&
            <Stats showPanel={0} className="stats" {...props} />
        }
    </>
);

export default Statis;
