import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, DatePicker, TimePicker, List, message, Flex } from 'antd';
import moment from 'moment';
//import FormItem from 'antd/es/form/FormItem';

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
            message.error("時間設定が間違っているよ！！！"); // 時間の設定が間違っている場合のエラーメッセージ
            return null;
        }

        const hours = Math.floor(diff / 60);
        const minutes = diff % 60;
        return `${hours}時間 ${minutes}分`;
    };

    // やりたいことの送信
    const handleGoalSubmit = () => {
        if (goalInput.trim() && goalDate && goalStartTime && goalEndTime) {
            const startDateTime = moment(goalDate).set({
                hour: goalStartTime.hour(),
                minute: goalStartTime.minute(),
            });
            const endDateTime = moment(goalDate).set({
                hour: goalEndTime.hour(),
                minute: goalEndTime.minute(),
            });
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
        if (doneInput.trim() && doneDate && doneStartTime && doneEndTime) {
            const startDateTime = moment(doneDate).set({
                hour: doneStartTime.hour(),
                minute: doneStartTime.minute(),
            });
            const endDateTime = moment(doneDate).set({
                hour: doneEndTime.hour(),
                minute: doneEndTime.minute(),
            });
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

    // 今日以降の日付を選択できるようにする
    const disablePastDates = (current) => {
        return current && current < moment().startOf('day');
    };

    // 過去の時間を選べないようにする
    const disablePastTimes = (current) => {
        const now = moment();
        return current && current < now.startOf('minute');
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


                    <p style={{ fontWeight: "bold" }}>やる予定のもの</p>
                    <Form onFinish={handleGoalSubmit}>
                        <Form.Item>
                            <Input
                                value={goalInput}
                                onChange={(e) => setGoalInput(e.target.value)}
                                placeholder="宿題"
                                style={{ width: "350px" }}
                                required
                            />
                        </Form.Item>
                        <p style={{ fontWeight: "bold" }}>日付</p>
                        <Form.Item>
                            <DatePicker
                                value={goalDate}
                                onChange={setGoalDate}
                                disabledDate={disablePastDates} // 過去の日付を選べないようにする
                                placeholder="2024/09/01"
                                required
                            />
                        </Form.Item>
                        <p style={{ fontWeight: "bold" }}>開始時間</p>
                        <Form.Item>
                            <TimePicker
                                value={goalStartTime}
                                onChange={setGoalStartTime}
                                format="HH:mm"
                                placeholder="19:20"
                                disabledTime={disablePastTimes} // 過去の時間を選べないようにする
                                required
                            />
                        </Form.Item>
                        <p style={{ fontWeight: "bold" }}>終了時間</p>
                        <Form.Item>
                            <TimePicker
                                value={goalEndTime}
                                onChange={setGoalEndTime}
                                format="HH:mm"
                                placeholder="20:30"
                                disabledTime={disablePastTimes} // 過去の時間を選べないようにする
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
                        <p style={{ fontWeight: "bold" }}>やったこと</p>
                        <Form.Item>
                            <Input
                                value={doneInput}
                                onChange={(e) => setDoneInput(e.target.value)}
                                placeholder="算数"
                                style={{ width: "350px" }}
                                required
                            />
                        </Form.Item>
                        <p style={{ fontWeight: "bold" }}>日付</p>
                        <Form.Item>
                            <DatePicker
                                value={doneDate}
                                onChange={setDoneDate}
                                placeholder="2019/09/14"
                                required
                            />
                        </Form.Item>
                        <p style={{ fontWeight: "bold" }}>開始時間</p>
                        <Form.Item>
                            <TimePicker
                                value={doneStartTime}
                                onChange={setDoneStartTime}
                                format="HH:mm"
                                placeholder="10:00"
                                required
                            />
                        </Form.Item>
                        <p style={{ fontWeight: "bold" }}>終了時間</p>
                        <Form.Item>
                            <TimePicker
                                value={doneEndTime}
                                onChange={setDoneEndTime}
                                format="HH:mm"
                                placeholder="19:00"
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

                <Flex vertical gap="small" style={{ width: "100%" }}>
                    <Button type="primary" block onClick={handleNavigate}>
                        まとまったものはこちら
                    </Button>
                </Flex>
            </div>
        </div >
    );
}
