import React from "react";

const defaultValues = {
    keys: [],
    buttons: [],
};

const ControlContext = React.createContext(defaultValues);

export default ControlContext;