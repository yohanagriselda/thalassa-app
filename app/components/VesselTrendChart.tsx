"use client";

type ChartPoint = {
  time: string;
  speed: number;
  fuel: number;
};

type VesselTrendChartProps = {
  data: ChartPoint[];
};

export default function VesselTrendChart({ data }: VesselTrendChartProps) {
  const max = 100;
  const speedPoints = data.map((item, index) => {
    const x = (index / Math.max(data.length - 1, 1)) * 100;
    const y = 100 - (item.speed / max) * 100;
    return `${x},${y}`;
  });

  const fuelPoints = data.map((item, index) => {
    const x = (index / Math.max(data.length - 1, 1)) * 100;
    const y = 100 - (item.fuel / max) * 100;
    return `${x},${y}`;
  });

  return (
    <div className="trend-chart-shell">
      <svg viewBox="0 0 100 100" className="trend-chart-svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="speedFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0" />
          </linearGradient>
          <linearGradient id="fuelFill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
          </linearGradient>
        </defs>

        <line x1="0" y1="80" x2="100" y2="80" stroke="rgba(255,255,255,0.05)" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="rgba(255,255,255,0.05)" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="rgba(255,255,255,0.05)" />
        <line x1="0" y1="20" x2="100" y2="20" stroke="rgba(255,255,255,0.05)" />

        <polyline
          fill="none"
          stroke="#38bdf8"
          strokeWidth="1.5"
          points={speedPoints.join(" ")}
        />
        <polyline
          fill="none"
          stroke="#facc15"
          strokeWidth="1.5"
          points={fuelPoints.join(" ")}
        />
      </svg>

      <div className="trend-legend">
        <span><i className="legend-dot speed" /> Speed</span>
        <span><i className="legend-dot fuel" /> Fuel %</span>
      </div>
    </div>
  );
}