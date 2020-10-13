import {Box, makeStyles} from "@material-ui/core";
import React from "react";

const useStyles = makeStyles(
    {
        infoLeftText:{
            fontSize:'15px',
        },
        infoRIghtText:{
            fontSize:'15px',
            fontWeight:'bold',
            width:'45%'
        }
    }
)


export default function InfoRow({left,right,color,textDecoration,last,smaller}){
    const styles = useStyles()
    return(
        <Box display={"flex"} justifyContent={"space-between"}>
            <span className={styles.infoLeftText}>{left}:</span>
            <span className={styles.infoRIghtText}
                  style={{color: color ? color : '#E12363',
                      textDecoration:textDecoration?textDecoration:'none',
                      width:last?'65%':smaller?'25%':'45%'}}>{right}</span>
        </Box>
    )
}