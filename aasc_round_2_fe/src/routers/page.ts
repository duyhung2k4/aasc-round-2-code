import { lazy } from "react";

export const PageLogin = lazy(() => import("@/pages/login"));
export const PageRegister = lazy(() => import("@/pages/register"));
export const PageAcceptCode = lazy(() => import("@/pages/accept_code"));
export const PageContact = lazy(() => import("@/pages/contacts"));
export const PageBank = lazy(() => import("@/pages/bank"));
export const PageTokenCode = lazy(() => import("@/pages/token_code"));
export const PageTokenCodePending = lazy(() => import("@/pages/token_code_pending"));