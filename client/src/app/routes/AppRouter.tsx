import { Navigate, Route, Routes, useParams, } from "react-router-dom";
import { RouteNames,privateRoutes, publicRoutes } from "./routes";
import WithAuth from "./WithAuth";
import { AuthProvider } from "../providers/AuthProvider";
import { SocketContext, socket } from "../context/SocketContext";


const AppRouter = () => {

    return (
        <AuthProvider>
            <SocketContext.Provider value={socket}>
                <Routes>

                    {publicRoutes.map((route) => <Route path={route.path} key={route.path} element={<route.component/>}/>)}
                    {privateRoutes.map((route) =><Route path={route.path} key={route.path} element={<WithAuth><route.component/></WithAuth>}/>)}

                    <Route path={'/'} element={<Navigate to={RouteNames.START} replace/>}/>
            
                </Routes>
            </SocketContext.Provider>
        </AuthProvider>
    );
};

export default AppRouter;