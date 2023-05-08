import { useEffect, useMemo, useRef, useState } from "react";

export default function useOnScreen() {
  const ref = useRef<HTMLDivElement>(null);

  const [isIntersecting, setIntersecting] = useState(false);
  const observer = useMemo(
    () =>
      new IntersectionObserver(
        ([entry]) => setIntersecting(entry.isIntersecting),

        { threshold: 1 }
      ),
    []
  );

  useEffect(() => {
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observer]);

  return [isIntersecting, ref] as const;
}
