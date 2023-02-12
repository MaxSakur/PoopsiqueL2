import styles from "./Column.module.css";

const Column = ({ headContent, bodyContent, iconLeft, iconRight }) => {
  return (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.head_button}>{iconLeft}</div>
        <div className={styles.head_content}>{headContent}</div>

        <div className={styles.head_button}>{iconRight}</div>
      </div>
      <div className={styles.body}>{bodyContent}</div>
    </div>
  );
};

export default Column;
