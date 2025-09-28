import { Navigate, Route, Routes } from "react-router-dom";

import routers from "./routers";

const PrivateContent = () => {
  return (
    <>
      <Routes>
        {routers.map((x, idx) => (
          <Route key={idx} path={x.path} element={<x.component />} />
        ))}
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Routes>
    </>
  );
};

export default PrivateContent;
