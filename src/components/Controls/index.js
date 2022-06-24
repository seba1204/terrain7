import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });


const Controls = () => {
    // boolean state variable to enable/disable the orbit controls
    const [enabled, setEnabled] = useState(false);
    const {
        camera,
        gl: { domElement }
    } = useThree();
    const controls = useRef();
    useFrame(() => controls.current.update());
    const strDownloadMime = "image/octet-stream";
    const saveFile = (strData, filename) => {
        const link = document.createElement('a');
        if (typeof link.download === 'string') {
            document.body.appendChild(link); //Firefox requires the link to be in the body
            link.download = filename;
            link.href = strData;
            link.click();
            document.body.removeChild(link); //remove the link when done
        } else {
            location.replace(uri);
        }
    };

    const onSaveImage = (e) => {
        const strMime = "image/png";
        const imgData = domElement.toDataURL(strMime);
        console.log("🚀 ~ file: index.js ~ line 75 ~ window.addEventListener ~ imgData", e);
        console.log(domElement);
        saveFile(imgData.replace(strMime, strDownloadMime), "test.png");
    };
    useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (e.key === "r") {
                // change enabled variable
                setEnabled(true);
            }
        });
        window.addEventListener("keyup", (e) => {
            if (e.key === "r") {
                // change enabled variable
                setEnabled(false);
            }
        });
        window.addEventListener("keypress", (e) => {
            if (e.key === "k") {
                onSaveImage(e);
            }
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
        <orbitControls
            ref={controls}
            args={[camera, domElement]}
            enableZoom={false}
            enableRotate={enabled}
            enablePan={enabled}
            maxAzimuthAngle={Math.PI / 4}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Math.PI / 4}
            minPolarAngle={0}
        />
    );

};

export default Controls;
