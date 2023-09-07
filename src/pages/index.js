import Contact from "./Contact";
import Dashboard from "./Dashboard";
import Explore from "./Explore02";
import Home from "./Home";
import Ranking from "./Ranking";
import Pool from "./pool";
import ItemDetails from "./ItemDetails";
import Mint from "./mint";
import MLM from "../components/mlm/mlm";




const routes = [
  { path: '/', component: <Home /> },
  { path: 'pool', component: <Pool /> },
  { path: '/marketplace', component: <Explore /> },
  { path: '/dashboard', component: <Dashboard /> },
  { path: '/referal', component: <Ranking /> },
  { path: '/contact', component: <Contact /> },
  { path: '/item-details', component: <ItemDetails /> },
  { path: '/mint', component: <Mint /> },
  { path: '/mlm', component: <MLM /> },
]

export default routes;