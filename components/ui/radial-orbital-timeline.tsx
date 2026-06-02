"use client";
import { useState, useEffect, useRef } from "react";
import { ArrowRight, Link, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  content: string;
  category: string;
  icon: React.ElementType;
  relatedIds: number[];
  status: "completed" | "in-progress" | "pending";
  energy: number;
}

interface RadialOrbitalTimelineProps {
  timelineData: TimelineItem[];
  /** Rendered inside the central node — e.g. a brand mark. Falls back to a glass dot. */
  centerContent?: React.ReactNode;
  /** Small uppercase label shown beneath the central node. */
  centerLabel?: string;
  /** Override the root container classes (e.g. height) — merged via cn. */
  className?: string;
}

export default function RadialOrbitalTimeline({
  timelineData,
  centerContent,
  centerLabel,
  className,
}: RadialOrbitalTimelineProps) {
  const [expandedItems, setExpandedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [viewMode, setViewMode] = useState<"orbital">("orbital");
  const [rotationAngle, setRotationAngle] = useState<number>(0);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [pulseEffect, setPulseEffect] = useState<Record<number, boolean>>({});
  const [centerOffset, setCenterOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [activeNodeId, setActiveNodeId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Record<number, HTMLDivElement | null>>({});

  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === containerRef.current || e.target === orbitRef.current) {
      setExpandedItems({});
      setActiveNodeId(null);
      setPulseEffect({});
      setAutoRotate(true);
    }
  };

  const toggleItem = (id: number) => {
    setExpandedItems((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        if (parseInt(key) !== id) {
          newState[parseInt(key)] = false;
        }
      });

      newState[id] = !prev[id];

      if (!prev[id]) {
        setActiveNodeId(id);
        setAutoRotate(false);

        const relatedItems = getRelatedItems(id);
        const newPulseEffect: Record<number, boolean> = {};
        relatedItems.forEach((relId) => {
          newPulseEffect[relId] = true;
        });
        setPulseEffect(newPulseEffect);

        centerViewOnNode(id);
      } else {
        setActiveNodeId(null);
        setAutoRotate(true);
        setPulseEffect({});
      }

      return newState;
    });
  };

  useEffect(() => {
    let rotationTimer: NodeJS.Timeout;

    if (autoRotate && viewMode === "orbital") {
      rotationTimer = setInterval(() => {
        setRotationAngle((prev) => {
          const newAngle = (prev + 0.36) % 360;
          return Number(newAngle.toFixed(3));
        });
      }, 50);
    }

    return () => {
      if (rotationTimer) {
        clearInterval(rotationTimer);
      }
    };
  }, [autoRotate, viewMode]);

  const centerViewOnNode = (nodeId: number) => {
    if (viewMode !== "orbital" || !nodeRefs.current[nodeId]) return;

    const nodeIndex = timelineData.findIndex((item) => item.id === nodeId);
    const totalNodes = timelineData.length;
    const targetAngle = (nodeIndex / totalNodes) * 360;

    setRotationAngle(270 - targetAngle);
  };

  const calculateNodePosition = (index: number, total: number) => {
    const angle = ((index / total) * 360 + rotationAngle) % 360;
    const radius = 200;
    const radian = (angle * Math.PI) / 180;

    // Round to fixed precision: Math.cos/sin are not bit-identical across the
    // SSR (Node) and client (V8) engines, so emitting raw floats into inline
    // styles causes hydration mismatches. Fixed precision makes both match.
    const x = Number((radius * Math.cos(radian) + centerOffset.x).toFixed(3));
    const y = Number((radius * Math.sin(radian) + centerOffset.y).toFixed(3));

    const zIndex = Math.round(100 + 50 * Math.cos(radian));
    const opacity = Number(
      Math.max(
        0.4,
        Math.min(1, 0.4 + 0.6 * ((1 + Math.sin(radian)) / 2))
      ).toFixed(3)
    );

    return { x, y, angle, zIndex, opacity };
  };

  const getRelatedItems = (itemId: number): number[] => {
    const currentItem = timelineData.find((item) => item.id === itemId);
    return currentItem ? currentItem.relatedIds : [];
  };

  const isRelatedToActive = (itemId: number): boolean => {
    if (!activeNodeId) return false;
    const relatedItems = getRelatedItems(activeNodeId);
    return relatedItems.includes(itemId);
  };

  const getStatusStyles = (status: TimelineItem["status"]): string => {
    switch (status) {
      case "completed":
        return "text-white bg-emerald-400 border-emerald-300";
      case "in-progress":
        return "text-emerald-700 bg-emerald-50 border-emerald-200";
      case "pending":
        return "text-ink-500 bg-ink-100 border-ink-200";
      default:
        return "text-ink-500 bg-ink-100 border-ink-200";
    }
  };

  return (
    <div
      className={cn(
        "w-full h-screen flex flex-col items-center justify-center bg-transparent overflow-hidden",
        className
      )}
      ref={containerRef}
      onClick={handleContainerClick}
    >
      <div className="relative w-full max-w-4xl h-full flex items-center justify-center">
        <div
          className="absolute w-full h-full flex items-center justify-center"
          ref={orbitRef}
          style={{
            perspective: "1000px",
            transform: `translate(${centerOffset.x}px, ${centerOffset.y}px)`,
          }}
        >
          <div className="absolute flex flex-col items-center justify-center z-10">
            <div className="relative w-20 h-20 rounded-full bg-gradient-to-br from-emerald-300 via-emerald-500 to-emerald-700 flex items-center justify-center shadow-[0_0_44px_-6px_rgba(28,191,101,0.7)]">
              <div className="absolute w-24 h-24 rounded-full border border-emerald-300/30 animate-ping opacity-70"></div>
              <div
                className="absolute w-28 h-28 rounded-full border border-emerald-300/15 animate-ping opacity-50"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div className="grid place-items-center w-14 h-14 rounded-full bg-white/90 backdrop-blur-md ring-1 ring-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]">
                {centerContent ?? (
                  <div className="w-8 h-8 rounded-full bg-ink-900/80 backdrop-blur-md"></div>
                )}
              </div>
            </div>
            {centerLabel && (
              <span className="mt-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-ink-500">
                {centerLabel}
              </span>
            )}
          </div>

          {/* Diameter must equal the node orbit radius (200) * 2 so node
              centers always sit exactly on this line, not drifting off it. */}
          <div className="absolute w-[400px] h-[400px] rounded-full border border-ink-950/10"></div>

          {timelineData.map((item, index) => {
            const position = calculateNodePosition(index, timelineData.length);
            const isExpanded = expandedItems[item.id];
            const isRelated = isRelatedToActive(item.id);
            const isPulsing = pulseEffect[item.id];
            const Icon = item.icon;

            const nodeStyle = {
              transform: `translate(${position.x}px, ${position.y}px)`,
              zIndex: isExpanded ? 200 : position.zIndex,
              opacity: isExpanded ? 1 : position.opacity,
            };

            return (
              <div
                key={item.id}
                ref={(el) => {
                  nodeRefs.current[item.id] = el;
                }}
                className={`absolute cursor-pointer ${
                  autoRotate
                    ? // While spinning, track the target tightly so nodes stay
                      // centered on the ring. A long transition eases along a
                      // chord and pulls the node inside the line.
                      "transition-transform duration-75 ease-linear"
                    : "transition-all duration-700"
                }`}
                style={nodeStyle}
                onClick={(e) => {
                  e.stopPropagation();
                  toggleItem(item.id);
                }}
              >
                <div
                  className={`absolute rounded-full -inset-1 ${
                    isPulsing ? "animate-pulse duration-1000" : ""
                  }`}
                  style={{
                    background: `radial-gradient(circle, rgba(28,191,101,0.28) 0%, rgba(28,191,101,0) 70%)`,
                    width: `${item.energy * 0.5 + 40}px`,
                    height: `${item.energy * 0.5 + 40}px`,
                    left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                    top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
                  }}
                ></div>

                <div
                  className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  ${
                    isExpanded
                      ? "bg-emerald-400 text-white"
                      : isRelated
                      ? "bg-emerald-400/15 text-emerald-700"
                      : "bg-white text-ink-950"
                  }
                  border-2
                  ${
                    isExpanded
                      ? "border-emerald-300 shadow-lg shadow-emerald-400/40"
                      : isRelated
                      ? "border-emerald-300 animate-pulse"
                      : "border-ink-950/15 shadow-[0_4px_14px_-6px_rgba(10,13,16,0.4)]"
                  }
                  transition-all duration-300 transform
                  ${isExpanded ? "scale-150" : ""}
                `}
                >
                  <Icon size={16} />
                </div>

                <div
                  className={`
                  absolute top-12  whitespace-nowrap
                  text-xs font-semibold tracking-wider
                  transition-all duration-300
                  ${isExpanded ? "text-ink-950 scale-125" : "text-ink-500"}
                `}
                >
                  {item.title}
                </div>

                {isExpanded && (
                  <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white/90 backdrop-blur-lg border-ink-950/10 shadow-[0_20px_50px_-16px_rgba(10,13,16,0.35)] overflow-visible">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-emerald-400/60"></div>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <Badge
                          className={`px-2 text-xs ${getStatusStyles(
                            item.status
                          )}`}
                        >
                          {item.status === "completed"
                            ? "LIVE"
                            : item.status === "in-progress"
                            ? "BETA"
                            : "BUILDING"}
                        </Badge>
                        <span className="text-xs font-mono text-ink-400">
                          {item.date}
                        </span>
                      </div>
                      <CardTitle className="text-sm mt-2 text-ink-950">
                        {item.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="text-xs text-ink-600">
                      <p>{item.content}</p>

                      <div className="mt-4 pt-3 border-t border-ink-950/10">
                        <div className="flex justify-between items-center text-xs mb-1">
                          <span className="flex items-center text-ink-500">
                            <Zap size={10} className="mr-1" />
                            Energy Level
                          </span>
                          <span className="font-mono text-ink-700">{item.energy}%</span>
                        </div>
                        <div className="w-full h-1 bg-ink-950/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-emerald-500 to-emerald-300"
                            style={{ width: `${item.energy}%` }}
                          ></div>
                        </div>
                      </div>

                      {item.relatedIds.length > 0 && (
                        <div className="mt-4 pt-3 border-t border-ink-950/10">
                          <div className="flex items-center mb-2">
                            <Link size={10} className="text-emerald-600 mr-1" />
                            <h4 className="text-xs uppercase tracking-wider font-medium text-ink-500">
                              Connected Nodes
                            </h4>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {item.relatedIds.map((relatedId) => {
                              const relatedItem = timelineData.find(
                                (i) => i.id === relatedId
                              );
                              return (
                                <Button
                                  key={relatedId}
                                  variant="outline"
                                  size="sm"
                                  className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-ink-950/15 bg-transparent hover:bg-emerald-50 hover:border-emerald-300 text-ink-600 hover:text-ink-950 transition-all"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    toggleItem(relatedId);
                                  }}
                                >
                                  {relatedItem?.title}
                                  <ArrowRight
                                    size={8}
                                    className="ml-1 text-ink-400"
                                  />
                                </Button>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
