import {useEffect} from "react";
import { Layout, Menu} from "antd";
const {Sider, Content}=Layout


const SettingsContent=()=>{

const handleMenuClick=()=>{


}
    return (
        <Menu mode="inline"
        onClick={handleMenuClick}
        items={[
            {key:"account", label:"My account"},
            {key:"style", label:"style model"}


        ]
        }
        />


    )

}
export default SettingsContent