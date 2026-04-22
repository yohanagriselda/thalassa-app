"use client";

type LiveMapSectionProps = {
  onBack: () => void;
};

export default function LiveMapSection({ onBack }: LiveMapSectionProps) {
  return (
    <section className="vessel-detail-page">
      <div className="vessel-detail-header">
        <button
          type="button"
          className="icon-btn"
          onClick={onBack}
        >
          ←
        </button>

        <div>
          <h2>LIVE MAP TRACKING</h2>
          <p>Real-time GPS positions of all fleet vessels</p>
        </div>

        <div className="live-pill">LIVE</div>
      </div>

      <div className="empty-state">Map component will be added next.</div>
    </section>
  );
}