import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, TimePicker, List, message } from 'antd';
import moment from 'moment';

export default function Todo() {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [goalInput, setGoalInput] = useState("");
    const [goalStartTime, setGoalStartTime] = useState(null);
    const [goalEndTime, setGoalEndTime] = useState(null);
    const [doneInput, setDoneInput] = useState("");
    const [doneStartTime, setDoneStartTime] = useState(null);
    const [doneEndTime, setDoneEndTime] = useState(null);

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
        const diff = moment(endTime).diff(moment(startTime), 'minutes');

        if (diff < 0) {
            message.error("時間設定が間違っているよ！！！");
            return null;
        }

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours}時間 ${minutes}分`;
    };

    // やりたいことの送信
    const handleGoalSubmit = () => {
        if (goalInput.trim() && goalStartTime && goalEndTime) {
            const elapsedTime = calculateElapsedTime(goalStartTime, goalEndTime);
            if (elapsedTime) {
                const newGoal = {
                    id: Date.now(),
                    text: goalInput,
                    startTime: goalStartTime.format("HH:mm"),
                    endTime: goalEndTime.format("HH:mm"),
                    elapsedTime
                };
                const updatedGoalList = [...goalList, newGoal];
                setGoalList(updatedGoalList);
                localStorage.setItem('goals', JSON.stringify(updatedGoalList)); // ローカルストレージに保存
                setGoalInput("");
                setGoalStartTime(null);
                setGoalEndTime(null);
            }
        }
    };

    // やったことの送信
    const handleDoneSubmit = () => {
        if (doneInput.trim() && doneStartTime && doneEndTime) {
            const elapsedTime = calculateElapsedTime(doneStartTime, doneEndTime);
            if (elapsedTime) {
                const newDone = {
                    id: Date.now(),
                    text: doneInput,
                    startTime: doneStartTime.format("HH:mm"),
                    endTime: doneEndTime.format("HH:mm"),
                    elapsedTime
                };
                const updatedDoneList = [...doneList, newDone];
                setDoneList(updatedDoneList);
                localStorage.setItem('dones', JSON.stringify(updatedDoneList)); // ローカルストレージに保存
                setDoneInput("");
                setDoneStartTime(null);
                setDoneEndTime(null);
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
                    <Form onFinish={handleGoalSubmit}>
                        <Form.Item>
                            <Input
                                value={goalInput}
                                onChange={(e) => setGoalInput(e.target.value)}
                                placeholder="宿題"
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <TimePicker
                                value={goalStartTime}
                                onChange={setGoalStartTime}
                                format="HH:mm"
                                placeholder="開始時間"
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <TimePicker
                                value={goalEndTime}
                                onChange={setGoalEndTime}
                                format="HH:mm"
                                placeholder="終了時間"
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                送信
                            </Button>
                        </Form.Item>
                    </Form>
                    <List
                        dataSource={goalList}
                        renderItem={goal => (
                            <List.Item
                                actions={[<Button onClick={() => handleDeleteGoal(goal.id)}>削除</Button>]}
                            >
                                {goal.text}: {goal.startTime} から {goal.endTime} まで ({goal.elapsedTime})
                            </List.Item>
                        )}
                    />
                </div>

                <div className="after">
                    <h2>やったこと</h2>
                    <Form onFinish={handleDoneSubmit}>
                        <Form.Item>
                            <Input
                                value={doneInput}
                                onChange={(e) => setDoneInput(e.target.value)}
                                placeholder="算数"
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <TimePicker
                                value={doneStartTime}
                                onChange={setDoneStartTime}
                                format="HH:mm"
                                placeholder="開始時間"
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <TimePicker
                                value={doneEndTime}
                                onChange={setDoneEndTime}
                                format="HH:mm"
                                placeholder="終了時間"
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit">
                                送信
                            </Button>
                        </Form.Item>
                    </Form>
                    <List
                        dataSource={doneList}
                        renderItem={done => (
                            <List.Item
                                actions={[<Button onClick={() => handleDeleteDone(done.id)}>削除</Button>]}
                            >
                                {done.text}: {done.startTime} から {done.endTime} まで ({done.elapsedTime})
                            </List.Item>
                        )}
                    />
                </div>
                <Button type="link" onClick={handleNavigate}>
                    まとまったものはこちら
                </Button>
            </div>
        </div>
    );
}
