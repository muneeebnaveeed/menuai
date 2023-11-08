import { useState, FC, PropsWithChildren } from "react";
import { useWindowEventListener } from "rooks";

const getIsCorrectViewportSize = () => {
  return window.innerWidth === 1920 && window.innerHeight === 1080;
};

const ViewportGaurd: FC<PropsWithChildren> = ({ children }) => {
  const [shouldRenderView, setShouldRenderView] = useState<boolean>(() => getIsCorrectViewportSize());

  useWindowEventListener("resize", () => {
    const isCorrectViewportSize = getIsCorrectViewportSize();
    if (isCorrectViewportSize && !shouldRenderView) setShouldRenderView(true);
    else if (!isCorrectViewportSize && shouldRenderView) setShouldRenderView(false);
  });

  if (shouldRenderView) return <>{children}</>;

  return (
    <div className="w-screen h-screen flex items-center justify-center">
      <h1 className="text-independant-grey-active text-4xl font-bold">Please set the viewport to 1920x1080</h1>
    </div>
  );
};

export default ViewportGaurd;
