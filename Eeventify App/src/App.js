import './App.css';
import { Route, Routes } from 'react-router-dom';
import NavigationComponent from './Components/NavComponent';
import EventFeed from './Pages/EventFeed';
import EventDetail from './Pages/EventDetail'
import LoginPage from './Pages/Login';
import CreateEvent from './Pages/CreateEvent';
import MapOverview from './Pages/MapOverview';

function App() {
  return (
    <>  
        <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
            integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
            crossOrigin="anonymous"
        />
        <link href='https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.1/mapbox-gl.css' rel='stylesheet' />

        <nav>
            <NavigationComponent />
        </nav>

        <Routes>
          <Route index element={<EventFeed />} />
          <Route path="eventdetail/:id" element={<EventDetail />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="createevent" element={<CreateEvent />} />
          <Route path="mapoverview" element={<MapOverview />} />
        </Routes>
    </>
  );
}

export default App;
