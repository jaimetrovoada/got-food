import { useEffect, useMemo, useRef, useState } from "react";

export default function useOnScreen() {
  const ref = useRef<HTMLDivElement>(null);

  const [isIntersecting, setIntersecting] = useState(false);
  const observer = useRef(null);

  useEffect(() => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(
      ([entry]) => setIntersecting(entry.isIntersecting),
      { threshold: 1 }
    );
    const { current: currentObserver } = observer;
    currentObserver.observe(ref.current);
    return () => currentObserver.disconnect();
  }, [observer]);

  return [isIntersecting, ref] as const;
}
