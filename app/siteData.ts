export type SiteImage = {
  src: string;
  alt: string;
  original: string;
  position?: string;
};

const image = (src: string, alt: string, original: string, position?: string): SiteImage => ({
  src,
  alt,
  original,
  position,
});

export const siteData = {
  school: {
    name: "SHRIJI INTERNATIONAL SCHOOL",
    displayName: "Shriji International School",
    affiliationNumber: "2132392",
    affiliation: "CBSE Affiliated",
    level: "Senior Secondary",
    type: "Independent",
    management: "Shriji Shiksha Prasar Samiti",
    phoneDisplay: "+91 81940 11600",
    phoneHref: "tel:+918194011600",
    address: "Chhata–Barsana Road, Chhata Rural, Mathura, Uttar Pradesh",
    shortAddress: "Chhata–Barsana Road, Mathura",
    plusCode: "PF9P+V3Q",
    domainLabel: "shrijiint.in",
    domainUrl: "https://shrijiint.in",
    instagramLabel: "@shri_ji_international",
    instagramUrl: "https://www.instagram.com/shri_ji_international",
    facebookLabel: "Shriji International",
    facebookUrl: "https://www.facebook.com/shrijiinternational",
    mapEmbedUrl:
      "https://www.google.com/maps?q=PF9P%2BV3Q%2C%20Chhata%20Rural%2C%20Uttar%20Pradesh&output=embed",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=PF9P%2BV3Q%2C%20Chhata%20Rural%2C%20Uttar%20Pradesh",
    values: "Learning • Character • Growth",
  },
  // Management must confirm the final production PIN. The supplied Maps listing uses 281401,
  // while the current CBSE record shows 281004; this demo intentionally does not reconcile them.
  addressVerificationNote:
    "Management must confirm the final production PIN; the supplied Maps listing and current CBSE record conflict.",
  navigation: [
    { label: "Home", href: "#home", section: "home" },
    { label: "About", href: "#about", section: "about" },
    { label: "Academics", href: "#academics", section: "academics" },
    { label: "School Life", href: "#school-life", section: "school-life" },
    { label: "Gallery", href: "#gallery", section: "gallery" },
    { label: "Notices", href: "#notices", section: "notices" },
    { label: "Contact", href: "#contact", section: "contact" },
  ],
  trustItems: [
    { value: "CBSE", label: "Affiliated" },
    { value: "Senior", label: "Secondary" },
    { value: "Independent", label: "School" },
    { value: "2132392", label: "Affiliation No." },
  ],
  copy: {
    about:
      "Shriji International School is a CBSE-affiliated Senior Secondary institution on Chhata–Barsana Road, Mathura. This website concept brings its academics, activities, leadership and community life together in one clear, welcoming experience.",
    experience:
      "School life brings learning, participation and shared experiences together. Explore moments from academic engagement, responsibility, outdoor activity and student-created work.",
    culture:
      "Cultural programmes and school events give students a platform to participate, collaborate and share their creativity with the wider school community.",
  },
  images: {
    logo: image("/images/school-crest.webp", "Shriji International School crest", "schhol logo.jpg"),
    hero: image(
      "/images/hero-campus.webp",
      "Students taking part in an outdoor game on the school lawn with the school building behind them",
      "Handball Competition Held at Shri Ji International School – Grade 6 to 12 Boys 🤾_♂️The sports  (3).heic",
      "67% 10%",
    ),
    about: image(
      "/images/campus-overview.webp",
      "Elevated view of the school lawn with student groups gathered for outdoor activities",
      "Handball Competition Held at Shri Ji International School – Grade 6 to 12 Boys 🤾_♂️The sports  (4).heic",
      "center",
    ),
    academics: image(
      "/images/academic-engagement.webp",
      "Two students concentrating on a handwriting activity at a desk",
      "Shri Ji International School (SJIS) proudly organised a Cursive Writing Competition for student (2).heic",
      "center",
    ),
    leadership: image(
      "/images/student-leadership.webp",
      "Student representatives wearing house and leadership sashes outdoors",
      "A new chapter of leadership begins! 🌟Shri Ji International School proudly hosted the Investitu (1).heic",
      "center 42%",
    ),
    sports: image(
      "/images/outdoor-sports.webp",
      "Students in coloured team shirts playing an organised outdoor game on the school lawn",
      "Handball Competition Held at Shri Ji International School – Grade 6 to 12 Boys 🤾_♂️The sports  (1).heic",
      "center",
    ),
    culture: image(
      "/images/cultural-stage.webp",
      "Students performing a colourful group dance on a stage branded with the school name",
      "82592032_1194578497554954_5032508726565666816_n.jpg",
      "center 56%",
    ),
    event: image(
      "/images/republic-day-event.webp",
      "Students presenting a Republic Day-themed cultural performance on an outdoor stage",
      "51078379_936588276687312_6053954410294280192_n.jpg",
      "center",
    ),
    projects: image(
      "/images/student-exhibitions.webp",
      "A row of student-made building and landscape models displayed on classroom tables",
      "56398377_970797523266387_2835813794259664896_n.jpg",
      "center",
    ),
    campusLife: image(
      "/images/campus-life.webp",
      "Children in colourful costumes taking part in an outdoor cultural activity in front of the school building",
      "73054275_1126650501014421_6871233910164946944_n.jpg",
      "center 38%",
    ),
  },
  facilities: [
    { icon: "BookOpen", title: "Learning Spaces", text: "Discover the settings where everyday learning and engagement take place." },
    { icon: "Trophy", title: "Outdoor Activities", text: "Explore moments of organised games, participation and teamwork outdoors." },
    { icon: "Shapes", title: "Student Exhibitions", text: "See student-created models and project work presented as part of school life." },
    { icon: "CalendarDays", title: "School Events", text: "Experience cultural programmes, celebrations and shared school occasions." },
  ],
  gallery: [
    image("/images/gallery-cultural-courtyard.webp", "Students in colourful traditional costumes prepared for a group cultural presentation", "73122213_1126651967680941_3430860141363200000_n.jpg"),
    image("/images/gallery-school-performance.webp", "Students presenting food and refreshments at an outdoor school activity", "76652815_1145316499147821_3037209591067705344_n.jpg"),
    image("/images/gallery-group-presentation.webp", "Students taking part together in an outdoor hurdle activity", "79369548_1175022909510513_1317855262454841344_n.jpg"),
    image("/images/gallery-stage-activity.webp", "Children in festive clothing gathered in front of a school event backdrop", "74638445_1145317515814386_629003878964133888_n.jpg"),
    image("/images/gallery-republic-day.webp", "Students forming a group pyramid during a Republic Day-themed programme", "50818485_936586350020838_7207113293448609792_n.jpg"),
    image("/images/campus-life.webp", "Children performing outdoors in colourful costumes with the school building behind them", "73054275_1126650501014421_6871233910164946944_n.jpg"),
  ],
  notices: [
    { type: "General Notice", title: "School-wide information", text: "A sample space for important information shared with families and the school community." },
    { type: "Examination Update", title: "Academic communication", text: "A sample card showing where verified examination-related updates could appear." },
    { type: "School Event", title: "Event information", text: "A sample space for confirmed event notes, instructions and participation details." },
  ],
} as const;

export const demoDisclaimer =
  "Website redesign concept prepared for demonstration. Content and contact details to be confirmed by school management before publication.";
