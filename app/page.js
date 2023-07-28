import Hero from "./components/hero";
import Input from "./components/input";
import styles from "./page.module.css";

export default function Home() {
  return (
    <main>
      <div className={styles.container}>
        <Hero />
        <Input />
      </div>
    </main>
  );
}
