import {
  createBrowserRouter,
} from "react-router";
import RootLayout from "../Layout/RootLayout";
import Home from "../pages/Shared/Home/Home";
import LostFound from "../pages/Shared/LostFound";
import AddItems from "../pages/Shared/AddItems";
import MyItems from "../pages/Shared/MyItems";
import ItemsDetails from "../components/ItemsDetails";
import RecoveredItems from "../pages/Shared/RecoveredItems";


const router = createBrowserRouter([
  {
    path: "/",
    Component:RootLayout,
    children: [
      {
      index: true,
      Component:Home,
      },
      {
    path: "LostFound",
    Component:LostFound,
      },
      {
        path: "AddItems",
        Component:AddItems,
      },
      {
        path: "MyItems",
        Component:MyItems,
      },
      {
        path: "RecoveredItems",
        Component:RecoveredItems,
      },
      {
        path:"items/:id",
        Component:ItemsDetails,
      }
    ],
  },
]);

export default router;