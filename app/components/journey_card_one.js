import styles from "../page.module.css";

const CardOne = (props) => {
  const { fromStation, toStation } = props;

  return (
    <div className={styles.letterbox_journey}>
      <span>
        From: &nbsp;<strong>{fromStation}</strong>
      </span>

      <span>
        To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <strong> {toStation}</strong>
      </span>
    </div>
  );
};

export default CardOne;
