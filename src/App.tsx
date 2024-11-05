import Hello from "./components/Hello.tsx";
import Projekt from "./components/Projekt.tsx";
import Car from "./components/Car.tsx";
import Prikol from "./components/Prikol.tsx";
import Bild from "./components/Bild.tsx";

function App() {

  return (
    <>
      <h1 className="text-5xl text-green-500">
          CampusGo
      </h1>
        <Hello />
        <Projekt />
        <Car model={"BMW"}/>
        <Prikol />
        <Bild image={"https://img.goodfon.com/wallpaper/nbig/9/9e/krasivyy-krasivaya-koshka-kot.webp"}/>
    </>
  )
}

export default App
