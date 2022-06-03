import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationComponent from './Components/NavComponent';

function App() {
  return (
    <>  
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
        />

        <nav>
            <NavigationComponent />
        </nav>

        <Routes>
            <Route path="" />
        </Routes>
    </>
  );
}

export default App;
