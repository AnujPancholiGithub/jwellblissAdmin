import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { Link, useLocation, useOutlet } from "react-router-dom";
import ProductGrid from "./FetchAndUpdate/ProductsGrid";
import MultiStepForm from "./AddProducts/MultiStepForm";

const ProjectManagement = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <Tabs defaultIndex={location.pathname !== "/products" ? 1 : 0}>
      <TabList>
        <Tab>
          <Link>All Products</Link>
        </Tab>
        <Tab>
          <Link>Create Product</Link>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProductGrid />
        </TabPanel>
        <TabPanel>
          <MultiStepForm />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ProjectManagement;
