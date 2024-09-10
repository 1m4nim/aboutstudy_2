import React, { useState } from "react";

export default function Todo(props) {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [goalInput, setGoalInput] = useState("")
    const [doneInput, setDoneInput] = useState("");

    const handleGoalSubmit = (e) => {
        e.preventDefault();
        if (goalInput.trim()) {
            setGoalList([...goalList, goalInput]);
            setGoalInput("");
        }
    };

    const handleDoneSubmit = (e) => {
        e.preventDefault();
        if (doneInput.trim()) {
            setDoneList([...doneList, doneInput]);
            setDoneInput("");
        }
    }

    return (
        <div>
            <div className="todo">
                <h1>{props.todo}</h1>
            </div>
            <div className="summary">
                <div className="before">
                    <h2>やりたいこと</h2>
                    <form onSubmit={handleGoalSubmit}>
                        <input type="text" value={goalInput} onChange={(e) => setGoalInput(e.target.value)} />
                        <button type="submit">送信</button>
                        <ul classNmae="goal"> {/*/goal = 目標 */}
                            {goalList.map((goal, index) => (
                                <li key={index}>{goal}</li>
                            ))}
                        </ul>
                    </form>
                </div>


                <div className="after">
                    <h2>やったこと</h2>
                    <form onSubmit={handleDoneSubmit}>
                        <input type="text" value={doneInput} onChange={(e) => setDoneInput(e.target.value)} />
                        <button type="submit">送信</button>
                        <ul className="done">{doneList.map((done, index) => (
                            <li key={index}>{done}</li>
                        ))}
                        </ul> {/*done = やったこと*/}
                    </form>
                </div>
            </div>
        </div>
    );
}