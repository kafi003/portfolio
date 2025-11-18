import { Suspense, useEffect, useMemo, useState } from "react";
import { Iphone17Fallback } from "./Iphone17Fallback";
import IphoneModel from "./IphoneModel";

const DEFAULT_MODEL_PATH = "/iphone17.glb";

export function Iphone17({ currentProject }) {
  const [modelStatus, setModelStatus] = useState("checking");

  const { modelPath, screenUrl, accentColor } = useMemo(() => {
    const path = currentProject?.modelPaths?.iphone || DEFAULT_MODEL_PATH;
    const screen = currentProject?.screenTexture || currentProject?.screenshot;
    const color = currentProject?.color || "#ffffff";
    return { modelPath: path, screenUrl: screen, accentColor: color };
  }, [currentProject]);

  useEffect(() => {
    if (typeof window === "undefined") {
      setModelStatus("fallback");
      return;
    }

    let cancelled = false;
    setModelStatus("checking");

    fetch(modelPath, { method: "HEAD" })
      .then((res) => {
        if (cancelled) return;
        setModelStatus(res.ok ? "available" : "fallback");
      })
      .catch(() => {
        if (cancelled) return;
        setModelStatus("fallback");
      });

    return () => {
      cancelled = true;
    };
  }, [modelPath]);

  if (modelStatus !== "available") {
    return <Iphone17Fallback currentProject={currentProject} />;
  }

  return (
    <Suspense fallback={<Iphone17Fallback currentProject={currentProject} />}>
      <IphoneModel modelPath={modelPath} screenUrl={screenUrl} accentColor={accentColor} />
    </Suspense>
  );
}
