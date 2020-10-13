import React, {Fragment} from "react";
import dataMenu from 'dan-api/ui/menu';
import Sidebar from "../../../components/Sidebar";

export default function UserSidebar(){
    return(
        <Sidebar
            dataMenu={dataMenu}
            leftSidebar
        />
    )
}