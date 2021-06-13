import UserContextProvider from "./store/userContext";
import FightsContextProvider from "./store/fightsContext";

import ArenaHeader from "./components/ArenaHeader";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Arena from "./components/Arena";

import "./styles.css";

export default function App() {
  return (
    <UserContextProvider>
      <FightsContextProvider>
        <NavBar />
        <ArenaHeader />
        <Arena />
        <Footer />
      </FightsContextProvider>
    </UserContextProvider>
  );
}
