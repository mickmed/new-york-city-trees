import React, { PureComponent } from "react";

class TreeInfo extends PureComponent {
  render() {
    console.log(this.props)
    const {info, treesData} = this.props
    

    return (
      <div className="popup">
        {/* <p>place: {info.address}</p>
        <p>longitude: {info.latitude}</p>
        <p>latitude: {info.longitude}</p> */}
        {/* <p>magnitude: {info.mag}</p> */}
        {/* <p>time: {new Date(info.time).toString()}</p> */}
        treesData.address
      </div>
    );
  }
}

export default TreeInfo;
