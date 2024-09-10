// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Todo from './Todo';
import NewPage from './NewPage';

function App() {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to="/">Todo Page</Link></li>
                        <li><Link to="/newpage">New Page</Link></li>
                    </ul>
                </nav>

                <Routes>
                    <Route
                        path="/"
                        element={<Todo goalList={goalList} setGoalList={setGoalList} doneList={doneList} setDoneList={setDoneList} />}
                    />
                    <Route
                        path="/newpage"
                        element={<NewPage goalList={goalList} doneList={doneList} />}
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
