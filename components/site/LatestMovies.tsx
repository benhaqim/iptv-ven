const movies = [
  { title: "Dune: Part Two", meta: "2024 · Sci-Fi", img: "/assets/movies/duneparttwo.jpg" },
  { title: "Oppenheimer", meta: "2023 · Drama", img: "/assets/movies/oppenhaimer.jpg" },
  { title: "The Batman", meta: "2022 · Action", img: "/assets/movies/thebatman.jpg" },
  { title: "Mission: Impossible", meta: "2024 · Action", img: "/assets/movies/mission impossible 2025.jpg" },
  { title: "Inception", meta: "Classic · Sci-Fi", img: "/assets/movies/inception.jpg" },
  { title: "Interstellar", meta: "Classic · Sci-Fi", img: "/assets/movies/interstellar.jpg" },
  { title: "Gladiator II", meta: "2024 · Epic", img: "/assets/movies/gladiator 2.jpg" },
  { title: "John Wick 4", meta: "2023 · Action", img: "/assets/movies/johnwick.jpg" },
  { title: "The Marvels", meta: "2023 · Action", img: "/assets/movies/themarvels.jpeg" },
];

export default function LatestMovies() {
  return (
    <section className="section">
      <div className="container">
        <div className="section-head reveal">
          <span className="section-tag">Streamlix VOD</span>
          <h2>Latest <span className="accent">movies</span></h2>
          <p>160,000+ films and series, fresh releases every week. Here are some of the latest titles streaming right now.</p>
        </div>
      </div>
      <div className="poster-marquee reveal">
        <div className="poster-track">
          {[...movies, ...movies].map((m, i) => (
            <div className="poster" key={i}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={m.img} alt={m.title} loading="lazy" />
              <div className="poster-info">
                <h4>{m.title}</h4>
                <span>{m.meta}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
