import { Header } from "./components/Header";
import { SideBar } from "./components/SideBar";
import { Showroom } from "./pages/Showroom";

const App = () => {
  return (
    <div className="h-full bg-neutral-100 overflow-auto">
      <Header />
      <SideBar />
      <div className="relative left-[160px] w-[calc(100%-160px)] xl:block xl:left-0 xl:w-full">
        <Showroom />
      </div>
    </div>
  );
};

export default App;
