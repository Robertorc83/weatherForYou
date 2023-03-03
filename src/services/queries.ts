import axios from "axios"

export async function getTemps(lat:number, lon:number) {
    try {
        const { data } = await axios.get(`https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=90ef3f93e7523720c21f472b55bd2004`)
        return data.daily
    } catch (error) {
        console.error(`Error fetching temperatures: ${error}`)
        return []
    }
}

export async function fetchCoordinates(query:string){
    try {
        if (query) {
            const { data } = await axios.get(`https://search.reservamos.mx/api/v2/places?q=${query}`) 
            return data
        }
        return { city: [] }
    } catch (error) {
        console.error(`Error fetching coordinates: ${error}`)
        return null
    }
} 