import { Box } from 'components/Box';
import {
  MODAL_COMPACT_SIZE,
  MODAL_SIZE,
  PHONE_SIZE,
  compactModalWrapper,
  heroWrapper,
  modalWrapper,
  phoneWrapper,
} from './index.css';

export const Hero: React.FC = () => {
  return (
    <Box position="relative">
      <Box
        backgroundColor="yellow70"
        position="absolute"
        style={{
          borderRadius: '100%',
          filter: 'blur(150px)',
          height: '80%',
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
          width: '50vw',
          zIndex: '1',
        }}
      />
      <Box marginX="auto" position="relative" style={{ zIndex: '2' }}>
        <Box className={heroWrapper}>
          <Box className={modalWrapper}>
            <img
              height={MODAL_SIZE.height}
              src="/hero-modal.png"
              width={MODAL_SIZE.width}
              style={{ maxWidth: '100%', height: 'auto' }}
              srcSet="/hero-modal.png 1x, /hero-modal@2x.png 2x, /hero-modal@3x.png 3x"
              sizes="(max-width: 800px) 100vw, 800px"
            />
          </Box>
          <Box className={compactModalWrapper}>
            <img
              height={MODAL_COMPACT_SIZE.height}
              src="/hero-compact.png"
              width={MODAL_COMPACT_SIZE.width}
              style={{ maxWidth: '100%', height: 'auto' }}
              srcSet="/hero-compact.png 1x, /hero-compact@2x.png 2x, /hero-compact@3x.png 3x"
              sizes="(max-width: 410px) 100vw, 410px"
            />
          </Box>
          <Box className={phoneWrapper}>
            <img
              height={PHONE_SIZE.height}
              src="/hero-iphone.png"
              width={PHONE_SIZE.width}
              style={{ maxWidth: '100%', height: 'auto' }}
              srcSet="/hero-iphone.png 1x, /hero-iphone@2x.png 2x, /hero-iphone@3x.png 3x"
              sizes="(max-width: 320px) 100vw, 320px"
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
