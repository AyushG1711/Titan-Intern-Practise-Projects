import * as React from "react";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

const CheckboxLabels: React.FC<{
  options: { label: string; key: string }[];
  onSelect: Function;
  onUnselect?: Function;
  state: string[];
  colors: {
    low?: string;
    medium?: string;
    high?: string;
    backlog?: string;
    progress?: string;
    completed?: string;
  };
}> = (props) => {
  const handler = (e: any, key: string) => {
    if (e.target.checked) {
      props.onSelect(key);
    } else if (typeof props.onUnselect === "function") {
      props.onUnselect(key);
    }
  };
  return (
    <FormGroup>
      {props.options.map(({ label, key }) => {
        const isChecked = props.state.includes(key);
        const isKey = key in props.colors;
        return (
          <FormControlLabel
            key={key}
            className={key}
            control={
              <Checkbox
                onChange={(e: any) => {
                  handler(e, key);
                }}
                checked={props.state.includes(key)}
              />
            }
            label={label}
          />
        );
      })}
    </FormGroup>
  );
};
export default CheckboxLabels;
