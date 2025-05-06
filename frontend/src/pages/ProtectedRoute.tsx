import { Navigate } from "react-router";
import React from "react";

type ProtectedRouteProps = {
    user: string | null;
    children: React.ReactNode;
};

const ProtectedRoute = ({ user, children }: ProtectedRouteProps) => {
    if (!user) {
        return <Navigate to="/signin" replace />;
    }
    return <>{children}</>;
};

export default ProtectedRoute;
