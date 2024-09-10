import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Todo({ goalList, setGoalList, doneList, setDoneList }) {
    const [goalInput, setGoalInput] = useState(""); // やりたいことの入力
    const [goalStartTime, setGoalStartTime] = useState(""); // やりたいことの開始時間
    const [goalEndTime, setGoalEndTime] = useState(""); // やりたいことの終了時間
    const [doneInput, setDoneInput] = useState(""); // やったことの入力
    const [doneStartTime, setDoneStartTime] = useState(""); // やったことの開始時間
    const [doneEndTime, setDoneEndTime] = useState(""); // やったことの終了時間


    const navigate = useNavigate();

    // 経過時間を計算する関数
    const calculateElapsedTime = (startTime, endTime) => {
        const start = new Date(`1970-01-01T${startTime}:00`);
        const end = new Date(`1970-01-01T${endTime}:00`);
        const diff = (end - start) / (1000 * 60); // 分単位の差を計算

        if (diff < 0) {
            alert("時間設定が間違っているよ！！！");
            return null;
        }

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours}時間 ${minutes}分`;
    };

    // やりたいことの送信ハンドラ
    const handleGoalSubmit = (e) => {
        e.preventDefault();
        if (goalInput.trim() && goalStartTime && goalEndTime) {
            const elapsedTime = calculateElapsedTime(goalStartTime, goalEndTime);
            if (elapsedTime) {
                // goalListが配列であることを確認して更新
                setGoalList([...goalList, { text: goalInput, startTime: goalStartTime, endTime: goalEndTime, elapsedTime }]);
                setGoalInput("");
                setGoalStartTime("");
                setGoalEndTime("");
            }
        }
    };

    // やったことの送信ハンドラ
    const handleDoneSubmit = (e) => {
        e.preventDefault();
        if (doneInput.trim() && doneStartTime && doneEndTime) {
            const elapsedTime = calculateElapsedTime(doneStartTime, doneEndTime);
            if (elapsedTime) {
                setDoneList([...doneList, { text: doneInput, startTime: doneStartTime, endTime: doneEndTime, elapsedTime }]);
                setDoneInput(""); // 入力フィールドをリセット
                setDoneStartTime(""); // 開始時間フィールドをリセット
                setDoneEndTime("");  // 終了時間フィールドをリセット
            }
        }
    };



    return (
        <div>
            <div className="todo">
                <h1>やりたいこと・やったこと</h1>
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
                            {(goalList || []).map((goal, index) => (
                                <li key={index}>
                                    {goal.text}: {goal.startTime} から {goal.endTime} まで ({goal.elapsedTime})
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
                            {(doneList || []).map((done, index) => (
                                <li key={index}>
                                    {done.text}: {done.startTime} から {done.endTime} まで ({done.elapsedTime})
                                </li>
                            ))}
                        </ul>
                    </form>
                </div>
                <button onClick={() => navigate("/newpage")}>まとまったものはこちら</button>
            </div>
        </div>

    );
}
