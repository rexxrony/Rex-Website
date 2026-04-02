
import { Navigate, Route, Routes } from 'react-router-dom'
import { DevPage } from './pages/DevPage'
import { HomePage } from './pages/HomePage'
import { PhotographyPage } from './pages/PhotographyPage'
import { PageTransition } from './components/PageTransition/PageTransition'

function App() {
  return (
    <PageTransition>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dev" element={<DevPage />} />
        <Route path="/photography" element={<PhotographyPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </PageTransition>
  )
}

export default App
