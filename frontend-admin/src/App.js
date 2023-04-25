import { NotificationContainer } from "react-notifications";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrimaryLayout from "./Components/Layout/PrimaryLayout";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import store from "./Components/Redux/store";
import QRCodeGenerate from "./Pages/PublicPages/QRCode";
import AdminPage from "./Pages/PublicPages/AdminPage/AdminPage";

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
                <Route path="/" element={<AdminPage />} />

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
