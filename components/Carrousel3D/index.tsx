"use client";
import React, { useState, useEffect, useCallback, useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

export type Carousel3DProps<T> = {
  /** Ancho de cada carta en px */
  cardWidth?: number;
  /** Alto del contenedor en px */
  height?: number;
  /** Intervalo en ms para autoplay */
  autoPlayInterval?: number;

  /** Datos para el renderizado de las cartas */
  data: T[];
  /** Función para renderizar cada carta */
  RenderItem: React.FC<T & { width: number; height: number }>;

  /** Número de cartas visibles a la vez */
  visibleCount?: number;
  /** Espaciado horizontal (%) entre las cartas visibles */
  spacingPercent?: number;
};

const CardCarousel3D = <T,>({
  cardWidth = 200,
  height = 500,
  autoPlayInterval,
  data,
  RenderItem,
  visibleCount = 3,
  spacingPercent: spacingPercentProp,
}: Carousel3DProps<T>) => {
  const count = data.length;
  const [activeIndex, setActiveIndex] = useState(Math.floor(count / 2));
  const [isAnimating, setIsAnimating] = useState(false);
  const timeouts = useRef<NodeJS.Timeout[]>([]);

  const slideDuration = 600;
  const spacing =
    spacingPercentProp !== undefined
      ? spacingPercentProp
      : 100 / (visibleCount + 1);

  const isEvenCount = visibleCount % 2 === 0;
  const offsetBase = isEvenCount ? 0.5 : 0;
  const halfRange = isEvenCount
    ? visibleCount / 2
    : Math.floor(visibleCount / 2);

  const cleanupTimeouts = () => {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
  };

  const animateToIndex = useCallback(
    (newIndex: number) => {
      if (isAnimating) return;
      setIsAnimating(true);
      cleanupTimeouts();
      setActiveIndex(newIndex);
      timeouts.current.push(
        setTimeout(() => setIsAnimating(false), slideDuration)
      );
    },
    [isAnimating]
  );

  const handlePrev = useCallback(
    () => animateToIndex((activeIndex - 1 + count) % count),
    [activeIndex, animateToIndex, count]
  );
  const handleNext = useCallback(
    () => animateToIndex((activeIndex + 1) % count),
    [activeIndex, animateToIndex, count]
  );

  useEffect(() => {
    if (!autoPlayInterval) return;
    const id = setInterval(() => {
      if (!isAnimating) handleNext();
    }, autoPlayInterval);
    return () => clearInterval(id);
  }, [autoPlayInterval, isAnimating, handleNext]);

  useEffect(() => () => cleanupTimeouts(), []);

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{ width: "100%", height: `${height}px` }}
    >
      <div
        className="relative w-full perspective"
        style={{ width: "100%", height: `${height}px` }}
      >
        {data.map((item, idx) => {
          // 1) Offset entero circular
          let rawOffset = idx - activeIndex;
          if (rawOffset > Math.floor(count / 2)) rawOffset -= count;
          if (rawOffset < -Math.floor(count / 2)) rawOffset += count;

          // 2) Offset final
          const offset = rawOffset + offsetBase;
          const absOffset = Math.abs(offset);

          // 3) Visibilidad exacta para pares
          const visible = absOffset <= halfRange;
          const opacity = visible ? 1 : 0;

          // 4) zIndex entero
          let zIndexValue = Math.round((halfRange - absOffset) * 100);
          // si cae por debajo de 0, lo forzamos a 0
          zIndexValue = Math.max(zIndexValue, 0);

          // 5) Transformaciones 3D
          const rotateY = offset * 15;
          const translateZ = -Math.abs(offset) * 5;
          const leftPercent = 50 + offset * spacing;

          // 6) Sin scale si es par
          const scale = isEvenCount ? 1 : offset === 0 ? 1 : 0.8;

          const style: React.CSSProperties = {
            position: "absolute",
            top: "50%",
            left: `${leftPercent}%`,
            width: `${cardWidth}px`,
            height: `${height}px`,
            transformStyle: "preserve-3d",
            backfaceVisibility: "hidden",
            transform: `translate(-50%, -50%) 
                        rotateY(${rotateY}deg) 
                        translateZ(${translateZ}vw) 
                        scale(${scale})`,
            transition: `transform ${slideDuration}ms ease-in-out, 
                         opacity ${slideDuration}ms ease-in-out, 
                         left ${slideDuration}ms ease-in-out`,
            opacity,
            zIndex: zIndexValue,
            pointerEvents: visible ? "auto" : "none",
          };

          return (
            <div
              key={idx}
              className="transform-gpu transition-all ease-in-out"
              style={style}
            >
              <RenderItem {...item} width={cardWidth} height={height} />
            </div>
          );
        })}
      </div>

      <button
        onClick={handlePrev}
        disabled={isAnimating}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 text-white disabled:opacity-50"
      >
        <ArrowLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        disabled={isAnimating}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-800 text-white disabled:opacity-50"
      >
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};

export default CardCarousel3D;
