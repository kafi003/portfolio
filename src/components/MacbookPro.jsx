import { Suspense, useEffect, useMemo, useState } from "react";
import MacbookModel from "./MacbookModel";
import { MacbookProFallback } from "./MacbookProFallback";

const DEFAULT_MODEL_PATH = "/macbook_m4.glb";

export function MacbookPro({ currentProject }) {
  const [modelStatus, setModelStatus] = useState("checking");

  const { modelPath, screenUrl, accentColor } = useMemo(() => {
    const path = currentProject?.modelPaths?.macbook || DEFAULT_MODEL_PATH;
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
    return <MacbookProFallback currentProject={currentProject} />;
  }

  return (
    <Suspense fallback={<MacbookProFallback currentProject={currentProject} />}>
      <MacbookModel modelPath={modelPath} screenUrl={screenUrl} accentColor={accentColor} />
    </Suspense>
  );
}
