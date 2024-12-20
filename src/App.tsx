import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PlacesList from "./Components/PlacesList/PlacesList.tsx";
import CacheKeyContextProvider from "./store/cacheKeyContext.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "./Components/RootLayout/RootLayout.tsx";
import WishList from "./Components/WishList/WishList.tsx";
import { WishListContextProvider} from "./store/wishListContext.tsx";
import Error from "./Components/Error/Error.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <Error setShowError={undefined} error={null}/>,
    children: [
      { path: "/", element: <PlacesList /> },
      { path: "/wishlist", element: <WishList /> },
    ],

  },
]);

const queryClient = new QueryClient();
function App():JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <CacheKeyContextProvider>
        <WishListContextProvider>
          <RouterProvider router={router} />
        </WishListContextProvider>
      </CacheKeyContextProvider>
    </QueryClientProvider>
  );
}

export default App;
