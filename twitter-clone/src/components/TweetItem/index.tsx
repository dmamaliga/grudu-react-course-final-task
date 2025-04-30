import { formatDistanceToNow } from "date-fns";
import styles from "./TweetItem.module.css";
import DOMPurify from "dompurify";

interface TweetItemProps {
  author: string;
  text: string;
  time?: string;
  isNew?: boolean;
}

export default function TweetItem({
  author,
  text,
  time,
  isNew = false,
}: TweetItemProps) {
  const calculatedTime = formatDistanceToNow(new Date(time || new Date()), {
    addSuffix: true,
  });

  return (
    <li className={`${styles.tweet} ${isNew ? styles.newTweet : ""}`}>
      <div className={styles.avatar}>
        <img className={styles.avatar} src="/user.png" alt="user" />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
          <span className={styles.author}>@{author}</span>
          {calculatedTime && (
            <>
              <span className={styles.dot}>·</span>
              <span className={styles.time}>{calculatedTime}</span>
            </>
          )}
        </div>
        <div
          className={styles.text}
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(text),
          }}
        />
      </div>
    </li>
  );
}
