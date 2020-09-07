import { capitalize } from "../Helpers/Shared"
const TOKEN = process.env.REACT_APP_TOKEN
const baseURL =
  `https://data.cityofnewyork.us/resource/5rq2-4hqu.json?` +
  `$$app_token=${TOKEN}` +
  `&$limit=30000` +
  `&$order=address` +
  `&$where=`
export const getManhattan = () => {
  const manhattan = `boroname%20like%20%27%25Manhattan%25%27`
  return baseURL + manhattan
}
let address = ""
const spaceFiller = (srch) => {
  let srchArr = srch.split("")
  srchArr.forEach((e, i) => {
    if (e === " ") {
      srchArr[i] = `%20`
    }
  })
  address = srchArr.join("")
  return address
}
export const getAddress = (srch) => {
  const params = ["address", "zipcode", "nta_name"]
  let address = srch.includes(" ") ? spaceFiller(srch) : srch
  let str = "",
    orTail
  params.forEach((e, i) => {
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
  return baseURL + str
}
export const getBySpecies = (spc, srch) => {
  let address = srch.includes(" ") ? spaceFiller(srch) : srch
  let spec = ""
  if (spc.includes(" ")) {
    let x = spc.substr(0, spc.indexOf(" "))
    let y = spc.substr(spc.indexOf(" ") + 1)
    spec = x + "%20" + y
  } else {
    spec = spc
  }
  const str = `(%20spc_common%20like%20%27%25${spec.toLowerCase()}%25%27or%20spc_common%20like%20%27%25${spec}%25%27)and(%20zipcode%20like%20%27%25${address}%25%27or%20address%20like%20%27%25${address}%25%27or%20nta_name%20like%20%27%25${capitalize(
    address
  )}%25%27or%20address%20like%20%27%25${address.toUpperCase()}%25%27)`
  return baseURL + str
}
