const ROUTE_PARAMETER_REGEXP = /:(\w+)/g
const URL_FRAGMENT_REGEXP = '([^\\/]+)'
const TICKTIME = 250;

const extractUrlParams = (route, windowHash) => {
    const params = {}

    if (route.params.length === 0) {
        return params
    }

    const matches = windowHash
        .match(route.testRegExp)

    matches.shift()

    matches.forEach((paramValue, index) => {
        const paramName = route.params[index]
        params[paramName] = paramValue
    })

    return params
}


export default () => {
    const routes = [];
    let notFound = () => { };
    let lastPathname;

    const router = {};

    const checkRoutes = () => {
        const { pathname } = window.location;

        if(lastPathname === pathname) {
            return;
        }

        lastPathname = pathname;


        const currentRoute = routes.find(route => {
            const { testRegExp } = route
            return testRegExp.test(pathname)
        })

        if (!currentRoute) {
            notFound()
            return
        }

        const urlParams = extractUrlParams(currentRoute, pathname);
        currentRoute.component(urlParams);
    }

    router.addRoute = (fragment, component) => {
        const params = []

        const parsedFragment = fragment
            .replace(
                ROUTE_PARAMETER_REGEXP,
                (match, paramName) => {
                    params.push(paramName)
                    return URL_FRAGMENT_REGEXP
                })
            .replace(/\//g, '\\/')

        routes.push({
            testRegExp: new RegExp(`^${parsedFragment}$`),
            component,
            params
        })

        return router;
    }

    router.setNotFound = cb => {
        notFound = cb;
        return router;
    }

    router.start = () => {
        checkRoutes();
        window.setInterval(checkRoutes, TICKTIME);
    }

    router.navigate = path => {
        window.history.pushState(null, null, path);
    }

    return router;
}