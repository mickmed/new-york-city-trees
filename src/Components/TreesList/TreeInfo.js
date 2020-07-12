import React, { PureComponent } from "react";

class TreeInfo extends PureComponent {
  render() {
    console.log(this.props)
    const {info} = this.props
    

    return (
      <div className="popup">
        <p>{info.spc_common}</p>

        <p>{info.address}</p>
        <p>{info.zip_city}</p>

    
      </div>
    );
  }
}

export default TreeInfo;
