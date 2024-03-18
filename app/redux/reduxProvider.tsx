"use client";
import {Provider} from 'react-redux'
import {store} from '@/redux/store'
import { persistStore } from "redux-persist";

export default function ReduxProvider({children}: Readonly<{children: React.ReactNode}>) {
  persistStore(store);
  return <Provider store={store}>{children}</Provider>
}