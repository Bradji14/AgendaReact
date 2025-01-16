import Lottie from "lottie-react";
import animationData from "../lotties/load.json";

const LoadingPage = () => {

  const styles = {
    container: {
      position: 'relative',
      width: '100%',
      height: '100vh',
    },
    backgroundDiv: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      zIndex: 1,
    },
    overlayDiv: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: "rgba(34, 34, 34)", 
      zIndex: 2,
    },
    text: {
      position: 'absolute',
      top: '60%', 
      left: '50%', 
      transform: 'translate(-50%, -90%)', 
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      padding: '10px',
      borderRadius: '5px',
    },
    textContent: {
      margin: 0,
      fontSize: '18px', 
      color: '#333',
    },
  };

  return (
    <div style={styles.overlayDiv}>
      <div style={{ width: '100%', height: '100vh', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Lottie 
          animationData={animationData} 
          loop={true} 
          autoplay={true} 
          style={{ maxWidth: '15%', maxHeight: '15%' }}
        />
     
      </div>
    </div>
  );
};

export default LoadingPage;
// background: "rgba(34, 34, 34, 0.7)", // Fondo gris oscuro con 70% de opacidad
