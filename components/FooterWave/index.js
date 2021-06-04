import { useState, useEffect } from 'react';
import { FooterWave} from './styles';
import theme from "../../styles/theme";

export default () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setAnimated(true);
    }, 2000);
  }, [])

  return (
      <FooterWave fill="url(#gradient)"
        paused={true}
        options={{
          amplitude: 20,
          speed: 0.7,
          points: 3
        }}
      >
        <defs>
          <linearGradient id="gradient" gradientTransform="rotate(0)">
            <stop offset="60%"  stopColor="#9d4edd" />
            <stop offset="100%" stopColor="#03045e" />
          </linearGradient>
        </defs>
      </FooterWave>
  );
}