import React, { useState } from 'react';
import Todo from './component/Todo';
import NewPage from './component/NewPage';

function App() {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [currentPage] = useState("todo"); // 現在表示するページを管理

    // ページ切り替えのための関数
    const renderPage = () => {
        if (currentPage === "todo") {
            return (
                <Todo
                    goalList={goalList}
                    setGoalList={setGoalList}
                    doneList={doneList}
                    setDoneList={setDoneList}
                />
            );
        } else if (currentPage === "newpage") {
            return <NewPage goalList={goalList} doneList={doneList} />;
        }
    };

    return (
        <div>

            {/* 現在のページをレンダリング */}
            {renderPage()}
        </div>
    );
}

export default App;