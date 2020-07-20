
const capitalize = s => {
    if (typeof s !== "string") return ""
    return s.charAt(0).toUpperCase() + s.slice(1)
  }

  export default capitalize



  export const countSpecies = (treesData) =>{
    const spcCount = treesData.reduce(
      (acc, { spc_common: curr }) => {
        return (acc[curr] = acc[curr] + 1 || 1) && acc
      },
      {}
    )
    console.log(spcCount)
    let sorted = []
    for (let spc in spcCount) {
      sorted.push([capitalize(spc), spcCount[spc]])
    }
    sorted.sort(function(a, b) {
      return a[1] - b[1]
    })
    return sorted.reverse()

  }








      // await axios
      //   .get(
      //     `https://data.cityofnewyork.us/resource/5rq2-4hqu.json?` +
      //       `$limit=1000` +
      //       `&$order=address` +
      //       `&$where=` +
      //       `address%20like%20%27%25${srch.toUpperCase()}%25%27` +
      //       `or ` +
      //       `address%20like%20%27%25${srch.toLowerCase()}%25%27` +
      //       `or ` +
      //       `address%20like%20%27%25${this.capitalize(srch)}%25%27` +
      //       `or ` +
      //       `spc_latin%20like%20%27%25${srch.toUpperCase()}%25%27` +
      //       `or ` +
      //       `spc_latin%20like%20%27%25${srch.toLowerCase()}%25%27` +
      //       `or ` +
      //       `spc_latin%20like%20%27%25${this.capitalize(srch)}%25%27` +
      //       `or ` +
      //       `spc_common%20like%20%27%25${srch.toUpperCase()}%25%27` +
      //       `or ` +
      //       `spc_common%20like%20%27%25${srch.toLowerCase()}%25%27` +
      //       `or ` +
      //       `spc_common%20like%20%27%25${this.capitalize(srch)}%25%27` +
      //       `or ` +
      //       `zipcode%20like%20%27%25${srch.toUpperCase()}%25%27` +
      //       `or ` +
      //       `zipcode%20like%20%27%25${srch.toLowerCase()}%25%27` +
      //       `or ` +
      //       `zipcode%20like%20%27%25${this.capitalize(srch)}%25%27`
      //   )

       // getKeyByValue = (object, value) => {
  //   return Object.keys(object).find(key => object[key] === value)
  // }

  // getURL = srch => {
  //   const baseURL =
  //     `https://data.cityofnewyork.us/resource/5rq2-4hqu.json?` +
  //     `$limit=1000` +
  //     `&$order=address` +
  //     `&$where=`

  //   const params = ["address", "spc_latin", "spc_common", "zipcode"]
  //   let str = "", orTail
  //   let cases = params.forEach((e, i) => {
  //     if ((i === params.length - 1)) {
  //       orTail = ``
  //     } else {
  //       orTail = `or `
  //     }
  //     str +=
  //       `${e}%20like%20%27%25${srch.toUpperCase()}%25%27` +
  //       `or ` +
  //       `${e}%20like%20%27%25${srch.toLowerCase()}%25%27` +
  //       `or ` +
  //       `${e}%20like%20%27%25${capitalize(srch)}%25%27` +
  //        orTail
  //   })
 
  //   return baseURL + str
  // }


   // let params = ["address", "spc_latin"]

    // console.log(evt.target.value, evt.target.value.length);
    // evt &&
    //   (evt.target.value.length === 3 ||
    //     evt.target.value.length === 4 ||
    //     evt.target.value.length > 6) &&
    //   this.getData(evt.target.value)




      // this.handleScroll();
    // window.addEventListener('scroll', this.handleScroll)
//   }
  // handleScroll = () => {
  //   console.log("inside");
  //   // let headerHeight = document.getElementById("myHeader").offsetHeight
  //   const header = ReactDOM.findDOMNode(this).getElementsByClassName(
  //     "bigHeader"
  //   );
  //   const search = ReactDOM.findDOMNode(this).getElementsByClassName("search");
  //   // console.log("headerHeight", header.offsetHeight);
  //   // console.log('header', .6 * header[0].offsetHeight)
  //   // console.log("searchOffsetTop", search[0].offsetTop);

  //   console.log("windowScrollY", window.scrollY);

  //   if (window.scrollY < 0.5 * header[0].offsetHeight) {
  //     console.log("less than");
  //     this.setState({
  //       fixHeader: false
  //     });
  //   }
  //   if (window.scrollY > 0.5 * header[0].offsetHeight) {
  //     console.log("more than");
  //     this.setState({
  //       fixHeader: true,
  //       input: ""
  //     });
  //   }
  // };
  // capitalize = s => {
  //   if (typeof s !== "string") return ""
  //   return s.charAt(0).toUpperCase() + s.slice(1)
  // }
