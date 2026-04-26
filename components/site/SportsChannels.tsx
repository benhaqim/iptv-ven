const CHANNEL_LOGOS = [
  "small.avif", "small1.avif", "small2.avif", "small3.avif", "small4.avif", "small5.png",
  "small6.avif", "small7.avif", "small8.avif", "small9.avif", "small10.avif", "small11.avif",
  "small12.avif", "small13.png", "small14.png", "small15.avif", "small16.avif", "small17.avif",
  "small18.avif", "small19.avif", "small20.avif", "small21.avif", "small22.avif", "small23.avif",
  "small24.avif", "small25.avif", "small26.avif", "small27.avif", "small28.png", "small29.avif",
  "small30.avif", "small31.avif", "small32.avif", "small33.avif", "small34.avif", "small35.avif",
  "small36.avif", "small37.avif", "small38.avif", "small39.png", "small40.avif", "small41.avif",
  "small42.avif", "small43.avif", "small44.avif", "small45.avif", "small46.avif", "small47.avif",
  "small48.avif", "small49.avif", "small50.png", "small51.avif", "small52.avif", "small53.avif",
  "small54.avif", "small55.png", "small56.avif", "small57.avif", "small58.avif",
];

export default function SportsChannels() {
  return (
    <section className="section section-alt">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-tag">Sports Network</span>
          <h2>60+ premium <span className="accent">sports channels</span></h2>
          <p>From Sky Sport and beIN to ESPN, DAZN, TNT and more — every league&apos;s home network in one app.</p>
        </div>
        <div className="channels-grid reveal">
          {CHANNEL_LOGOS.map((logo, i) => (
            <div className="channel-box" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/assets/channels/${logo}`} alt={`Sports channel ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
