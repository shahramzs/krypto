import {Navbar, Loader, Footer, Welcome, Transactions, Services} from './Components/index'
const App = () => {

  return (
    <div className='min-h-screen'>
        <div className='gradient-bg-welcome'>
          <Navbar/>
          <Welcome/>
          <Services/>
          <Transactions/>
          <Footer/>
        </div>
    </div>
  );
}

export default App
