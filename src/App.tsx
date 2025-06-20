import { useState } from "react";
import Global from "~/component/Global";
import NavBar from "~/component/NavBar";
import { Pages } from "~/constant/page";
import Home from "~/page/home";
import Intruder from "~/page/intruder";
import "./globals.css";

function App() {
  const [activePage, setActivePage] = useState<
    (typeof Pages)[number]["id"] | undefined
  >();

  return (
    <>
      <NavBar onActiveChange={setActivePage} />
      <div id="page-container">
        {activePage === Pages[0].id ? <Home /> : null}
        {activePage === Pages[1].id ? <Intruder /> : null}
      </div>
      <Global />
    </>
  );
}

export default App;
