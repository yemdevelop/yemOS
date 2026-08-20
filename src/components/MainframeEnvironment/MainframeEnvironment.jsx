import styles from "./MainframeEnvironment.module.css";

const MainframeEnvironment = () => {
  return (
    <div
        className={styles.environment}
        aria-hidden="true"
    >
        <div className={styles.atmosphere} />

        <div className={styles.energyBloom}>
            <div className={styles.cyanBloom} />
            <div className={styles.violetBloom} />
            <div className={styles.orangeBloom} />
            <div className={styles.greenBloom} />
        </div>

        <div className={styles.processor}>
            <div className={styles.outerRing} />
            <div className={styles.innerRing} />
            <div className={styles.middleRing} />
            <div className={styles.energyCore} />
        </div>

        <div className={styles.circuitField} />
        <div className={styles.energySweep} />
        <div className={styles.grain} />

    </div>
  )
}

export default MainframeEnvironment