import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RouteLayout from './components/RouteLayout';
import Home from './components/Home';
import Login from './components/Login';
import Register from'./components/Register';
import ReciepePage from './components/ReciepePage';
import './App.css';
import Carousel from './components/Carousel';
import Recipe from './components/Reciepe';
import MyReciepe from './components/MyReciepe';
import Favourites from './components/Favourites';
import AddRecipe from './components/AddReciepe';

function App() {

  let browserRouter=createBrowserRouter([
    {
      path:'',
      element:<RouteLayout/>,
      children:[
        {
          path:'/',
          element:<Home/>,
        },
        {
          path: '/register',
          element: <Register />,
        },
        {
          path: '/login',
          element: <Login />,
        },
        {
          path:'/carousel',
          element:<Carousel/>,
        },
        {
          path:'/reciepes-page',
          element:<ReciepePage/>,
        },
        {
          path:'/reciepe/:reciepeId',
          element:<Recipe/>,
        },
        {
          path:'/reciepe-of-user',
          element:<MyReciepe/>,
        },
        {
          path:'/favourites',
          element:<Favourites/>,
        },
        {
          path:'/add-reciepe',
          element:<AddRecipe/>,
        }
      ]
    }
  ])


  return (
    <div className="App">
       <RouterProvider router={browserRouter}></RouterProvider>
    </div>
  );

}

export default App;
