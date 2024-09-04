import React, { createContext, useEffect, useState } from "react";
import Navbar from "./navbar";
import classes from "./styles.module.css";
import Cookies from "js-cookie";

import { useOutlet } from "react-router-dom";
import { TOKEN_TYPE } from "@/models/variable";
import { useListContactQuery } from "@/redux/api/contact";
import { useListRequisiteQuery } from "@/redux/api/requisite";
import { Button } from "react-bootstrap";
import ModalLogout from "./navbar/components/modal/index.logout";



const AppLayout: React.FC = () => {
    const outlet = useOutlet();

    const [modalLogout, setModalLogout] = useState<boolean>(false);

    const {
        refetch: refetchContact,
        isLoading: loadingContact,
    } = useListContactQuery(Cookies.get(TOKEN_TYPE.ACCESS_TOKEN) || "");
    const {
        refetch: refetchRequisite,
        isLoading: loadingRequisite,
    } = useListRequisiteQuery(Cookies.get(TOKEN_TYPE.ACCESS_TOKEN) || "");

    useEffect(() => {
        refetchContact();
        refetchRequisite();
    }, []);

    return (
        <AppLayoutContext.Provider
            value={{
                loadingContact,
                loadingRequisite,
                refetchContact,
                refetchRequisite,
            }}
        >
            <div className={classes.root}>
                <div className={classes.navbar}>
                    <div>
                        <div className={classes.title}>AASC ROUND 2</div>
                        <Navbar />
                    </div>

                    <div className={classes.footer}>
                        <Button 
                            variant="secondary" 
                            style={{ width: "100%" }}
                            onClick={() => setModalLogout(true)}
                        >Đăng xuất</Button>
                    </div>
                </div>
                <div className={classes.content}>
                    {outlet}
                </div>
            </div>

            <ModalLogout
                status={modalLogout}
                setStatus={setModalLogout}
            />
        </AppLayoutContext.Provider>
    )
}

export type TypeAppLayoutContext = {
    loadingContact: boolean
    loadingRequisite: boolean
    refetchContact: () => void
    refetchRequisite: () => void
}

export const AppLayoutContext = createContext<TypeAppLayoutContext>({
    loadingContact: false,
    loadingRequisite: false,
    refetchContact: () => { },
    refetchRequisite: () => { },
})

export default AppLayout;