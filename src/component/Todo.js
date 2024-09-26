import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, DatePicker, TimePicker, List, message } from 'antd';
import moment from 'moment';

export default function Todo() {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [goalInput, setGoalInput] = useState("");
    const [goalDate, setGoalDate] = useState(null);
    const [goalStartTime, setGoalStartTime] = useState(null);
    const [goalEndTime, setGoalEndTime] = useState(null);
    const [doneInput, setDoneInput] = useState("");
    const [doneDate, setDoneDate] = useState(null);
    const [doneStartTime, setDoneStartTime] = useState(null);
    const [doneEndTime, setDoneEndTime] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const savedDones = JSON.parse(localStorage.getItem('dones')) || [];
        setGoalList(savedGoals);
        setDoneList(savedDones);
    }, []);

    // 時間の差を計算
    const calculateElapsedTime = (startTime, endTime) => {
        if (!startTime || !endTime) {
            message.error("正しい日付と時間を選択してください。");
            return null;
        }

        const diff = moment(endTime).diff(moment(startTime), 'minutes');

        if (diff < 0) {
            message.error("終了時間が開始時間より早くなっています！");
            return null;
        }

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;

        return `${hours}時間 ${minutes}分`;
    };

    // 日付と時間を組み合わせる
    const combineDateTime = (date, time) => {
        return date && time ? moment(date.format('YYYY-MM-DD') + ' ' + time.format('HH:mm')) : null;
    };

    // 選択可能な日付の制限
    const disablePastDates = (current) => {
        return current && current < moment().endOf('day'); // 今日以前の日付を無効化
    };

    // やりたいことの送信
    const handleGoalSubmit = () => {
        const startDateTime = combineDateTime(goalDate, goalStartTime);
        const endDateTime = combineDateTime(goalDate, goalEndTime);

        if (goalInput.trim() && startDateTime && endDateTime) {
            const elapsedTime = calculateElapsedTime(startDateTime, endDateTime);
            if (elapsedTime) {
                const newGoal = {
                    id: Date.now(),
                    text: goalInput,
                    startTime: startDateTime.format("YYYY-MM-DD HH:mm"),
                    endTime: endDateTime.format("YYYY-MM-DD HH:mm"),
                    elapsedTime
                };
                const updatedGoalList = [...goalList, newGoal];
                setGoalList(updatedGoalList);
                localStorage.setItem('goals', JSON.stringify(updatedGoalList)); // ローカルストレージに保存
                setGoalInput("");
                setGoalDate(null);
                setGoalStartTime(null);
                setGoalEndTime(null);
            }
        }
    };

    // やったことの送信
    const handleDoneSubmit = () => {
        const startDateTime = combineDateTime(doneDate, doneStartTime);
        const endDateTime = combineDateTime(doneDate, doneEndTime);

        if (doneInput.trim() && startDateTime && endDateTime) {
            const elapsedTime = calculateElapsedTime(startDateTime, endDateTime);
            if (elapsedTime) {
                const newDone = {
                    id: Date.now(),
                    text: doneInput,
                    startTime: startDateTime.format("YYYY-MM-DD HH:mm"),
                    endTime: endDateTime.format("YYYY-MM-DD HH:mm"),
                    elapsedTime
                };
                const updatedDoneList = [...doneList, newDone];
                setDoneList(updatedDoneList);
                localStorage.setItem('dones', JSON.stringify(updatedDoneList)); // ローカルストレージに保存
                setDoneInput("");
                setDoneDate(null);
                setDoneStartTime(null);
                setDoneEndTime(null);
            }
        }
    };

    const handleDeleteGoal = (id) => {
        const updatedGoalList = goalList.filter(goal => goal.id !== id);
        setGoalList(updatedGoalList);
        localStorage.setItem('goals', JSON.stringify(updatedGoalList)); // ローカルストレージに保存
    };

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
                            <DatePicker
                                value={goalDate}
                                onChange={(date) => setGoalDate(date)}
                                format="YYYY-MM-DD"
                                placeholder="日付を選択"
                                disabledDate={disablePastDates} // 過去の日付を無効化
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <TimePicker
                                value={goalStartTime}
                                onChange={(time) => setGoalStartTime(time)}
                                format="HH:mm"
                                placeholder="開始時間"
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <TimePicker
                                value={goalEndTime}
                                onChange={(time) => setGoalEndTime(time)}
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
                                actions={[<Button onClick={() => handleDeleteGoal(goal.id)}>削除</Button>]}>
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
                            <DatePicker
                                value={doneDate}
                                onChange={(date) => setDoneDate(date)}
                                format="YYYY-MM-DD"
                                placeholder="日付を選択"
                                disabledDate={disablePastDates} // 過去の日付を無効化
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <TimePicker
                                value={doneStartTime}
                                onChange={(time) => setDoneStartTime(time)}
                                format="HH:mm"
                                placeholder="開始時間"
                                required
                            />
                        </Form.Item>
                        <Form.Item>
                            <TimePicker
                                value={doneEndTime}
                                onChange={(time) => setDoneEndTime(time)}
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
                                actions={[<Button onClick={() => handleDeleteDone(done.id)}>削除</Button>]}>
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
