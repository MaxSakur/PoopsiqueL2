import styles from "./Column.module.css";

const Column = ({
  headContent,
  bodyContent,
  iconLeft,
  iconRight,
  isOpen = true,
}) => {
  return isOpen ? (
    <div className={styles.container}>
      <div className={styles.head}>
        <div className={styles.head_button}>{iconLeft}</div>
        <div className={styles.head_content}>{headContent}</div>
        <div className={styles.head_button}>{iconRight}</div>
      </div>
      <div className={styles.body}>{bodyContent}</div>
    </div>
  ) : (
    <div className={styles.container_closed}>
      <div className={styles.head_closed}>
        <div className={styles.head_content}>{headContent}</div>
        <div className={styles.head_button}>{iconRight}</div>
      </div>
    </div>
  );
};

export default Column;
