'use client'

import { useState } from "react";
import { makeStore } from "./store";
import { Provider } from "react-redux";

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const [store] = useState(makeStore)

  return <Provider store={store}>{ children}</Provider>
}
