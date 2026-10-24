import './globals.css'
import Header from '../components/Header'
import Footer from '../components/Footer'

export const metadata = {
  title: 'ELØRIA Studio — Production photo & vidéo pour les professionnels du tourisme',
  description: 'Photographie, films et prises de vue par drone au service des professionnels du tourisme, pour valoriser leur offre, renforcer leur visibilité et inspirer de futurs voyageurs.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main style={{ backgroundColor: '#141414' }}>
          {children}
        </main>
        <footer>
          <Footer />
        </footer>
      </body>
    </html>
  )
}
