import React, { useEffect } from "react";
import './poup.css'

function PoUP(props){
    console.log(props.car)
    
    function setPoup(){
        props.sendpoup(false)
    }
    return(
        <>
            <div className="poup_main_cont">
                <div className="poup_card_cont">
                        <b id="go_back" onClick={()=>{setPoup()}}>X</b>
                        <h1>{props.car}</h1>
                        <p>Data not find in API</p>
                        <p>Data not find in API</p>
                        <p>Data not find in API</p>
                </div>

            </div>
        </>
    )
}

export default PoUP;