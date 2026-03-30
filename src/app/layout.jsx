import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'ELØRIA',
  description: 'Portfolio cinématographique ELØRIA',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main style={{ position: 'relative', zIndex: 1, backgroundColor: '#141414' }}>
          {children}
        </main>
        <footer style={{ position: 'sticky', bottom: 0, zIndex: 0 }}>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
