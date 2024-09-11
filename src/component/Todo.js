import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Todo() {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);

    const [goalInput, setGoalInput] = useState("");
    const [goalStartTime, setGoalStartTime] = useState("");
    const [goalEndTime, setGoalEndTime] = useState("");
    const [doneInput, setDoneInput] = useState("");
    const [doneStartTime, setDoneStartTime] = useState("");
    const [doneEndTime, setDoneEndTime] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        // 初期化時に localStorage からデータを読み込む
        const storedGoalList = JSON.parse(localStorage.getItem('goalList')) || [];
        const storedDoneList = JSON.parse(localStorage.getItem('doneList')) || [];
        setGoalList(storedGoalList);
        setDoneList(storedDoneList);
    }, []);

    const calculateElapsedTime = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        const diff = (end - start) / (1000 * 60);

        if (diff < 0) {
            alert("時間設定が間違っているよ！！！");
            return null;
        }

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours}時間 ${minutes}分`;
    };

    const saveToLocalStorage = () => {
        localStorage.setItem('goalList', JSON.stringify(goalList));
        localStorage.setItem('doneList', JSON.stringify(doneList));
    };

    const handleGoalSubmit = (e) => {
        e.preventDefault();
        if (goalInput.trim() && goalStartTime && goalEndTime) {
            const elapsedTime = calculateElapsedTime(goalStartTime, goalEndTime);
            if (elapsedTime) {
                const updatedGoalList = [...goalList, { text: goalInput, startTime: goalStartTime, endTime: goalEndTime, elapsedTime }];
                setGoalList(updatedGoalList);
                saveToLocalStorage();
                setGoalInput("");
                setGoalStartTime("");
                setGoalEndTime("");
            }
        }
    };

    const handleDoneSubmit = (e) => {
        e.preventDefault();
        if (doneInput.trim() && doneStartTime && doneEndTime) {
            const elapsedTime = calculateElapsedTime(doneStartTime, doneEndTime);
            if (elapsedTime) {
                const updatedDoneList = [...doneList, { text: doneInput, startTime: doneStartTime, endTime: doneEndTime, elapsedTime }];
                setDoneList(updatedDoneList);
                saveToLocalStorage();
                setDoneInput("");
                setDoneStartTime("");
                setDoneEndTime("");
            }
        }
    };

    const handleDeleteGoal = (index) => {
        const updatedGoalList = goalList.filter((_, i) => i !== index);
        setGoalList(updatedGoalList);
        saveToLocalStorage();
    };

    const handleDeleteDone = (index) => {
        const updatedDoneList = doneList.filter((_, i) => i !== index);
        setDoneList(updatedDoneList);
        saveToLocalStorage();
    };

    const handleNavigate = () => {
        navigate("/newpage");
    };

    return (
        <div>
            <div className="todo">
                <h1>やりたいこと・やったこと</h1>
                <p>ここは「やりたいこと」と「やったこと」の実際の乖離を見るための場所です</p>
            </div>
            <div className="summary">
                <div className="before">
                    <h2>やりたいこと</h2>
                    <form onSubmit={handleGoalSubmit}>
                        <input
                            type="text"
                            value={goalInput}
                            onChange={(e) => setGoalInput(e.target.value)}
                            placeholder="やりたいことを入力"
                        />
                        <input
                            type="time"
                            value={goalStartTime}
                            onChange={(e) => setGoalStartTime(e.target.value)}
                        />
                        <input
                            type="time"
                            value={goalEndTime}
                            onChange={(e) => setGoalEndTime(e.target.value)}
                        />
                        <button type="submit">送信</button>
                        <ul className="goal">
                            {goalList.map((goal, index) => (
                                <li key={index}>
                                    {goal.text}: {goal.startTime} から {goal.endTime} まで ({goal.elapsedTime})
                                    <button onClick={() => handleDeleteGoal(index)}>削除</button>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>

                <div className="after">
                    <h2>やったこと</h2>
                    <form onSubmit={handleDoneSubmit}>
                        <input
                            type="text"
                            value={doneInput}
                            onChange={(e) => setDoneInput(e.target.value)}
                            placeholder="やったことを入力"
                        />
                        <input
                            type="time"
                            value={doneStartTime}
                            onChange={(e) => setDoneStartTime(e.target.value)}
                        />
                        <input
                            type="time"
                            value={doneEndTime}
                            onChange={(e) => setDoneEndTime(e.target.value)}
                        />
                        <button type="submit">送信</button>
                        <ul className="done">
                            {doneList.map((done, index) => (
                                <li key={index}>
                                    {done.text}: {done.startTime} から {done.endTime} まで ({done.elapsedTime})
                                    <button onClick={() => handleDeleteDone(index)}>削除</button>
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
                <button onClick={handleNavigate}>まとまったものはこちら</button>
            </div>
        </div>
    );
}
