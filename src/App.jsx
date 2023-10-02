import {Route, Routes } from 'react-router-dom'
import Home from './pages/home'
import Search from './pages/search'
import Header from './components/header'

export default function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </>
  );
}
