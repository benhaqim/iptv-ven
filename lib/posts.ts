export type PostBlock =
  | { type: "p" | "h2" | "h3" | "blockquote"; text: string }
  | { type: "ul"; items: string[] };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  cat: string;
  date: string;
  read: string;
  cover: string;
  author: string;
  role: string;
  tags: string[];
  body: PostBlock[];
};

export const POSTS: Post[] = [
  {
    slug: "watch-fifa-world-cup-2026",
    title: "How to watch every FIFA World Cup 2026 match in 4K",
    excerpt: "104 matches across USA, Canada and Mexico — here's the complete viewing guide for the biggest tournament in football history.",
    cat: "World Cup",
    date: "April 22, 2026",
    read: "8 min read",
    cover: "/assets/world-cup-2026.webp",
    author: "Streamlix",
    role: "Editorial team",
    tags: ["FIFA", "World Cup 2026", "Streaming", "4K"],
    body: [
      { type: "p", text: "The 2026 FIFA World Cup is shaping up to be the most-watched sporting event in human history. With 48 nations spread across three host countries — the USA, Canada and Mexico — and 104 matches to play through, fans need a streaming setup that can keep up." },
      { type: "p", text: "This is the definitive guide to watching every kickoff, every goal and every penalty shootout from June 11 to July 19, 2026 — wherever you happen to be in the world." },
      { type: "h2", text: "What's new for 2026" },
      { type: "p", text: "The 2026 edition is the first to feature 48 teams, up from 32 in Qatar 2022. That means more group-stage drama, more knockout rounds, and an expanded round of 32 before the round of 16. The opening match is scheduled for June 11 at the Estadio Azteca in Mexico City — the only stadium ever to host three World Cup tournaments." },
      { type: "h2", text: "How to stream every match in 4K" },
      { type: "p", text: "Most national broadcasters carry the World Cup — but coverage is patchy, geo-restricted, and often locked behind expensive sports packages. With StreamlixIPTV you get the entire 104-match calendar in true 4K UHD with HDR10+ on supported channels, plus multi-angle replays and 12 commentary languages." },
      { type: "blockquote", text: "Football, in the end, is a global language. Our job is to make sure no fan is left without a screen." },
      { type: "h3", text: "Devices that just work" },
      { type: "ul", items: ["Any modern smart TV (Samsung, LG, Sony, Hisense)", "Apple TV, Fire Stick, Chromecast, Roku", "iPhone, iPad, Android phone or tablet", "Mac, PC, Linux"] },
      { type: "p", text: "Setup takes around 4 minutes. Sign up, receive your credentials by email, install the app and you're streaming." },
      { type: "h2", text: "The matches you can't miss" },
      { type: "p", text: "Beyond the obvious final on July 19, look out for the opening night spectacle in Mexico City, the round-of-16 fixtures (always the most unpredictable phase), and any late-stage penalty shootouts. With 48 teams, expect at least three or four shock results in the group stage alone." },
      { type: "p", text: "Whatever your team, whatever your time zone, you'll be ready. See you on June 11." },
    ],
  },
  {
    slug: "champions-league-final-stream",
    title: "UEFA Champions League: how the knockout rounds work in 2026",
    excerpt: "From the new league phase to the final — your complete guide to the format, fixtures and how to stream every minute.",
    cat: "Champions League",
    date: "April 14, 2026",
    read: "6 min read",
    cover: "/assets/champions-league.avif",
    author: "Streamlix",
    role: "Editorial team",
    tags: ["UEFA", "Champions League", "Football"],
    body: [
      { type: "p", text: "The Champions League format reshuffled in 2024, and 2026's edition keeps the new rhythm: a single 36-team league phase, followed by knockouts. Here's how to follow every twist." },
      { type: "h2", text: "The league phase, explained" },
      { type: "p", text: "Each club plays eight matches against eight different opponents, four at home and four away, drawn from four pots of nine. The top eight clubs in the unified standings advance directly to the round of 16. Clubs ranked 9 to 24 fight it out in a two-legged playoff round." },
      { type: "h2", text: "The knockouts" },
      { type: "p", text: "From the round of 16 onwards, it's classic two-legged ties — except for the final, of course. The 2026 Final will be played at the Puskás Aréna in Budapest." },
      { type: "h3", text: "Streaming in 4K" },
      { type: "p", text: "Every Champions League fixture is available on StreamlixIPTV in 4K UHD with the option of original-language commentary. Pre-match analysis starts 45 minutes before kickoff." },
    ],
  },
  {
    slug: "fire-stick-iptv-setup",
    title: "Set up IPTV on Amazon Fire TV Stick in under 5 minutes",
    excerpt: "Step-by-step setup guide: sideload our app, paste your credentials, and start streaming — no jailbreak required.",
    cat: "Setup Guide",
    date: "April 8, 2026",
    read: "5 min read",
    cover: "/assets/blog-firestick.jpeg",
    author: "Streamlix",
    role: "Editorial team",
    tags: ["Setup", "Fire Stick", "Amazon", "Tutorial"],
    body: [
      { type: "p", text: "The Amazon Fire TV Stick is one of the most popular streaming devices in the world — and it's a fantastic platform for IPTV. Here's how to set up StreamlixIPTV in five steps." },
      { type: "h2", text: "Step 1 — Allow apps from unknown sources" },
      { type: "p", text: "From the Fire Stick home screen, navigate to Settings → My Fire TV → Developer options, then enable Apps from Unknown Sources. This lets you install our app without using the Amazon Appstore." },
      { type: "h2", text: "Step 2 — Install the Downloader app" },
      { type: "p", text: "Search for Downloader in the Amazon Appstore, install it, and open it." },
      { type: "h2", text: "Step 3 — Sideload the StreamlixIPTV app" },
      { type: "p", text: "In Downloader's URL bar, type the address we sent in your welcome email. The APK will download in a few seconds." },
      { type: "h2", text: "Step 4 — Sign in" },
      { type: "p", text: "Open the app, paste your username and password from the welcome email, and you're in." },
      { type: "h2", text: "Step 5 — Pick a match" },
      { type: "p", text: "Browse channels, hit play, enjoy. Average activation time across our subscriber base is 4 minutes 12 seconds." },
    ],
  },
  {
    slug: "best-football-leagues-stream",
    title: "Top 5 European football leagues you can stream right now",
    excerpt: "Premier League, La Liga, Serie A, Bundesliga, Ligue 1 — what makes each one special and how to watch them all.",
    cat: "Football",
    date: "March 30, 2026",
    read: "7 min read",
    cover: "/assets/football-pitch.jpg",
    author: "Streamlix",
    role: "Editorial team",
    tags: ["Premier League", "La Liga", "Serie A", "Bundesliga"],
    body: [
      { type: "p", text: "Five leagues. Five identities. Five different reasons to spend your weekends in front of the TV." },
      { type: "h2", text: "Premier League" },
      { type: "p", text: "Pace, intensity, and the deepest-pocketed clubs in football. Saturday 3pm kickoffs are a national institution in England — and on StreamlixIPTV they're available even in regions where they're traditionally blacked out." },
      { type: "h2", text: "La Liga" },
      { type: "p", text: "Technique, possession, and Spain's enduring rivalry between Real Madrid and Barcelona. La Liga's late kick-offs (often 21:00 CET) are perfect for European prime time." },
      { type: "h2", text: "Serie A, Bundesliga, Ligue 1" },
      { type: "p", text: "Each with its own character — Italian tactical chess, German atmosphere, French flair. With 28,000+ live channels, you don't have to pick favourites." },
    ],
  },
  {
    slug: "euro-2024-spain",
    title: "Inside Spain's Euro 2024 victory: the matches to rewatch",
    excerpt: "From the dramatic quarter-final to the Berlin final — every key moment of La Roja's seventh trophy is on catch-up.",
    cat: "Euro",
    date: "March 18, 2026",
    read: "5 min read",
    cover: "/assets/football-euro.jpg",
    author: "Streamlix",
    role: "Editorial team",
    tags: ["Euro 2024", "Spain", "UEFA"],
    body: [
      { type: "p", text: "Spain went unbeaten through Euro 2024 — seven matches, seven wins, a Euros first. Here are the four games you should watch back, in order." },
      { type: "h2", text: "Group stage: Spain 3 - 0 Croatia" },
      { type: "p", text: "A statement opener. Morata's early goal set the tone, and Spain never let go." },
      { type: "h2", text: "Quarter-final: Spain 2 - 1 Germany" },
      { type: "p", text: "Extra-time drama against the host nation. Mikel Merino's 119th-minute header is on every highlight reel." },
      { type: "h2", text: "The Final: Spain 2 - 1 England" },
      { type: "p", text: "A tight, tense Berlin night. Nico Williams broke through, Cole Palmer equalised, and Mikel Oyarzabal won it." },
    ],
  },
  {
    slug: "stadium-atmospheres",
    title: "The 10 stadium atmospheres every football fan should experience",
    excerpt: "From Anfield's Kop to La Bombonera — a virtual tour of the loudest, most iconic grounds in world football.",
    cat: "Culture",
    date: "March 6, 2026",
    read: "9 min read",
    cover: "/assets/stadium-night.jpg",
    author: "Streamlix",
    role: "Editorial team",
    tags: ["Stadiums", "Football", "Culture"],
    body: [
      { type: "p", text: "Television cameras can capture a goal, but they struggle to capture an atmosphere. Here are ten places where football is closer to a religious ritual than a sport." },
      { type: "h2", text: "1. Anfield, Liverpool" },
      { type: "p", text: "The Kop end's pre-match anthem is one of the most powerful pre-game moments in any sport." },
      { type: "h2", text: "2. La Bombonera, Buenos Aires" },
      { type: "p", text: "Boca Juniors fans literally make the stadium move. Engineers have measured the bounce." },
      { type: "h2", text: "3. Signal Iduna Park, Dortmund" },
      { type: "p", text: "The Yellow Wall — 25,000 standing supporters — is the largest single terrace in European football." },
    ],
  },
];
