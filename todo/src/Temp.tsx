import { connect } from "react-redux";
import filterReducer from "./vanguard/redux/slices/filterSlice";
const Temp = (props: any) => {
  console.log(props);
  return <></>;
};
const mapStateToProps = (store: any, ownProps: any) => {
  console.log(store);
  return store.filter;
};
export default connect(mapStateToProps)(Temp);
