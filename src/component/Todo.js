import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

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

    // ローカルストレージに保存されたデータを読み込み
    useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const savedDones = JSON.parse(localStorage.getItem('dones')) || [];
        setGoalList(savedGoals);
        setDoneList(savedDones);
    }, []);

    // 時間の差を計算
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

    // やりたいことの送信
    const handleGoalSubmit = (e) => {
        e.preventDefault();
        if (goalInput.trim() && goalStartTime && goalEndTime) {
            const elapsedTime = calculateElapsedTime(goalStartTime, goalEndTime);
            if (elapsedTime) {
                const newGoal = { id: Date.now(), text: goalInput, startTime: goalStartTime, endTime: goalEndTime, elapsedTime };
                const updatedGoalList = [...goalList, newGoal];
                setGoalList(updatedGoalList);
                localStorage.setItem('goals', JSON.stringify(updatedGoalList)); // ローカルストレージに保存
                setGoalInput("");
                setGoalStartTime("");
                setGoalEndTime("");
            }
        }
    };

    // やったことの送信
    const handleDoneSubmit = (e) => {
        e.preventDefault();
        if (doneInput.trim() && doneStartTime && doneEndTime) {
            const elapsedTime = calculateElapsedTime(doneStartTime, doneEndTime);
            if (elapsedTime) {
                const newDone = { id: Date.now(), text: doneInput, startTime: doneStartTime, endTime: doneEndTime, elapsedTime };
                const updatedDoneList = [...doneList, newDone];
                setDoneList(updatedDoneList);
                localStorage.setItem('dones', JSON.stringify(updatedDoneList)); // ローカルストレージに保存
                setDoneInput("");
                setDoneStartTime("");
                setDoneEndTime("");
            }
        }
    };

    // やりたいことの削除
    const handleDeleteGoal = (id) => {
        const updatedGoalList = goalList.filter(goal => goal.id !== id);
        setGoalList(updatedGoalList);
        localStorage.setItem('goals', JSON.stringify(updatedGoalList)); // ローカルストレージに保存
    };

    // やったことの削除
    const handleDeleteDone = (id) => {
        const updatedDoneList = doneList.filter(done => done.id !== id);
        setDoneList(updatedDoneList);
        localStorage.setItem('dones', JSON.stringify(updatedDoneList)); // ローカルストレージに保存
    };

    const handleNavigate = () => {
        navigate("/newpage");
    };

    return (
        <div>
            <div className="todo">
                <h1>やりたいこと・やったこと</h1>
                <p>ここは「やりたいこと」と「やったこと」の乖離を見るための場所です</p>
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
                            required
                            onChange={(e) => setGoalStartTime(e.target.value)}
                        />
                        <input
                            type="time"
                            value={goalEndTime}
                            required
                            onChange={(e) => setGoalEndTime(e.target.value)}
                        />
                        <button type="submit">送信</button>
                    </form>
                    <ul className="goal">
                        {goalList.map((goal) => (
                            <li key={goal.id}>
                                {goal.text}: {goal.startTime} から {goal.endTime} まで ({goal.elapsedTime})
                                <button onClick={() => handleDeleteGoal(goal.id)}>削除</button>
                            </li>
                        ))}
                    </ul>
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
                    </form>
                    <ul className="done">
                        {doneList.map((done) => (
                            <li key={done.id}>
                                {done.text}: {done.startTime} から {done.endTime} まで ({done.elapsedTime})
                                <button onClick={() => handleDeleteDone(done.id)}>削除</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <button onClick={handleNavigate}>まとまったものはこちら</button>
            </div>
        </div>
    );
}
