import HomePage from "../pages/home";
import LoginPage from "../pages/login";

const publicRouters = [
    {
      path: '/login',
      component: LoginPage
    },
    {
      path: '/forgot-password',
      component: LoginPage
    },
    
    
  ]
  export default publicRouters.map(route => {
    return {
      ...route
    };
  });
  