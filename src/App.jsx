
import { Navigate, Route, Routes } from 'react-router-dom'
import { DevPage } from './pages/DevPage'
import { HomePage } from './pages/HomePage'
import { PhotographyPage } from './pages/PhotographyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/dev" element={<DevPage />} />
      <Route path="/photography" element={<PhotographyPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
