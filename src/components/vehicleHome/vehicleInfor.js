import React, { useEffect, useState } from 'react'
import PoUP from '../InforPopUP/poup';
import './vehicalInfor.css'
const url = "https://vpic.nhtsa.dot.gov/api/vehicles/getallmanufacturers?format=json"

function VehicalHomePage(){
    const [vehical_data, set_vehicalData] = useState([]);
    let [stored_data, setstoreData] = useState([]);
    let [isPoup, setPoupenabled] = useState(false)
    async function getData(){
        await fetch(url).then((res)=>res.json())
                        .then((res)=>{
                            let result = res.Results;
                            let res_data = [];
                            result.map((val,i)=>{
                                let dataObj= {
                                    country:val.Country,
                                    name:val.Mfr_CommonName,
                                    mfrName:val.Mfr_Name

                                }
                                let vehicle_typ = val.VehicleTypes.filter((v,idx)=>{
                                    if(v.IsPrimary === true){
                                        return dataObj.vtype = v.Name
                                    }
                                })
                                
                               return  res_data.push(dataObj);
                            })
                            set_vehicalData(res_data);
                            setstoreData(res_data);
                            
                        })
                        .catch((e)=>console.log(e));
    }
    useEffect(()=>{
        getData()
    },[])
    
    function searchdata(e){
        if(!e){
            set_vehicalData(stored_data);
        }
        else{
            let arr = [];
        for(let i = 0; i < stored_data.length; i++){
            if(e === stored_data[i].name){
                arr.push(stored_data[i])
            }
        }
        set_vehicalData(arr)
        }
        
    }
    function filterValueWt(e){
        console.log(e)
        if(e === "All"){
            console.log(e,stored_data)
            let arr = stored_data
            set_vehicalData(arr)
        }
        let arr = [];
        for(let i = 0; i < stored_data.length; i++){
            if(e === stored_data[i].vtype){
                arr.push(stored_data[i])
            }
        }
        set_vehicalData(arr)
    }
    const [car ,setCar] = useState("")
    function poupenabled(getCar){
        setPoupenabled(true)
        setCar(getCar)
        console.log(isPoup,setPoupenabled(true))

    }
    return(
        <>
        <div className='main_cont'>
        
            {isPoup?<PoUP sendpoup={setPoupenabled()} carName={car}/>:""}
            <div id='heading'>
                <h1>VEHICLE MANUFACTURERS</h1>
            </div>
            <div className='card_cont'>
                <div>
                    <label htmlFor='search' >Search</label>
                    <input type='search' id='search' onBlur={(e)=>{searchdata(e.target.value)}}/>
                </div>
                <div>
                    <label htmlFor='select' >Filter By Vehical Type</label>
                    <select id='select' onChange={(e)=>{filterValueWt(e.target.value)}} >
                        <option>All</option>
                        <option>Passenger Car</option>
                        <option>Truck</option>
                        <option>Multipurpose Passenger Vehical (MPV)</option>
                        <option>Motorcycle</option>
                        <option>Trailer</option>
                        <option>Low Speed Vehical (LSV)</option>
                        <option>Off Road Vehical</option>
                        <option>Bus</option>
                        <option>Incomplete Vehical</option>
                    </select>
                </div>
            </div>
            <div className='table_cont'>
                <table id='tabledata'>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Country</td>
                            <td>Type</td>
                        </tr>
                    </thead>
                    <tbody>
                        {vehical_data?.map((value,i)=>{
                            if(value.vtype){
                                return(
                                    <tr key={i} onClick={(i)=>{poupenabled(value.mfrName)}}>
                                    <td>{value.name}</td>
                                    <td>{value.country}</td>
                                    <td>{value.vtype}</td>
                                </tr>
                                  )

                            }

                          
                        })}
                    </tbody>
                </table>
            </div>
        </div>
        </>
    )
}

export default VehicalHomePage;