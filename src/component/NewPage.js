import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Header, List, Segment } from 'semantic-ui-react';

export default function NewPage() {
    const [goalList, setGoalList] = useState([]);
    const [doneList, setDoneList] = useState([]);
    const navigate = useNavigate();

    // コンポーネントがマウントされたときにローカルストレージからデータを読み込む
    useEffect(() => {
        const savedGoals = JSON.parse(localStorage.getItem('goals')) || [];
        const savedDones = JSON.parse(localStorage.getItem('dones')) || [];
        setGoalList(savedGoals);
        setDoneList(savedDones);
    }, []);

    // やりたいことの削除
    const handleGoalDelete = (id) => {
        const updatedGoalList = goalList.filter(goal => goal.id !== id);
        setGoalList(updatedGoalList);
        localStorage.setItem('goals', JSON.stringify(updatedGoalList)); // ローカルストレージに保存
    };

    // やったことの削除
    const handleDoneDelete = (id) => {
        const updatedDoneList = doneList.filter(done => done.id !== id);
        setDoneList(updatedDoneList);
        localStorage.setItem('dones', JSON.stringify(updatedDoneList)); // ローカルストレージに保存
    };

    return (
        <div>
            <Segment>
                <Header as="h1">まとめページ</Header>
                <div>
                    <Header as="h2">やりたいこと</Header>
                    <List divided relaxed>
                        {goalList.map((goal) => (
                            <List.Item key={goal.id}>
                                <List.Content>
                                    <List.Header>{goal.text}</List.Header>
                                    <List.Description>
                                        {goal.startTime} から {goal.endTime} まで ({goal.elapsedTime})
                                    </List.Description>
                                    <Button onClick={() => handleGoalDelete(goal.id)} color="red" floated="right">削除</Button>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </div>
                <div>
                    <Header as="h2">やったこと</Header>
                    <List divided relaxed>
                        {doneList.map((done) => (
                            <List.Item key={done.id}>
                                <List.Content>
                                    <List.Header>{done.text}</List.Header>
                                    <List.Description>
                                        {done.startTime} から {done.endTime} まで ({done.elapsedTime})
                                    </List.Description>
                                    <Button onClick={() => handleDoneDelete(done.id)} color="red" floated="right">削除</Button>
                                </List.Content>
                            </List.Item>
                        ))}
                    </List>
                </div>
                <Button onClick={() => navigate(-1)} color="blue">戻る</Button>
            </Segment>
        </div>
    );
}
