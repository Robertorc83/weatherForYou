import "./searchBar.css"
import TempList from "./tempList"
import { useQuery } from "react-query"
import SearchResults from "./searchResults"
import useDebounce from "@/hooks/useDebounce"
import { SetStateAction, useState } from "react"
import { CityData, Temp } from "@/interfaces/interfaces"
import { fetchCoordinates, getTemps } from "@/services/queries"

export default function Searchbar() {
  const [search, setSearch] = useState<string>('new york')
  const [autocomplete, setAutocomplete] = useState<string>('')
  const debouncedSearchTerm = useDebounce(search, 200)

  const CITY_QUERY_KEY = "city";
  const TEMPS_QUERY_KEY = "temps";

  // Use query to fetch city data based on search term
  const { data: cities, isError: isErr, error: err } = useQuery<CityData[], Error>({
    queryKey: [CITY_QUERY_KEY, debouncedSearchTerm],
    queryFn: () => fetchCoordinates(debouncedSearchTerm)
  })
  
  // Extract latitude and longitude from city data
  const cityLat = cities?.[0]?.lat
  const cityLon = cities?.[0]?.long

  // Use query to fetch temperature data based on latitude and longitude
  const { data: temps, isLoading, isError, error} = useQuery<Temp[], Error>(
    [TEMPS_QUERY_KEY, cityLat, cityLon],
    () => getTemps(cityLat || 0, cityLon || 0),
    { enabled: !!cityLat && !!cityLon }
  )

  const handleSearch = (value: SetStateAction<string>) =>{
    setAutocomplete(value)
    setSearch(value)
  }

  return (
    <div>
      <div className="form__group field">
        <label htmlFor="city" className="form__label">
          Enter a city to see temperature forecast in the next 7 days
        </label>
        <input  
          className="form__field" 
          type="text" 
          value={search}
          name='city'
          onChange={(e) => handleSearch(e.target.value)} 
        />
      </div>
      <SearchResults 
        cities={cities} 
        setAutocomplete={setAutocomplete} 
        setSearch={setSearch} 
        autocomplete={autocomplete} 
      />
      <div>
        { search && !temps && <div>Sorry there is no data for this city :(</div> }
        { isLoading && <div>Loading...</div> }
        { isError && <div>Error! {error.message}</div> }
        { isErr && <div>Error! {err.message}</div> }
        { !isError && !isLoading && temps && <h3>This is the temperature forecast for: {cities && cities[0]?.slug}</h3> }
        <TempList temps={temps} isLoading={isLoading}/>
      </div>
    </div>
  )
}

