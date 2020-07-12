import React from "react";
import axios from "axios";
const boros = ["Manhattan", "Brooklyn", "Queens", "Bronx", "Staten Island"];
const status = ["Alive", "Stump", "Dead"];
const health = ["Good", "Fair", "Poor"];

class Filters extends React.Component {
  constructor() {
    super();
    this.state = {
      trees: []
    };
  }


  fetchData = async url => {
    await axios
      .get(url)
      .then(response => {
        const trees = response.data;
        this.setState({
          trees: trees
        });
      })
      .catch(error => {
        console.error("Error: ", error);
      });
  };

  render() {
    let snipPrpStr = str => {
      let prpstr = str.substring(str.indexOf("=") + 1);
      return prpstr;
    };

    //https://stackoverflow.com/questions/15125920/how-to-get-distinct-values-from-an-array-of-objects-in-javascript

    const borosSelect = boros.map((el, id) => {
      return (
        <option key={id} value={el}>
          {el}
        </option>
      );
    });

    const statusList = (
      <div>
        {status.map((el, id) => {
          return (
            <button
              key={id}
              onClick={()=>this.props.sttsClk}
              value={"&status=" + el}
              style={{
                backgroundColor:
                  snipPrpStr(this.props.status) === el ? "orange" : "white"
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
    );

    const healthList = (
      <div>
        {health.map((el, id) => {
          return (
            <button
              key={id}
              onClick={()=>this.props.hlthClk}
              value={"&health=" + el}
              style={{
                backgroundColor:
                  snipPrpStr(this.props.health) === el ? "orange" : "white"
              }}
            >
              {el}
            </button>
          );
        })}
      </div>
    );

    //make unique zipcode selects
    
    const zips = this.state.trees
      .map(item => item.zipcode)
      .filter((value, index, arr) => arr.indexOf(value) === index);

    zips.sort(function(a, b) {
      return a - b;
    });

    const zipsOpts = zips.map((el, id) => {
      return (
        <option key={id} value={el}>
          {el}
        </option>
      );
    });

    //make unique species selects
    const species = this.state.trees
      .map(item => item.spc_common)
      .filter((value, index, arr) => arr.indexOf(value) === index);

    species.sort();
    const speciesOpts = species.map((el, id) => {
      return (
        <option key={id} value={el}>
          {el}
        </option>
      );
    });

    ///render filter selects and buttons
    return (
      <div className="filters">
        <div className="boros">
          {<div className="select">
            <select
              onChange={this.props.boroClk}
              value={snipPrpStr(this.props.boroname)}
            >
              {borosSelect}
            </select>
            </div>
          }

          {<div className="select">
            <select
              onChange={this.props.zipChng}
              value={snipPrpStr(this.props.zipcode)}
            >
              <option value="">all zipcodes</option>

              {zipsOpts}
            </select>
            </div>
          }

          {<div className="select">
            <select
              onChange={this.props.speciesChng}
              value={snipPrpStr(this.props.spc_common)}
            >
              <option value="">all species</option>
              {speciesOpts}
            </select>
            </div>
          }
        </div>

        <div className="status">
         
          <div className="stslist">{statusList}</div>
          {this.props.status === "&status=Alive" ? healthList : null}
        </div>
      </div>
    );
  }
}

export default Filters;



