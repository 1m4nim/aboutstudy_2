import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function NewPage() {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const storedGoalList = JSON.parse(localStorage.getItem('goalList')) || [];
        const storedDoneList = JSON.parse(localStorage.getItem('doneList')) || [];
        setGoalList(storedGoalList);
        setDoneList(storedDoneList);
    }, []);

    const handleDeleteGoal = (index) => {
        const updatedGoalList = goalList.filter((_, i) => i !== index);
        setGoalList(updatedGoalList);
        localStorage.setItem('goalList', JSON.stringify(updatedGoalList));
    };

    const handleDeleteDone = (index) => {
        const updatedDoneList = doneList.filter((_, i) => i !== index);
        setDoneList(updatedDoneList);
        localStorage.setItem('doneList', JSON.stringify(updatedDoneList));
    };

    return (
        <div>
            <h1>まとめページ</h1>
            <div>
                <h2>やりたいこと</h2>
                <ul>
                    {goalList.map((goal, index) => (
                        <li key={index}>
                            {goal.text}: {goal.startTime} から {goal.endTime} まで ({goal.elapsedTime})
                            <button onClick={() => handleDeleteGoal(index)}>削除</button>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h2>やったこと</h2>
                <ul>
                    {doneList.map((done, index) => (
                        <li key={index}>
                            {done.text}: {done.startTime} から {done.endTime} まで ({done.elapsedTime})
                            <button onClick={() => handleDeleteDone(index)}>削除</button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => navigate(-1)}>戻る</button>
            </div>
        </div>
    );
}
