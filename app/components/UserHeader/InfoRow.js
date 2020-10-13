import {Box, Button, makeStyles} from "@material-ui/core";
import React, {useState} from "react";
import VisibilityOffOutlinedIcon from '@material-ui/icons/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';

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


export default function InfoRow({left,right,color,textDecoration,last,smaller,password}){
    const styles = useStyles()
    const [showPass,setShowPass] = useState(false);
    return(
        <Box display={"flex"} justifyContent={"space-between"}>
            <span className={styles.infoLeftText}>{left}:</span>
            <span className={styles.infoRIghtText}
                  style={{color: color ? color : '#E12363',
                      textDecoration:textDecoration?textDecoration:'none',
                      width:last?'65%':smaller?'25%':'45%',fontSize:password&&right.length>5?'12px':'auto'}}>

                {!password?right:(
                  <Box display={"flex"} alignItems={'center'}>
                    <Box display={"flex"}>

                        {!showPass?right.split('').map(()=>(
                            <Box style={{width:'5px',height:'5px',backgroundColor:'#000',borderRadius:'50%',marginRight:'4px'}}/>
                        )):right}
                    </Box>
                        <Button style={{minWidth:'unset',marginLeft:'7px'}} onClick={()=>setShowPass(!showPass)}>
                            {showPass?<VisibilityOutlinedIcon style={{color:'rgb(225, 35, 99)',width:'15px'}}/>:<VisibilityOffOutlinedIcon style={{width:'15px',color:'#828282'}}/>}
                        </Button>
                  </Box>
                )}</span>
        </Box>
    )
}