import { Suspense, ReactNode } from "react";
import { BrowserRouter } from "react-router-dom";

export const withRouter = (component: () => ReactNode) => () => {
  return (
    <BrowserRouter>
      <Suspense fallback="Loading...">{component()}</Suspense>
    </BrowserRouter>
  );
};
