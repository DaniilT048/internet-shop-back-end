import HeaderMenu from "./HeaderMenu.tsx";
import {Outlet} from "react-router";
import type {ReactElement} from "react";


const Layout = (): ReactElement =>{

    return (
        <>
            <div>
                <HeaderMenu/>
                <div>
                    <Outlet/>
                </div>
            </div>
        </>

    )


}

export default Layout;