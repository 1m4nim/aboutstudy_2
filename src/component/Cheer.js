import { useState } from "react";

export default function Cheer({ init }) {
    const [count, setCount] = useState(init);
    const handleClick = () => {
        if (count < 10) {
            setCount(count + 1);
        }
    };

    return (
        <>
            <button onClick={handleClick}>応援</button>
            {count < 10 ? (
                <p>{count}回、応援ボタンが押されました</p>
            ) : (
                <p>応援回数の上限に達しました</p>
            )}
        </>
    );
}
