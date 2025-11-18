import * as THREE from "three";

const SCREEN_KEYWORDS = [
  "screen",
  "display",
  "lcd",
  "oled",
  "glass",
  "panel",
  "front",
  "screen_mat",
  "display_mat",
  "screen_glass",
];

function computeBoundingBoxArea(mesh) {
  const bounds = new THREE.Box3().setFromObject(mesh);
  const size = new THREE.Vector3();
  bounds.getSize(size);
  const area = size.x * size.y;
  const depth = size.z;
  return { area, size, depth };
}

export function findScreenMesh(scene) {
  if (!scene) return null;

  const candidates = [];

  scene.traverse((child) => {
    if (!child.isMesh) return;

    const name = (child.name || "").toLowerCase();
    const materialName = child.material?.name?.toLowerCase?.() ?? "";
    const matchKeyword = SCREEN_KEYWORDS.some(
      (keyword) => name.includes(keyword) || materialName.includes(keyword),
    );

    const { area, size, depth } = computeBoundingBoxArea(child);

    if (!Number.isFinite(area) || area <= 0) return;

    const aspect = size.x && size.y ? size.x / size.y : 0;
    const thin = depth < Math.min(size.x, size.y) * 0.4; // screens are usually thin

    let score = 0;

    if (matchKeyword) {
      score += 50;
    }

    if (thin) {
      score += 10;
    }

    if (aspect > 0.2 && aspect < 1.8) {
      score += 10;
    }

    // Larger surface area is typically the primary display
    score += area;

    if (score > 0) {
      candidates.push({ mesh: child, score });
    }
  });

  if (candidates.length === 0) return null;

  candidates.sort((a, b) => b.score - a.score);
  return candidates[0].mesh;
}

export function applyScreenTexture(
  mesh,
  texture,
  {
    emissiveColor = "#ffffff",
    emissiveIntensity = 0.4,
    fallbackColor = "#111111",
  } = {},
) {
  if (!mesh) return null;

  const originalMaterial = mesh.material;
  const material = originalMaterial?.clone ? originalMaterial.clone() : originalMaterial;

  if (texture) {
    texture.encoding = THREE.sRGBEncoding;
    texture.flipY = false;
    material.map = texture;
    material.emissiveMap = texture;
    material.emissive = new THREE.Color(emissiveColor);
    material.emissiveIntensity = emissiveIntensity;
    material.toneMapped = false;
    material.color = new THREE.Color("#ffffff");
  } else {
    material.map = null;
    material.emissiveMap = null;
    material.emissive = new THREE.Color("#000000");
    material.emissiveIntensity = 0;
    material.color = new THREE.Color(fallbackColor);
  }

  mesh.material = material;

  return () => {
    mesh.material = originalMaterial;
    if (material !== originalMaterial && material.dispose) {
      material.dispose();
    }
  };
}

export function loadTexture(url, onLoad, onError) {
  if (!url) {
    onError?.();
    return () => {};
  }

  const loader = new THREE.TextureLoader();
  let disposed = false;
  let textureRef = null;

  loader.load(
    url,
    (texture) => {
      if (disposed) {
        texture.dispose();
        return;
      }
      texture.encoding = THREE.sRGBEncoding;
      texture.flipY = false;
      textureRef = texture;
      onLoad?.(texture);
    },
    undefined,
    (error) => {
      if (!disposed) {
        console.warn(`Texture failed to load: ${url}`, error);
        onError?.(error);
      }
    },
  );

  return () => {
    disposed = true;
    if (textureRef) {
      textureRef.dispose();
    }
  };
}
