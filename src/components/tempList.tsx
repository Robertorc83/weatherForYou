import './tempList.css'
import TempCard from "./tempCard"
import { Temp } from "@/interfaces/interfaces"

interface TempsListProps {
  temps : Temp[] | undefined,
  isLoading: boolean
}

export default function TempList({temps, isLoading}: TempsListProps) {
  return (
    <div className="container__temps">
      {!temps && !isLoading && <div>Enter a city to start comparing temperatures</div> }
      {temps && temps?.map((temp) => (
          <TempCard 
            key={temp.dt}
            date={temp.dt}
            day={temp.temp.day} 
            min={temp.temp.min} 
            max={temp.temp.max} 
            night={temp.temp.night} 
            eve={temp.temp.eve} 
            morn={temp.temp.morn}
          />
        ))}
    </div>
  )
}

