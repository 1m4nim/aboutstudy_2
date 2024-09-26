import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Input, List, Segment, Header, Container } from 'semantic-ui-react';

export default function Todo() {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const [goalInput, setGoalInput] = useState("");
    const [goalDate, setGoalDate] = useState(""); // 日付を追加
    const [goalStartTime, setGoalStartTime] = useState("");
    const [goalEndTime, setGoalEndTime] = useState("");
    const [doneInput, setDoneInput] = useState("");
    const [doneDate, setDoneDate] = useState(""); // 日付を追加
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
        const selectedDate = new Date(goalDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0); // 時間をリセット

        if (goalInput.trim() && goalStartTime && goalEndTime && selectedDate >= today) {
            const elapsedTime = calculateElapsedTime(goalStartTime, goalEndTime);
            if (elapsedTime) {
                const newGoal = { id: Date.now(), text: goalInput, date: goalDate, startTime: goalStartTime, endTime: goalEndTime, elapsedTime };
                const updatedGoalList = [...goalList, newGoal];
                setGoalList(updatedGoalList);
                localStorage.setItem('goals', JSON.stringify(updatedGoalList)); // ローカルストレージに保存
                setGoalInput("");
                setGoalDate("");
                setGoalStartTime("");
                setGoalEndTime("");
            }
        } else {
            alert("未来の日付を選んでください。");
        }
    };

    // やったことの送信
    const handleDoneSubmit = (e) => {
        e.preventDefault();
        if (doneInput.trim() && doneStartTime && doneEndTime && doneDate) {
            const elapsedTime = calculateElapsedTime(doneStartTime, doneEndTime);
            if (elapsedTime) {
                const newDone = { id: Date.now(), text: doneInput, date: doneDate, startTime: doneStartTime, endTime: doneEndTime, elapsedTime };
                const updatedDoneList = [...doneList, newDone];
                setDoneList(updatedDoneList);
                localStorage.setItem('dones', JSON.stringify(updatedDoneList)); // ローカルストレージに保存
                setDoneInput("");
                setDoneDate("");
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
        <Container>
            <Segment>
                <Header as="h1">やりたいこと・やったこと</Header>
                <p>ここは「やりたいこと」と「やったこと」の乖離を見るための場所です</p>
            </Segment>
            <Segment>
                <Header as="h2">やりたいこと</Header>
                <Form onSubmit={handleGoalSubmit}>
                    <Form.Field>
                        <label>
                            やりたいことを入力してね
                            <Input
                                placeholder="数学"
                                value={goalInput}
                                onChange={(e) => setGoalInput(e.target.value)}
                            />
                        </label>
                    </Form.Field>
                    <Form.Group widths="equal">
                        <label>
                            日付
                            <Form.Input
                                type="date"
                                value={goalDate}
                                required
                                onChange={(e) => setGoalDate(e.target.value)}
                            />
                        </label>
                        <label>
                            はじめる時間
                            <Form.Input
                                type="time"
                                value={goalStartTime}
                                required
                                onChange={(e) => setGoalStartTime(e.target.value)}
                            />
                        </label>
                        <label>
                            終わる予定の時間
                            <Form.Input
                                type="time"
                                value={goalEndTime}
                                required
                                onChange={(e) => setGoalEndTime(e.target.value)}
                            />
                        </label>
                    </Form.Group>
                    <Button type="submit" primary>送信</Button>
                </Form>
                <List divided relaxed>
                    {goalList.map((goal) => (
                        <List.Item key={goal.id}>
                            <List.Content>
                                <List.Header>{goal.text}</List.Header>
                                {goal.date} {goal.startTime} から {goal.endTime} まで ({goal.elapsedTime})
                                <Button onClick={() => handleDeleteGoal(goal.id)} color="red" floated="right">削除</Button>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Segment>

            <Segment>
                <Header as="h2">やったこと</Header>
                <Form onSubmit={handleDoneSubmit}>
                    <Form.Field>
                        <label>
                            やったことを入力してね
                            <Input
                                placeholder="宿題"
                                value={doneInput}
                                onChange={(e) => setDoneInput(e.target.value)}
                            />
                        </label>
                    </Form.Field>
                    <Form.Group widths="equal">
                        <label>
                            日付
                            <Form.Input
                                type="date"
                                value={doneDate}
                                onChange={(e) => setDoneDate(e.target.value)}
                            />
                        </label>
                        <label>
                            はじめた時間
                            <Form.Input
                                type="time"
                                value={doneStartTime}
                                onChange={(e) => setDoneStartTime(e.target.value)}
                            />
                        </label>
                        <label>
                            終わった時間
                            <Form.Input
                                type="time"
                                value={doneEndTime}
                                onChange={(e) => setDoneEndTime(e.target.value)}
                            />
                        </label>
                    </Form.Group>
                    <Button type="submit" primary>送信</Button>
                </Form>
                <List divided relaxed>
                    {doneList.map((done) => (
                        <List.Item key={done.id}>
                            <List.Content>
                                <List.Header>{done.text}</List.Header>
                                {done.date} {done.startTime} から {done.endTime} まで ({done.elapsedTime})
                                <Button onClick={() => handleDeleteDone(done.id)} color="red" floated="right">削除</Button>
                            </List.Content>
                        </List.Item>
                    ))}
                </List>
            </Segment>
            <Button onClick={handleNavigate}>まとまったものはこちら</Button>
        </Container>
    );
}
