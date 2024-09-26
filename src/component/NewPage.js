import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography, List, Divider } from 'antd';

const { Title, Text } = Typography;

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
        <div style={{ padding: '20px' }}>
            <Title level={1}>まとめページ</Title>
            <Divider />
            <div>
                <Title level={2}>やりたいこと</Title>
                <List
                    bordered
                    dataSource={goalList}
                    renderItem={goal => (
                        <List.Item
                            actions={[<Button type="link" danger onClick={() => handleGoalDelete(goal.id)}>削除</Button>]}
                        >
                            <List.Item.Meta
                                title={goal.text}
                                description={`${goal.startTime} から ${goal.endTime} まで (${goal.elapsedTime})`}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <Divider />
            <div>
                <Title level={2}>やったこと</Title>
                <List
                    bordered
                    dataSource={doneList}
                    renderItem={done => (
                        <List.Item
                            actions={[<Button type="link" danger onClick={() => handleDoneDelete(done.id)}>削除</Button>]}
                        >
                            <List.Item.Meta
                                title={done.text}
                                description={`${done.startTime} から ${done.endTime} まで (${done.elapsedTime})`}
                            />
                        </List.Item>
                    )}
                />
            </div>
            <Button type="primary" onClick={() => navigate(-1)}>戻る</Button>
        </div>
    );
}
