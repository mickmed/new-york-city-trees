export const countSpecies = (treesData) => {
  const spcCount = treesData.reduce((acc, { spc_common: curr }) => {
    return (acc[curr] = acc[curr] + 1 || 1) && acc
  }, {})
			
  let sorted = []
  for (let spc in spcCount) {
    sorted.push([capitalize(spc), spcCount[spc]])
  }
  sorted.sort(function(a, b) {
    return a[1] - b[1]
  })
  return sorted.reverse()
}

export const capitalize = (s) => {
  if (typeof s !== "string") return ""
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export const capitalizeAll = (str) => {
  if (str.includes(" ")) {
			
    let x = str.split(" ")
    let z = x.map((y) => {
      y.charAt(0).toUpperCase()
      return y.charAt(0).toUpperCase() + y.slice(1)
    })
    return z.join(" ")
  }
}
