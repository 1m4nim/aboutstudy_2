import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input, Form, DatePicker, TimePicker, List, message, Layout } from 'antd';
import moment from 'moment';
const { Header, Content, Footer } = Layout;

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
                localStorage.setItem('goals', JSON.stringify(updatedGoalList));
                setGoalInput("");
                setGoalDate(null);
                setGoalStartTime(null);
                setGoalEndTime(null);
            }
        }
    };

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
                localStorage.setItem('dones', JSON.stringify(updatedDoneList));
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
        localStorage.setItem('goals', JSON.stringify(updatedGoalList));
    };

    const handleDeleteDone = (id) => {
        const updatedDoneList = doneList.filter(done => done.id !== id);
        setDoneList(updatedDoneList);
        localStorage.setItem('dones', JSON.stringify(updatedDoneList));
    };

    const handleNavigate = () => {
        navigate("/newpage");
    };

    const containerStyle = {
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
    };

    const contentStyle = {
        flex: 1,
        overflow: 'auto',
        padding: '20px',
    };

    const footerstyle = {
        backgroundColor: "#b0a37d"
    };

    return (
        <Layout style={containerStyle}>
            <Header style={{ backgroundColor: "#97c49c", color: "#22292C", textAlign: "center" }}>
                <h1>コレヤル</h1>
            </Header>
            <Content style={contentStyle}>
                <Layout style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                    <Layout style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "#A6B5A5", color: "#fff", textAlign: "center" }}>
                            <h2>やりたいこと</h2>
                        </Header>
                        <Content>
                            <Form onFinish={handleGoalSubmit} layout="vertical">
                                <Form.Item label="やる予定のもの" required>
                                    <Input style={{ fontSize: "16px" }} value={goalInput} onChange={(e) => setGoalInput(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="日付" required>
                                    <DatePicker style={{ width: "100%", fontSize: "16px" }} value={goalDate} onChange={setGoalDate} />
                                </Form.Item>
                                <Form.Item label="開始時間" required>
                                    <TimePicker style={{ width: "100%", fontSize: "16px" }} value={goalStartTime} onChange={setGoalStartTime} format="HH:mm" />
                                </Form.Item>
                                <Form.Item label="終了時間" required>
                                    <TimePicker style={{ width: "100%", fontSize: "16px" }} value={goalEndTime} onChange={setGoalEndTime} format="HH:mm" />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" block >
                                    送信
                                </Button>
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
                        </Content>
                    </Layout>
                    <Layout style={{ flex: 1 }}>
                        <Header style={{ backgroundColor: "#A6B5A5", color: "#fff", textAlign: "center" }}>
                            <h2>やったこと</h2>
                        </Header>
                        <Content>
                            <Form onFinish={handleDoneSubmit} layout="vertical">
                                <Form.Item label="やったこと" required>
                                    <Input style={{ fontSize: "16px" }} value={doneInput} onChange={(e) => setDoneInput(e.target.value)} />
                                </Form.Item>
                                <Form.Item label="日付" required>
                                    <DatePicker style={{ width: "100%", fontSize: "16px" }} value={doneDate} onChange={setDoneDate} />
                                </Form.Item>
                                <Form.Item label="やり始めた時間" required>
                                    <TimePicker style={{ width: "100%", fontSize: "16px" }} value={doneStartTime} onChange={setDoneStartTime} format="HH:mm" />
                                </Form.Item>
                                <Form.Item label="終了時間" required>
                                    <TimePicker style={{ width: "100%", fontSize: "16px" }} value={doneEndTime} onChange={setDoneEndTime} format="HH:mm" />
                                </Form.Item>
                                <Button type="primary" htmlType="submit" block>
                                    送信
                                </Button>
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
                            <Button type="primary" block onClick={handleNavigate}>
                                まとまったものはこちら
                            </Button>
                        </Content>
                    </Layout>
                </Layout>
            </Content>
            <Footer style={{ footerstyle, textAlign: "center", backgroundColor: "#cbe3c5" }}>
                <a href='https://github.com/1m4nim' target="_blank" rel="noopener noreferrer" style={{ color: "#706001" }}>
                    1m4nim's GitHubはこちら
                </a>
            </Footer>

        </Layout>
    );
}
