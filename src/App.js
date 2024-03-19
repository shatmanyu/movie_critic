import './App.css';
import Header from './Header';
import Homepage from './Homepage';
import { Routes,Route } from 'react-router';
import { useSelector } from 'react-redux';
import ReviewPage from './ReviewPage';
function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Homepage/>}/>
        <Route path='/review-page/:movieId' element={<ReviewPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
