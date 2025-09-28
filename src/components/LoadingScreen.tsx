import { useEffect, useState } from 'react';
import { motion as m } from 'motion/react';
import type { LoadingScreenProps } from '@/types';
import '@/styles/components/loading.scss';

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 12;
        if (next >= 100) {
          clearInterval(interval);
          setIsDone(true);
          return 100;
        }
        return next;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [onComplete]);

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const barVariants = {
    initial: {
      backgroundColor: '#ccc',
      scaleY: 1,
    },
    animate: {
      backgroundColor: '#4fc3f7',
      scaleY: 1,
      transition: {
        duration: 0.5,
        repeat: Infinity,
        repeatType: 'mirror' as const,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="loading-container">
      <m.div
        className="loading-container__up"
        initial={{ height: '50%' }}
        animate={isDone ? { height: 0 } : { height: '50%' }}
        transition={{ duration: 0.5, ease: [0.79, 0, 0.51, 0.99] }}
      />
      <m.div
        className="loading-container__down"
        initial={{ height: '50%' }}
        animate={isDone ? { height: 0 } : { height: '50%' }}
        transition={{
          duration: 0.5,
          ease: [0.79, 0, 0.51, 0.99],
        }}
        onAnimationComplete={() => {
          if (isDone) onComplete();
        }}
      />
      <m.div
        className="loading-content"
        initial={{ opacity: 1 }}
        animate={
          isDone
            ? {
                opacity: 0,
                scaleY: 0,
                transition: {
                  duration: 0.2,
                  ease: [0.25, 1, 0.5, 1],
                },
              }
            : { opacity: 1 }
        }
        transition={{ duration: 0.1 }}>
        <p className="loading-text text-en">initializing...</p>
        <m.div
          className="progress-bar"
          variants={containerVariants}
          initial="initial"
          animate="animate">
          {[...Array(15)].map((_, i) => (
            <m.div key={i} className="bar" variants={barVariants} />
          ))}
        </m.div>
        <p className="loading-percent">{progress}%</p>
      </m.div>
    </div>
  );
};

export default LoadingScreen;
