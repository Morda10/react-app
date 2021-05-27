import moment from 'moment'
import React, { useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import CalendarStyling from './CalendarStyling'



export const CalendarShedule = ({today,date,onChange}) => {
    // const today = new Date(moment().format('YYYY-MM-DD'))
    const todayMomentObj = moment()
    const twoWeeksLater = new Date(todayMomentObj.add(14, 'd').format('YYYY-MM-DD'))
    // const [date, setDate] = useState(today)

    // const onChange = (value) =>{
    //     setDate(value)
    // }

    return (
        <div >
            
            <CalendarStyling  
                onChange={onChange}
                value={date}
                minDate={today}
                maxDate={twoWeeksLater}
                
            />
        </div>
    )
}
