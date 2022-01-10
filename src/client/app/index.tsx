import React from "react";

import { withProviders } from "./providers";
import { Routing } from "pages";

function App() {
  return <Routing />;
}

export default withProviders(App);
