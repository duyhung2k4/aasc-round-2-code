import React, { Suspense } from "react";
import ProtectedLayout from "@/layout/protected";
import AppLayout from "@/layout/app";

import { ROUTER_APP } from "@/constants/router";
import { Route, Routes } from "react-router-dom";
import { PageContact, PageLogin, PageBank, PageRegister, PageAcceptCode, PageTokenCode, PageTokenCodePending } from "./page";



const AppRouter: React.FC = () => {
    return (
        <Suspense fallback={"Loading..."}>
            <Routes>
                <Route element={<ProtectedLayout />}>
                    <Route path={ROUTER_APP.LOGIN.href} element={<PageLogin />} />
                    <Route path={ROUTER_APP.REGISTER.href} element={<PageRegister />} />
                    <Route path={ROUTER_APP.ACCEPT_CODE.href} element={<PageAcceptCode />} />
                    <Route element={<AppLayout/>}>
                        <Route path={ROUTER_APP.HOME.href} element={<PageContact />} />
                        <Route path={ROUTER_APP.CONTACT.href} element={<PageContact />} />
                        <Route path={ROUTER_APP.BANK.href} element={<PageBank/>}/>
                    </Route>
                    <Route path={ROUTER_APP.TOKEN_CODE.href} element={<PageTokenCode/>} />
                    <Route path={ROUTER_APP.TOKEN_CODE_PENDING.href} element={<PageTokenCodePending/>} />
                </Route>
            </Routes>
        </Suspense>
    )
}

export default AppRouter;