import { useState } from "react";
import styles from "./TweetForm.module.css";

interface TweetFormProps {
  onSubmit: (text: string) => void;
  error?: string;
}

export default function TweetForm({ onSubmit, error }: TweetFormProps) {
  const [text, setText] = useState("");

  const handleSubmit = () => {
    if (text.trim().length === 0) return;
    onSubmit(text);
    setText("");
  };

  return (
    <div className={styles.tweetBox}>
      <textarea
        placeholder="What's happening?"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={styles.textarea}
      />
      {error && <p className={styles.error}>{error}</p>}
      <button onClick={handleSubmit} className={styles.button}>
        Tweet
      </button>
    </div>
  );
}
