import { useState } from "react";

export default function ProjectImage({ src, srcSet, sizes, alt, width, height, loading, className, unavailableLabel }) {
  const [failedSource, setFailedSource] = useState(null);

  if (failedSource === src) {
    return (
      <div role="img" aria-label={`${alt}: ${unavailableLabel}`}
        className={`grid place-items-center bg-midnight px-4 text-center text-sm text-neutral-400 ${className}`}
        style={{ aspectRatio: `${width} / ${height}` }}>
        {unavailableLabel}
      </div>
    );
  }

  return (
    <img src={src} srcSet={srcSet} sizes={sizes} alt={alt} width={width} height={height}
      loading={loading} decoding="async" className={className} onError={() => setFailedSource(src)} />
  );
}
