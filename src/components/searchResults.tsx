import "./searchResults.css"
import { CityData } from "@/interfaces/interfaces"

interface SearchResultsProps {
    cities?: CityData[],
    autocomplete: string,
    setSearch: React.Dispatch<React.SetStateAction<string>>,
    setAutocomplete: React.Dispatch<React.SetStateAction<string>>
}

export default function SearchResults({cities, setSearch, setAutocomplete, autocomplete}: SearchResultsProps) {
    const handleAutocomplete = (display:string) => {
        setSearch(display)
        setAutocomplete("")
    }

    return (
        <>
            {cities &&  autocomplete && Array.isArray(cities) && <div className="search_containter_results">
                { cities?.map((city) => (
                    <input type="button" value={`${city.slug} Country: ${city.country}`} className='search_result' key={city.id} onClick={() => handleAutocomplete(city.slug)}/>
                ))}
            </div> }
        </>
    )
    }

  