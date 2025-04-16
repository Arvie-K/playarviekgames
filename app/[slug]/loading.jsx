import styles from '../styles/GamePage.module.css';
import skeletonStyles from '../styles/Skeleton.module.css'; // Keep this import
import Navbar from "../components/navbar";

export default function Loading() {
  // Skeleton structure mimicking GameClient.jsx layout
  return (
    <>
    <Navbar />
    
    <div className={styles.layout}>
      <div className={styles.ads}>
        {/* Ad skeleton placeholder */}
        <div className={skeletonStyles.skeletonBox} style={{ height: '600px', width: '160px' }}></div>
      </div>
      <div className={styles.gameframe}>
        {/* Game iframe skeleton */}
        <div className={styles.box}>
           <div className={skeletonStyles.skeletonBox} style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}></div>
        </div>
        {/* Action bar skeleton */}
        <div className={styles.bar}>
          <div className={styles.title}>
            <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '60%', height: '24px', marginBottom: '8px' }}></div>
            <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '40%', height: '16px' }}></div>
          </div>
          <div className={styles.actions}>
            <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonCircle}`} style={{ width: '30px', height: '30px', marginLeft: '10px' }}></div>
            <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonCircle}`} style={{ width: '30px', height: '30px', marginLeft: '10px' }}></div>
          </div>
        </div>
        {/* Bottom section skeleton */}
        <div className={styles.bottomSection}>
           {/* Devlog skeleton (optional, depends if it's always there) */}
           <div className={styles.devlog}>
               <div className={skeletonStyles.skeletonBox} style={{ paddingTop: '56.25%' /* 16:9 Aspect Ratio */ }}></div>
           </div>
           {/* Description/Controls skeleton */}
           <div className={styles.description}>
                <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '30%', height: '20px', marginBottom: '15px' }}></div>
                <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '90%', height: '16px', marginBottom: '8px' }}></div>
                <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '80%', height: '16px', marginBottom: '8px' }}></div>
                <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '85%', height: '16px', marginBottom: '25px' }}></div>

                <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '25%', height: '20px', marginBottom: '15px' }}></div>
                <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '70%', height: '16px', marginBottom: '8px' }}></div>
                <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '60%', height: '16px', marginBottom: '8px' }}></div>
           </div>
        </div>
      </div>
      <div className={styles.games}>
        {/* More Games skeleton */}
        <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '40%', height: '24px', marginBottom: '15px' }}></div>
        <div className={styles.gamesGrp}>
          {/* Render a few game card skeletons */}
          {[...Array(6)].map((_, i) => (
              <div key={i} className={skeletonStyles.skeletonGameCard}>
               <div className={skeletonStyles.skeletonBox} style={{ paddingTop: '75%' /* Adjust aspect ratio */ }}></div>
               <div className={`${skeletonStyles.skeletonBox} ${skeletonStyles.skeletonText}`} style={{ width: '80%', height: '18px', marginTop: '8px' }}></div>
            </div>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
