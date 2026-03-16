import React, { useState } from "react";
import { useEffect } from "react";
import Select from "react-select";

const MultiRouteCode = (props) => {
  // console.log(props.options , "multiroutecode");
  const [selectedCode, setSelectedCode] = useState([]);

  const handleChange = (selectedOptions) => {
    setSelectedCode(selectedOptions ,"setselected codes");
    console.log(selectedOptions , "selected opt")

    // if(selectedOptions.length<1){

    // }
    const selectedValues = selectedOptions.map((option) => option.value);
    console.log(selectedValues.toString());
    props.setSelectedRouteCodes(selectedValues.toString());

    props.selectedRouteCodeArr(selectedValues);
    // console.log(selectedValues)
  };

  useEffect(() => {
    if (!selectedCode) {
      const AllCodes = props.options.map((option) => option.value);
      // console.log(selectedValues.toString())
      console.log(AllCodes, "allCodes");
      props.setSelectedRouteCodes(AllCodes.toString());

      props.selectedRouteCodeArr(AllCodes);
    }
  }, [selectedCode]);

  return (
    <div>
      <Select
        isMulti
        value={selectedCode}
        onChange={handleChange}
        options={props.options}
        placeholder="Route Codes"
      />
    </div>
  );
};

export default MultiRouteCode;
