
    
    componentDidMount(){

        let key = process.env.REACT_APP_PLANT_API_TOKEN
        let response;
        const randomIndex = Math.floor(Math.random() * 30 - 1)
        const randomPage = Math.floor(Math.random() * 4906 - 1)
        const random = await axios.get(`https://cors-anywhere.herokuapp.com/https://trefle.io/api/plants/?token=${key}&page=${randomPage}`)
        
        random.
        
        const link = random.data[randomIndex].link


        const randomPlant = async () => {
            response = await axios.get('https://cors-anywhere.herokuapp.com/'+link+`?token=${key}`)
            if (response.data.images.length === 0 && response.data.common_name === null) {
                return randomPlant();
            }
            return response
        }
        response = randomPlant();
            this.setState({
        featurePlant: response.data
        })
    }
   
