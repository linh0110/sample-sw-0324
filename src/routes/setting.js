import { lazy } from "react";

const getPage = (path, other = null) => lazy(() => import(`../pages/${path}`).then(module => ({ default: module[other || path] })));

export {
    getPage
}