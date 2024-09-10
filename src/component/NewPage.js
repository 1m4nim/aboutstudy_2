import React from "react";

export default function NewPage({ goalList = [], doneList = [] }) {
    return (
        <div>
            <h1>ToDo</h1>
            <h2>やりたいこと</h2>
            <ul>
                {goalList.map((goal, index) => (
                    <li key={index}>
                        {goal.text}: {goal.startTime} から {goal.endTime} まで ({goal.elapsedTime})
                    </li>
                ))}
            </ul>

            <h2>やったこと</h2>
            <ul>
                {doneList.map((done, index) => (
                    <li key={index}>
                        {done.text}: {done.startTime} から {done.endTime} まで ({done.elapsedTime})
                    </li>
                ))}
            </ul>
        </div>
    );

}