import TweetItem from "../TweetItem";
import type { Tweet } from "../../types";
import styles from "./TweetList.module.css";

interface TweetListProps {
  tweets: Tweet[];
  lastTweetId: string | null;
}

export default function TweetList({ tweets, lastTweetId }: TweetListProps) {
  return (
    <ul className={styles.feed}>
      {tweets.map((tweet) => (
        <TweetItem
          author={tweet.author_id}
          text={tweet.text}
          time={tweet.time}
          isNew={tweet.id === lastTweetId}
        />
      ))}
    </ul>
  );
}
