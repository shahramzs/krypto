import {Navbar, Loader, Footer, Welcome, Transactions, Services} from './Components/index'
const App = () => {

  return (
    <div className='bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90%  min-h-screen'>
        <div className='gradient-bg-welcome'>
          <Navbar/>
          <Welcome/>
        </div>
        <Services/>
        <Transactions/>
        <Footer/>
    </div>
  );
}

export default App
