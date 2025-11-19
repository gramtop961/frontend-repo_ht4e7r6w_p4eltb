import { useEffect, useState } from 'react'
import Hero from './components/Hero'
import LoadingScreen from './components/LoadingScreen'
import CookieGate from './components/CookieGate'
import AdminLogin from './components/AdminLogin'
import AdminBar from './components/AdminBar'
import { AboutSection, NewsSection, ExclusivesSection, ProductionSection, PartnersAndApply, StreamingSection } from './components/Sections'

function App() {
  const [loading, setLoading] = useState(true)
  const [askAdmin, setAskAdmin] = useState(false)
  const [showLogin, setShowLogin] = useState(false)
  const [token, setToken] = useState(localStorage.getItem('animal_admin_token') || '')

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 1200)
    return () => clearTimeout(t)
  }, [])

  const onCookieChoice = ({ admin }) => {
    setAskAdmin(false)
    if (admin) setShowLogin(true)
  }

  const isAdmin = Boolean(token)

  return (
    <div className="min-h-screen bg-black">
      {loading && <LoadingScreen onFinish={() => setLoading(false)} />}
      {!loading && askAdmin && <CookieGate onChoice={onCookieChoice} />}
      {showLogin && <AdminLogin onSuccess={(tkn)=>{ setToken(tkn); setShowLogin(false); }} />}

      {/* Navbar */}
      <header className="sticky top-0 z-20 bg-black/70 backdrop-blur border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-orange-600 to-orange-400 text-black font-extrabold grid place-items-center">A</div>
            <span className="text-orange-100 font-semibold">Animal Studios</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-orange-200/80">
            <a href="#about" className="hover:text-orange-400 transition-colors">About</a>
            <a href="#news" className="hover:text-orange-400 transition-colors">News</a>
            <a href="#exclusives" className="hover:text-orange-400 transition-colors">Exclusives</a>
            <a href="#production" className="hover:text-orange-400 transition-colors">Production</a>
            <a href="#partner" className="hover:text-orange-400 transition-colors">Partner/Bewerbung</a>
            <a href="#streaming" className="hover:text-orange-400 transition-colors">Streaming</a>
          </nav>
          <button onClick={()=>setAskAdmin(true)} className="px-3 py-1.5 rounded-lg bg-orange-600 hover:bg-orange-500 text-sm">Zugang</button>
        </div>
      </header>

      <Hero />

      <main>
        <AboutSection isAdmin={isAdmin} token={token} />
        <NewsSection isAdmin={isAdmin} token={token} />
        <ExclusivesSection isAdmin={isAdmin} token={token} />
        <ProductionSection isAdmin={isAdmin} token={token} />
        <PartnersAndApply isAdmin={isAdmin} token={token} />
        <StreamingSection isAdmin={isAdmin} token={token} />
      </main>

      {isAdmin && <AdminBar onCreate={(c)=>{}} />}

      <footer className="py-8 text-center text-orange-300/60 bg-black border-t border-orange-500/10">© {new Date().getFullYear()} Animal Studios</footer>
    </div>
  )
}

export default App
