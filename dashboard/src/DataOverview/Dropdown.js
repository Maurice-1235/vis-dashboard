import { useState } from "react";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import React from "react";
export function Dropdown({table,tableHandler}) {
  const [value, setValue] = useState(table);
  return (
    // <Stack>
    <>
      <TextField
        onChange={(newValue) => setValue(newValue.target.value)}
        id="filled-1"
        label="Table"
        variant="outlined"
        value={value}
        // fontfamily=
        sx={{width:140,ml:"30%"}}
        size="small"
      />
      <Button sx={{width:10,height:20,fontSize:10,mt:"5%"}}variant="outlined" onClick={()=>{tableHandler(value)}}>Generate</Button>
      </>
  );
}