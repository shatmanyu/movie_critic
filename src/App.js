import './App.css';
import Header from './frontend/components/Header';
import Homepage from './frontend/components/Homepage';
import { Routes,Route } from 'react-router';
import { useSelector } from 'react-redux';
import ReviewPage from './frontend/components/ReviewPage';
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
