import { MotionValue, useMotionTemplate, useMotionValue } from 'framer-motion';
import { useCallback } from 'react';

interface UseCardAnimationProps {
  cardRef: React.RefObject<HTMLDivElement | null>;
}

interface UseCardAnimationReturn {
  rotateX: MotionValue<number>;

  rotateY: MotionValue<number>;

  spotlightX: ReturnType<typeof useMotionTemplate>;

  spotlightY: ReturnType<typeof useMotionTemplate>;

  handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;

  handleMouseLeave: () => void;
}

export const useCardAnimation = ({ cardRef }: UseCardAnimationProps): UseCardAnimationReturn => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const spotlightX = useMotionTemplate`${mouseX}px`;
  const spotlightY = useMotionTemplate`${mouseY}px`;

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current) return;

      const { left, top, width, height } = cardRef.current.getBoundingClientRect();

      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;

      mouseX.set(e.clientX - left);
      mouseY.set(e.clientY - top);

      rotateX.set((y - 0.5) * -14);
      rotateY.set((x - 0.5) * 14);
    },
    [cardRef, mouseX, mouseY, rotateX, rotateY]
  );

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return {
    rotateX,
    rotateY,
    spotlightX,
    spotlightY,
    handleMouseMove,
    handleMouseLeave,
  };
};
