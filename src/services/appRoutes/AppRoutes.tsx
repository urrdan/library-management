import { Navigate, Route, Routes } from "react-router-dom";

import { ROUTES } from "src/services/appRoutes/routes";

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      {Object.values(ROUTES).map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
}
