import React from "react";
import usePortal from "./usePortal";

const Portal = ({ id, className, createPortal, children }) => {
  const target = usePortal(id, className);
  return createPortal(<div className={className}>{children}</div>, target);
};

export default Portal;
