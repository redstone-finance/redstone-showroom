import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { Showroom } from "./pages/Showroom";

const App = () => {
  return (
    <div className="flex flex-col h-full bg-neutral-100 overflow-auto">
      <Header />
      <div className="mb-5">
        <Showroom />
      </div>
      <Footer />
    </div>
  );
};

export default App;
