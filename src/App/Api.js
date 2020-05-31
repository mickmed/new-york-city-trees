import capitalize from "./Shared"
// import data from '../ManhattanData.js'

const TOKEN = process.env.REACT_APP_TOKEN







const baseURL =
  `https://data.cityofnewyork.us/resource/5rq2-4hqu.json?` +
  `$$app_token=${TOKEN}` +
  `&$limit=30000` +
  `&$order=address` +
  `&$where=`
  


  export const getManhattan = () => {
    const manhattan = `boroname%20like%20%27%25Manhattan%25%27` 
    console.log(baseURL + manhattan)
    return baseURL + manhattan
  }  



let address = ''



const spaceFiller = (srch) => {
  let srchArr = srch.split('')
  srchArr.forEach((e, i) => {
    if (e === ' ') {
      // console.log(srch.charAt(i + 1))
      srchArr[i] = `%20`
    }
  })
  address = srchArr.join('')
  // console.log(address)
  return (address)
}

export const getAddress = (srch) => {
  const params = ["address", "zipcode", "nta_name"]
  let address = srch.includes(' ') ? spaceFiller(srch) : srch

  // console.log(address)
  let str = "",
    orTail
  let cases = params.forEach((e, i) => {
    if (i === params.length - 1) {
      orTail = ``
    } else {
      orTail = `or${"%20"}`
    }
    if (e === "address") {

      str += `${e}%20like%20%27%25${address.toUpperCase()}%25%27` + orTail
    } else if (e === "nta_name") {
      str += `${e}%20like%20%27%25${capitalize(address)}%25%27` + orTail
    } else if (e === "zipcode") {
      str += `${e}%20like%20%27%25${address}%25%27` + orTail
    }
  })
  console.log(baseURL + str)
  return baseURL + str
}

export const getBySpecies = (spc, srch) => {

  let address = srch.includes(' ') ? spaceFiller(srch) : srch
  let spec = ''
  if (spc.includes(' ')) {
    let x = spc.substr(0, spc.indexOf(' '))
    let y = spc.substr(spc.indexOf(' ') + 1)
    spec = x + '%20' + y
  } else {
    spec = spc
  }

  const str =
    `(%20spc_common%20like%20%27%25${spec.toLowerCase()}%25%27or%20spc_common%20like%20%27%25${spec}%25%27)and(%20zipcode%20like%20%27%25${address}%25%27or%20address%20like%20%27%25${address}%25%27or%20nta_name%20like%20%27%25${capitalize(address)}%25%27)`
  console.log(baseURL + str)
  return baseURL + str
}

// boroClk = (e) => {
//   let boroname = "&boroname=" + e.target.value
//   this.setState({ boroname: boroname })

//   let str =
//     boroname + this.state.spc_common + this.state.status + this.state.health
//   this.fetchData(TREES_URL, str)
// }

// zipChng = (e) => {
//   //chk for empty zip
//   let zip
//   e.target.value === "" ? (zip = "") : (zip = "&zipcode=" + e.target.value)
//   this.setState({ zipcode: "&zipcode=" + e.target.value })

//   //chk for empty species
//   let spec
//   this.state.spc_common === "" ? (spec = "") : (spec = this.state.spc_common)
//   this.setState({ zipcode: "&zipcode=" + e.target.value })

//   //set url parameters
//   let str =
//     this.state.boroname + zip + spec + this.state.status + this.state.health
//   this.fetchData(TREES_URL, str)
// }

// speciesChng = (e) => {
//   //chk for empty species
//   let specs
//   e.target.value === ""
//     ? (specs = "")
//     : (specs = "&spc_common=" + e.target.value)

//   //chk for empty zip
//   let zips
//   this.state.zipcode === "" ? (zips = "") : (zips = this.state.zipcode)
//   this.setState({ spc_common: "&spc_common=" + e.target.value })

//   //set url parameters
//   let str =
//     this.state.boroname + zips + specs + this.state.status + this.state.health
//   this.fetchData(TREES_URL, str)
// }

// sttsClk = (e) => {
//   this.setState({ status: e.target.value })
//   let str =
//     this.state.boroname +
//     this.state.zipcode +
//     this.state.spc_common +
//     e.target.value
//   this.fetchData(TREES_URL, str)
// }

// hlthClk = (e) => {
//   this.setState({ health: e.target.value })
//   let str =
//     this.state.boroname +
//     this.state.zipcode +
//     this.state.spc_common +
//     this.state.status +
//     e.target.value
//   this.fetchData(TREES_URL, str)
// }

// function checkForWinner() {
//   let shot = document.querySelectorAll(`.duck`);
//   for (let i = 0; i < shot.length; i++) {
//     shot[i].addEventListener(`click`, function (event) {
//       event.target.classList.add(`shot`);
//       setTimeout(() => {
//         event.target.remove();
//       }, 100);
//       if (shot.length === 0) {
//         alert("You Win!");
//       t} );
//   }
//   // if (shot.length === 0) {
//   //   alert("You Win!");
//   // }
// }
// checkForWinner();
