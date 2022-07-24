import { extend, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
extend({ OrbitControls });


const Controls = () => {
    // boolean state variable to enable/disable the orbit controls
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

    const onSaveImage = () => {
        const strMime = "image/png";
        const imgData = domElement.toDataURL(strMime);
        saveFile(imgData.replace(strMime, strDownloadMime), "screenshot.png");
    };
    useEffect(() => {
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
            enableZoom={true}
            enableRotate={true}
            enablePan={false}
            maxAzimuthAngle={Math.PI / 4}
            maxPolarAngle={Math.PI}
            minAzimuthAngle={-Math.PI / 4}
            minPolarAngle={0}
            mouseButtons={
                {
                    LEFT: '',
                    MIDDLE: THREE.MOUSE.ROTATE,
                    RIGHT: '',
                }
            }
            panSpeed={0.05}
        />
    );

};

export default Controls;
