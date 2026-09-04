import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Medicines from './pages/Medicines'
import MedicineForm from './pages/MedicineForm'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Medicines />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/medicines" element={<Medicines />} />
        <Route path="/medicines/add" element={<MedicineForm />} />
        <Route path="/medicines/:id/edit" element={<MedicineForm />} />
        <Route path="/addmedicine" element={<MedicineForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
