import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function NewPage() {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const navigate = useNavigate();

    // コンポーネントがマウントされたときにローカルストレージからデータを読み込む
    useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const savedDones = JSON.parse(localStorage.getItem('dones')) || [];
        setGoalList(savedGoals);
        setDoneList(savedDones);
    }, []);

    // やりたいことの削除
    const handleGoalDelete = (id) => {
        const updatedGoalList = goalList.filter(goal => goal.id !== id);
        setGoalList(updatedGoalList);
        localStorage.setItem('goals', JSON.stringify(updatedGoalList)); // ローカルストレージに保存
    };

    // やったことの削除
    const handleDoneDelete = (id) => {
        const updatedDoneList = doneList.filter(done => done.id !== id);
        setDoneList(updatedDoneList);
        localStorage.setItem('dones', JSON.stringify(updatedDoneList)); // ローカルストレージに保存
    };

    return (
        <div>
            <h1>まとめページ</h1>
            <div>
                <h2>やりたいこと</h2>
                <ul>
                    {goalList.map((goal) => (
                        <li key={goal.id}>
                            {goal.text}: {goal.startTime} から {goal.endTime} まで ({goal.elapsedTime})
                            <button onClick={() => handleGoalDelete(goal.id)}>削除</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>やったこと</h2>
                <ul>
                    {doneList.map((done) => (
                        <li key={done.id}>
                            {done.text}: {done.startTime} から {done.endTime} まで ({done.elapsedTime})
                            <button onClick={() => handleDoneDelete(done.id)}>削除</button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => navigate(-1)}>戻る</button>
            </div>
        </div>
    );
}
