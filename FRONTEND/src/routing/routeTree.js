import { createRootRoute } from "@tanstack/react-router"
import App from "../App"
import { authRoute } from "./auth.routes"
import { dashboardRoute } from "./dashboard"
import { homePageRoute } from "./homepage"

export const rootRoute = createRootRoute({
    component: App,
})

export const routeTree = rootRoute.addChildren([
    homePageRoute,
    authRoute,
    dashboardRoute,
])