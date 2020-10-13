import {Box} from "@material-ui/core";
import React from "react";


export default function InfoTitle({icon,title}){
    return(
        <Box display={"flex"} alignItems={"center"} style={{marginBottom:'25px'}}>
            <img src={icon} alt="Icon"/>
            <h6 style={{fontSize:'15px',fontWeight:'bold',margin:'0 0 0 14px'}}>
                {title}
            </h6>
        </Box>
    )
}