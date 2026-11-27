'use client'

import { useState } from "react";
import { makeStore } from "./store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";
import { persistStore } from "redux-persist";

export default function StoreProvider({ children }: React.PropsWithChildren) {
  const [{store, persistor}] = useState(() => {
    const store = makeStore()
    return { store, persistor: persistStore(store) }
  })

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
      {children}
      </PersistGate>
    </Provider>
  )
}
