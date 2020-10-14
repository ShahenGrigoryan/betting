import React from 'react'
import {Box, Typography} from "@material-ui/core";


export default function UserPdf(props){

    return(
        <Box padding={"80px 3.56% 0px 10%;"}>
        <Box width={"100%"} margin={"auto"} style={{background: "#FFFFFF",
            boxShadow: '0px 4px 20px rgba(60, 209, 132, 0.2)',
            borderRadius: '35px',padding:'40px 50px 82px'}}>
            <Box style={{marginBottom:'20px'}}>
                <Typography variant={"h4"} style={{fontWeight:'600',fontSize:'30px',marginBottom:'5px'}} >Вилочный Бот Betting Co</Typography>
                <Typography variant={"h7"} style={{fontSize:'15px'}}>Инструкция по запуску  и установке</Typography>
            </Box>

            <iframe width={'100%'} zoom={"scale"} height={"1000px"} src={"http://download.bettingco.ru/public/Betting%20Co.%20%D0%B8%D0%BD%D1%81%D1%82%D1%80%D1%83%D0%BA%D1%86%D0%B8%D1%8F%2009.20.pdf#view=fit"}></iframe>
        </Box>
        </Box>
    )
}
