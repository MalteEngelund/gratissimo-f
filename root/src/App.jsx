import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import { MainLayout } from './layouts/MainLayout'
import { HomePage } from './pages/HomePage'
import { AllJobsPage } from './pages/AllJobsPage'
import { NewsPage } from './pages/NewsPage'
import { LoginPage } from './pages/LoginPage'
import { MyPage } from './pages/MyPage'
import { CreateJobPage } from './pages/CreateJobPage'
import { CreateUserPage } from './pages/CreateUserPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/alle-jobs" element={<AllJobsPage />} />
            <Route path="/nyheder" element={<NewsPage />} />
            <Route path="/nyheder/:id" element={<NewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/min-side" element={<MyPage />} />
            <Route path="/opret-annonce" element={<CreateJobPage />} />
            <Route path="/opret-bruger" element={<CreateUserPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
