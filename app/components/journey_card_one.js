import styles from "../page.module.css";

const CardOne = (props) => {
  const { fromStation, toStation } = props;

  return (
    <div className={styles.letterbox_journey}>
      <span>
        From: &nbsp;<strong>{props.fromStation}</strong>
      </span>

      <span>
        To:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <strong> {props.toStation}</strong>
      </span>
    </div>
  );
};

export default CardOne;
