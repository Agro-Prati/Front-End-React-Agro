import './App.css'
import Header from './components/Header/Header'

function App() {
  return (
    <>
      <Header />

      <main style={{ paddingTop: '100px' }}>
        <section id="home" style={{ minHeight: '60vh', padding: '4rem 1rem' }}>
          <div className="container">
            <h1>Home (Hero placeholder)</h1>
            <p>Conteúdo do Hero será migrado em seguida.</p>
          </div>
        </section>

        <section id="sobre">
          <div className="container">
            <h2>Sobre</h2>
            <p>Seção Sobre (a migrar)</p>
          </div>
        </section>

        <section id="solucoes">
          <div className="container">
            <h2>Soluções</h2>
          </div>
        </section>

        <section id="parceiros">
          <div className="container">
            <h2>Parceiros</h2>
          </div>
        </section>

        <section id="contato">
          <div className="container">
            <h2>Contato</h2>
          </div>
        </section>
      </main>
    </>
  )
}

export default App
