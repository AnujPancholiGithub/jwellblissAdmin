import { Routes, Route } from "react-router-dom";
// import MainLayout from "./layout/MainLayout";
import MultiStepForm from "./components/ProductsManagment/AddProducts/MultiStepForm";
import ProductGrid from "./components/ProductsManagment/FetchAndUpdate/ProductsGrid";
import ProductManagement from "./components/ProductsManagment/ProductManagement";
import Login from "./pages/Auth/Login";
import { useEffect, useState } from "react";
import SidebarWithHeader from "./components/SidebarWithHeader/SidebarWithHeader";
import HomeDashboard from "./components/Dash/Home";
import UserTable from "./components/UserManagment/UsersTable";
import OrdersTable from "./components/ProductsManagment/FetchAndUpdate/OrderTable";
import OrderDetails from "./components/ProductsManagment/FetchAndUpdate/SingleOrder";

function App() {
  const [initialLoad, setInitialLoad] = useState(true);
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });
  useEffect(() => {
    setLoggedIn(() => {
      const token = localStorage.getItem("token");
      return token ? true : false;
    });
    setTimeout(() => {
      setInitialLoad((prev) => false);
    }, 1000);
    console.log("loggedIn:", loggedIn);
  }, [loggedIn]);

  return (
    <>
      {initialLoad ? (
        <>Loading...</>
      ) : (
        <>
          {loggedIn ? (
            <SidebarWithHeader setLoggedIn={setLoggedIn}>
              <Routes>
                {loggedIn ? (
                  <>
                    <Route path="/" element={<HomeDashboard />} />
                    <Route path="/products" element={<ProductManagement />} />
                    <Route path="Customers" element={<UserTable />} />
                    <Route path="/orders" element={<OrdersTable />} />
                    <Route path="/orders/:orderId" element={<OrderDetails />} />
                  </>
                ) : (
                  <>
                    <Route
                      path="*"
                      element={<Login setLoggedIn={setLoggedIn} />}
                    />{" "}
                  </>
                )}
              </Routes>
            </SidebarWithHeader>
          ) : (
            <Routes>
              <Route path="*" element={<Login setLoggedIn={setLoggedIn} />} />
            </Routes>
          )}
        </>
      )}
    </>
  );
}

export default App;
