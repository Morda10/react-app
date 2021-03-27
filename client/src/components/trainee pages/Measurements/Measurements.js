import { Box, Typography } from '@material-ui/core';
import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { Measurement } from './Measurement';
import {setMeasurements} from '../../../redux/reducers/UserReducer'



export const Measurements = () => {
    // const dispatch = useDispatch()
    const user = useSelector((state) => state.user);
    const measurementsChached = useSelector((state) => state.measurements);
    const dispatch = useDispatch()
    const [measurements, setMeasurementsArr] = useState([])

    const fetchMeasurements = async () => {
      try {
        const userID = user.user.id
        const res = await Axios.get(`/api/measurements/getAllMeasurementsByID/${userID}`)
        console.log(res.data)
        setMeasurementsArr(res.data.measurements)
        dispatch(setMeasurements({measurements : res.data.measurements}))       
      } catch (e) {
          console.log(e)
      }
    }

    useEffect(() => {
       if(measurementsChached.length > 0){
           console.log("Chached")
           setMeasurementsArr(measurementsChached)
           return
       }    
       try {
           fetchMeasurements()
          
       } catch (e) {
           console.log(e)
       }
       
    }, [])

    return (
        <div>
         <Typography align="center" variant="h4" style={{margin : "2rem"}}><b>Measurements</b></Typography>
         <Measurement measurements={measurements}/> 
        
        </div>
    )
}

