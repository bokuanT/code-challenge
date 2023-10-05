import SwapPage from "./SwapPage/SwapPage";
import NavbarDefault from "./NavBar/NavBar";

function App() {
  return (
    <div className="App">
      <NavbarDefault/>
      <main className="App-main">
          <SwapPage />
      </main>
    </div>
  );
}

export default App;
