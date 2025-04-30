import { useEffect, useState } from "react";
import axios from "axios";
import TweetForm from "../../components/TweetForm";
import TweetList from "../../components/TweetList";
import TopBar from "../../components/TopBar";
import styles from "./Tweets.module.css";
import { useNavigate } from "react-router-dom";
import { Tweet } from "../../types";

const Tweets = () => {
  const navigate = useNavigate();
  const [tweets, setTweets] = useState<Tweet[]>([]);
  const [lastTweetId, setLastTweetId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    fetchTweets();

    if (!user?.id) navigate("/login");
  }, [navigate, user.id]);

  const fetchTweets = async () => {
    const res = await axios.get("http://localhost:3001/tweets");
    setTweets(res.data.reverse());
  };

  const postTweet = async (text: string) => {
    if (text.length < 1 || text.length > 140) {
      setError("Tweet must be 1–140 characters");
      return;
    }

    const id = Date.now().toString();
    const time = new Date().toISOString();
    await axios.post("http://localhost:3001/tweets", {
      id,
      author_id: user.id,
      text,
      time,
    });

    setLastTweetId(id);
    setError("");
    fetchTweets();
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <TopBar name={user.name} />
        <h2 className={styles.header}>Tweets</h2>
        <TweetForm onSubmit={postTweet} error={error} />
        <TweetList tweets={tweets} lastTweetId={lastTweetId} />
      </div>
    </div>
  );
};

export default Tweets;
