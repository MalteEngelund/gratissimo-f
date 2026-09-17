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
import { SingleJobPage } from './pages/SingleJobPage'
import { CategoryPage } from './pages/CategoryPage'
import { PageNotFound } from './pages/PageNotFound'
import { EditUserPage } from './pages/EditUserPage'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="/alle-jobs" element={<AllJobsPage />} />
            <Route path="/job/:id" element={<SingleJobPage />} />
            <Route path="/job-kategori/:id" element={<CategoryPage />} />
            <Route path="/nyheder" element={<NewsPage />} />
            <Route path="/nyheder/:id" element={<NewsPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/min-side" element={<MyPage />} />
            <Route path="/opret-annonce" element={<CreateJobPage />} />
            <Route path="/opret-bruger" element={<CreateUserPage />} />
            <Route path="/rediger-profil" element={<EditUserPage />} />
            <Route path="*" element={<PageNotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
