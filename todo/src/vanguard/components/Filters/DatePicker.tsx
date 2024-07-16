import * as React from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DueDate } from "../../../shared/types/filter";
import dayjs from "dayjs";

const MyDatePicker: React.FC<{
  value: DueDate;
  setDateHandler: Function;
  clearDateHandler: Function;
}> = (props) => {
  const onChangeHandler = (value: any) => {
    if (value) {
      const date = value.format("DD");
      const month = value.format("MM");
      const year = value.format("YYYY");
      props.setDateHandler(date, month, year);
    } else {
      props.clearDateHandler();
    }
  };
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={
          props.value
            ? dayjs(
                props.value.year +
                  "-" +
                  props.value.month +
                  "-" +
                  props.value.date
              )
            : null
        }
        onChange={(val) => {
          onChangeHandler(val);
        }}
        slotProps={{ actionBar: { actions: ["clear", "cancel", "accept"] } }}
      />
    </LocalizationProvider>
  );
};
export default MyDatePicker;
