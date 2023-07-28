import Image from "next/image";
import hero from "./images/underground_wallpaper.jpg";
import styles from "../page.module.css";

export default function Hero() {
  return (
    <div className={styles.heroContainer}>
      <div className={styles.heroWrapper}>
        <Image
          src={hero}
          priority
          fill
          style={{ objectFit: "cover" }}
          alt="underground entrance"
        />
        <div className={styles.mask}></div>
      </div>
      <div className={styles.t3}>T3</div>
      <div className={styles.turbotubetrip}>TurboTubeTrip</div>
    </div>
  );
}
