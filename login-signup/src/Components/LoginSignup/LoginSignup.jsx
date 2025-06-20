import React, { useState, useEffect } from 'react'
import './LoginSignup.css'

// Icon placeholder components (gerçek projede kendi iconlarınızı kullanın)
const PersonIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
  </svg>
)

const EmailIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
  </svg>
)

const PasswordIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/>
  </svg>
)

const MoonIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
  </svg>
)

const SunIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12zM11 1h2v3h-2zM11 20h2v3h-2zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414zM20.485 4.929l-1.414-1.414-2.121 2.121 1.414 1.414zM4.929 20.485l1.414 1.414 2.121-2.121-1.414-1.414zM23 11v2h-3v-2zM4 11v2H1v-2z"/>
  </svg>
)

const LoginSignup = () => {
  const [sayfa, setSayfa] = useState("Giriş Yap")
  const [darkMode, setDarkMode] = useState(false)

  const [isim, setIsim] = useState("")
  const [email, setEmail] = useState("")
  const [sifre, setSifre] = useState("")
  const [mesaj, setMesaj] = useState("")

  // Dark mode durumunu localStorage'dan yükle
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem("darkMode")) || false
    setDarkMode(savedTheme)
  }, [])

  // Dark mode değiştiğinde localStorage'a kaydet ve CSS class'ını güncelle
  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode))
    if (darkMode) {
      document.body.classList.add('dark-mode')
    } else {
      document.body.classList.remove('dark-mode')
    }
  }, [darkMode])

  const formuGonder = () => {
    const kullanicilar = JSON.parse(localStorage.getItem("kullanicilar")) || []

    if (sayfa === "Kayıt Ol") {
      const zatenVar = kullanicilar.find((k) => k.email === email)
      if (zatenVar) {
        setMesaj("❗ Bu e-posta adresi zaten kayıtlı.")
        return
      }
      const yeniKullanici = { isim, email, sifre }
      kullanicilar.push(yeniKullanici)
      localStorage.setItem("kullanicilar", JSON.stringify(kullanicilar))
      setMesaj("✅ Kayıt başarılı! Artık giriş yapabilirsiniz.")
      setSayfa("Giriş Yap")
      setIsim("")
      setEmail("")
      setSifre("")
    } else {
      const bulunan = kullanicilar.find((k) => k.email === email && k.sifre === sifre)
      if (bulunan) {
        setMesaj(`🎉 Giriş başarılı, hoş geldin ${bulunan.isim || "kullanıcı"}!`)
      } else {
        setMesaj("❌ E-posta veya şifre yanlış.")
      }
    }
  }

  return (
    <div className={`app ${darkMode ? 'dark-mode' : ''}`}>
      <div className='container'>
        {/* Dark Mode Toggle */}
        <div className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <SunIcon /> : <MoonIcon />}
        </div>

        <div className='header'>
          <div className='text'>{sayfa}</div>
          <div className='underline' />
        </div>

        <div className='inputs'>
          {sayfa === "Giriş Yap" ? null : (
            <div className="input">
              <PersonIcon />
              <input
                type="text"
                placeholder='İsim'
                value={isim}
                onChange={(e) => setIsim(e.target.value)}
              />
            </div>
          )}

          <div className="input">
            <EmailIcon />
            <input
              type="email"
              placeholder='E-posta'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input">
            <PasswordIcon />
            <input
              type="password"
              placeholder='Şifre'
              value={sifre}
              onChange={(e) => setSifre(e.target.value)}
            />
          </div>
        </div>

        {sayfa === "Kayıt Ol" ? null : (
          <div className="forgot-password">
            Şifreni mi unuttun? <span>Tıkla</span>
          </div>
        )}

        <div className="submit-container">
          <div
            className={sayfa === "Giriş Yap" ? "submit gray" : "submit"}
            onClick={() => setSayfa("Kayıt Ol")}
          >
            Kayıt Ol
          </div>
          <div
            className={sayfa === "Kayıt Ol" ? "submit gray" : "submit"}
            onClick={() => setSayfa("Giriş Yap")}
          >
            Giriş Yap
          </div>
        </div>

        <div className="message">
          {mesaj}
        </div>

        <div className="submit-container" style={{ marginTop: "10px" }}>
          <div className="submit primary" onClick={formuGonder}>
            {sayfa === "Giriş Yap" ? "Giriş Yap" : "Kayıt Ol"}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginSignup
