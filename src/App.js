import logo from './logo.svg';
import View from './components/View';
import AddWorkout from './components/AddWorkout';
import {

  BrowserRouter,

  Routes,

  Route,

} from "react-router-dom";
import Header from './components/Header';
import GraphView from './components/GraphView';

function App() {
  return (
    <BrowserRouter>
      { <Header/> }
      <Routes>
        <Route path="/" element={<View />} />
        <Route path="add" element={<AddWorkout />} />
        <Route path="graph" element={<GraphView />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
