import './tempCard.css'
import { formatDate } from '@/services/utils';
import { TempCardProps } from '@/interfaces/interfaces';


export default function TempCard({date, ...temperatures}: TempCardProps) {
  const { day, min, max, night, eve, morn } = temperatures;
  return (
    <div className="card">
      <div>             
        <div>
          <h3>{formatDate(date)}</h3>            
          <span>Temperature data</span>
        </div>
        <div>
          <p>Day: {day} Kº</p>
          <p>Min: {min} Kº</p>
          <p>Max: {max} Kº</p>
          <p>Night: {night} Kº</p>
          <p>Eve: {eve} Kº</p>
          <p>Morn: {morn} Kº</p>
        </div>
      </div>  
    </div>
  )
}