import React from "react";

const Tree = props => {
  return (
    <div>
      <div className="tree">
        <p>
          <strong>{props.trees.address}&nbsp;&nbsp;</strong>
        </p>
        <p>{props.trees.nta_name}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>

        <p>
          {props.trees.spc_common}&nbsp;&nbsp;
        </p>
        
      </div>
      <hr />
    </div>
  );
};

export default Tree;
