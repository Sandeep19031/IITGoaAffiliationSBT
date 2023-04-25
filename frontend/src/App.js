import { NotificationContainer } from "react-notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrimaryLayout from "./Components/Layout/PrimaryLayout";

import SbtSearch from "./Pages/PublicPages/SbtSearch/SbtSearch";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./Components/Redux/store";
import Wagmi from "./Pages/PublicPages/WagmiPage/Wagmi";
import IDCard from "./Pages/PublicPages/IDCard";
import QRCodeGenerate from "./Pages/PublicPages/QRCode";

let persistor = persistStore(store);

const App = () => {
  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <NotificationContainer />
          <BrowserRouter>
            <PrimaryLayout>
              <Routes>
                <Route path="/" element={<SbtSearch />} />
                <Route path="/sbtSearch/:address" element={<IDCard />} />
                <Route path="/qrCode" element={<QRCodeGenerate />} />
                <Route path={"*"} />
              </Routes>
            </PrimaryLayout>
          </BrowserRouter>
        </PersistGate>
      </Provider>
    </>
  );
};

export default App;
