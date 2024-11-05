import Hello from "./components/Hello.tsx";
import Projekt from "./components/Projekt.tsx";
import Car from "./components/Car.tsx";

function App() {

  return (
    <>
      <h1 className="text-5xl text-green-500">
          CampusGo
      </h1>
        <Hello />
        <Projekt />
        <Car model={"BMW"}/>
    </>
  )
}

export default App
