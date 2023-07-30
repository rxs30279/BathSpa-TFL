import styles from "../page.module.css";

const CardTwoHeader = (props) => {
  const { startTime, arrivaltTime, duration, cost, charge_level } = props;

  return (
    <div>
      <div className={styles.train_times}>
        <span>
          {startTime} - {arrivaltTime}
        </span>
        <span>
          {duration}&nbsp; <small> mins</small>
        </span>
      </div>
      <span className={styles.cost_of_journey}>
        £{cost}&nbsp; {charge_level}
      </span>
    </div>
  );
};

export default CardTwoHeader;
