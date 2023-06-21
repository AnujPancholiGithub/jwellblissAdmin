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

function App() {
  const [loggedIn, setLoggedIn] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? true : false;
  });
  useEffect(() => {
    setLoggedIn(() => {
      const token = localStorage.getItem("token");
      return token ? true : false;
    });
    console.log("loggedIn:", loggedIn);
  });

  return (
    <>
      {loggedIn ? (
        <SidebarWithHeader>
          <Routes>
            {loggedIn ? (
              <>
                <Route path="/" element={<HomeDashboard />} />
                <Route path="/products" element={<ProductManagement />} />
                <Route path="Customers" element={<UserTable />} />
                <Route path="/orders" element={<OrdersTable />} />
              </>
            ) : (
              <>
                <Route path="*" element={<Login setLoggedIn={setLoggedIn} />} />{" "}
              </>
            )}
          </Routes>
        </SidebarWithHeader>
      ) : (
        <Login setLoggedIn={setLoggedIn} />
      )}
    </>
  );
}

export default App;
