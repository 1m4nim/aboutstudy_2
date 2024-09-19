import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Todo from "./component/Todo";
//import Cheer from './component/Cheer';
import NewPage from './component/NewPage';
import 'semantic-ui-css/semantic.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} /> {/* Appをルートとして使用 */}
        <Route path="/todo" element={<Todo />} />
        <Route path="/newpage" element={<NewPage />} />
      </Routes>
      {/* Cheerコンポーネントをルーティングの外に配置 */}
      {/* <Cheer init={0} /> */}
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
