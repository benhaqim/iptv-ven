const TESTIMONIAL_IMAGES = [
  "wtsp1.jpeg", "wtsp2.jpeg", "wtsp3.jpeg", "wtsp4.jpeg",
  "wtsp5.jpeg", "wtsp5.jpg", "wtsp6.jpeg", "wtsp7.jpeg",
  "wstp8.jpeg", "wtsp9.jpeg", "wtsp10.jpeg", "wtsp12.jpeg",
];

export default function ImageTestimonials() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-tag">Real reviews</span>
          <h2>What subscribers <span className="accent">are saying</span></h2>
          <p>Real WhatsApp messages from real customers. No edits, no scripts.</p>
        </div>
        <div className="image-testi-grid reveal-stagger">
          {TESTIMONIAL_IMAGES.map((img, i) => (
            <div className="image-testi" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`/assets/testimonials/${img}`} alt={`Customer review ${i + 1}`} loading="lazy" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
