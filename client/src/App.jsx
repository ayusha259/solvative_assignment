import './App.css';
import {Routes, Route} from "react-router-dom"
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';
import ViewUser from './components/ViewUser';
import P5Records from './components/P5Records';
import RewardsRecords from './components/RewardRecords';
import CreateReward from './components/CreateReward';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='' element={<UserList />} />
        <Route path='/new' element={<CreateUser />} />
        <Route path='/:id' element={<ViewUser />} />
        <Route path='/:id/p5' element={<P5Records />} />
        <Route path='/:id/rewards' element={<RewardsRecords />} />
        <Route path='/:id/rewards/new' element={<CreateReward />} />
      </Routes>
    </div>
  );
}

export default App;
