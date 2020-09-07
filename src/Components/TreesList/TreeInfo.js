import React, { PureComponent } from "react";
import { capitalizeAll }  from '../Helpers/Shared.js'
import './TreeInfo.scss'
class TreeInfo extends PureComponent {
  render() {
    const {info} = this.props
    return (
      <div className="popup">
        <p>{capitalizeAll(info.spc_common)}</p>
        <p>{info.address}</p>
        <p>{info.zip_city}</p>
        <p> Status: {info.status}</p>
        <p> Health: {info.health}</p>
      </div>
    );
  }
}
export default TreeInfo;
