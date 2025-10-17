import { TemperatureUnitProvider } from "./contexts/TemperatureUnitContext"
import MainTeperature from "./pages/MainTemperature"


function App() {

  return (
    <TemperatureUnitProvider>
      <MainTeperature />      
    </TemperatureUnitProvider>
  )
}

export default App
