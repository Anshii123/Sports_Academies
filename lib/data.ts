export interface SportItem {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: "Field" | "Court" | "Racquet" | "Water" | "Performance";
  image: string;
  heroImage: string;
  ageGroups: string;
  trainingLevel: string;
  frequency: string;
  leadCoach: string;
  description: string;
  highlights: string[];
  schedule: string[];
  equipment: string[];
}

export interface CoachItem {
  id: string;
  name: string;
  role: string;
  sport: string;
  experience: string;
  certifications: string[];
  specialization: string;
  achievements: string;
  bio: string;
  image: string;
  quote: string;
}

export interface FacilityItem {
  id: string;
  name: string;
  category: string;
  tagline: string;
  specs: string[];
  description: string;
  image: string;
  features: string[];
  capacity: string;
}

export interface MembershipPlan {
  id: string;
  name: string;
  subtitle: string;
  monthlyPrice: number;
  annualPriceMonthly: number;
  level: string;
  recommended?: boolean;
  sessionsPerWeek: string;
  features: string[];
  notIncluded: string[];
}

export interface AcademyEvent {
  id: string;
  title: string;
  sport: string;
  date: string;
  time: string;
  location: string;
  ageGroup: string;
  status: "REGISTRATION OPEN" | "FILLING FAST" | "UPCOMING" | "INVITATIONAL ONLY";
  type: "Tournament" | "Camp" | "Trial" | "Workshop";
  description: string;
  coach: string;
}

export interface AthleteStory {
  id: string;
  name: string;
  sport: string;
  ageGroup: string;
  headline: string;
  subheading: string;
  startingPoint: string;
  journey: string;
  achievement: string;
  coachQuote: string;
  athleteQuote: string;
  coachName: string;
  image: string;
  yearJoined: string;
}

export const SPORTS_DATA: SportItem[] = [
  {
    id: "football",
    name: "Football Academy",
    slug: "football",
    tagline: "Total Technical Mastery & Tactical Intelligence",
    category: "Field",
    image: "/images/sports/football.jpg",
    heroImage: "/images/sports/football.jpg",
    ageGroups: "U-9, U-12, U-15, U-18 & Pro Pathway",
    trainingLevel: "Foundation to National League",
    frequency: "3 to 5 Sessions / Week",
    leadCoach: "Marcus Vance (UEFA Pro License)",
    description: "Our European curriculum integrates individual ball mastery, positional awareness, high-speed decision making, and match stamina under certified scouts.",
    highlights: ["FIFA Standard Turf Arena", "GPS Player Tracking Systems", "European Scouting Showcases", "Video Analysis Room"],
    schedule: ["Tue & Thu: 4:30 PM - 6:30 PM", "Sat: Tactical Scrimmage 8:00 AM", "Sun: League Fixtures"],
    equipment: ["Club Match Kit", "Firm Ground Cleats", "Academy Shin Guards", "GPS Vest (Supplied)"]
  },
  {
    id: "cricket",
    name: "Cricket High Performance",
    slug: "cricket",
    tagline: "Bio-Mechanical Precision & Match Temperament",
    category: "Field",
    image: "/images/sports/cricket.jpg",
    heroImage: "/images/sports/cricket.jpg",
    ageGroups: "U-10, U-14, U-17, Senior State",
    trainingLevel: "Grassroots to First-Class",
    frequency: "4 Sessions / Week + Weekend Matches",
    leadCoach: "Devendra Patil (BCCI Level 3)",
    description: "Featuring floodlit synthetic & natural turf pitches with video speed radar tracking, spin bowling variations, batting stroke play, and specialized wicket-keeping drills.",
    highlights: ["8 Floodlit Turf Nets", "Merlyn Bowling Simulator", "Speed Radar & High-Speed Cameras", "BCCI Accredited Mentors"],
    schedule: ["Mon, Wed, Fri: 4:00 PM - 7:00 PM", "Saturday Centre-Wicket Match Simulation"],
    equipment: ["Full English Willow Bat", "Club Whites", "Spikes & Turf Shoes", "Complete Protective Kit"]
  },
  {
    id: "basketball",
    name: "Elite Basketball Club",
    slug: "basketball",
    tagline: "Explosive Athleticism & Modern Floor Spacing",
    category: "Court",
    image: "/images/sports/basketball.jpg",
    heroImage: "/images/sports/basketball.jpg",
    ageGroups: "U-11, U-15, U-19 & Collegiate Prep",
    trainingLevel: "Development to National Circuit",
    frequency: "4 Sessions / Week",
    leadCoach: "Tariq Hamilton (FIBA Certified)",
    description: "Indoor hardwood maple court training focusing on transition offense, lockdown perimeter defense, shooting mechanics, and vertical leap conditioning.",
    highlights: ["FIBA Hardwood Floor", "Dr. Dish Shooting Guns", "Vertical Jump Analytics", "Tournament Travel Roster"],
    schedule: ["Mon, Wed, Thu: 5:00 PM - 7:00 PM", "Sat: 3x3 and Full Court Scrimmages"],
    equipment: ["Academy Reversible Jersey", "Indoor Court Shoes", "Microfiber Towel", "Water Hydration Flask"]
  },
  {
    id: "tennis",
    name: "Championship Tennis",
    slug: "tennis",
    tagline: "Court Geometry, Kinetic Kinetic Serve & Mental Grit",
    category: "Racquet",
    image: "/images/sports/tennis.jpg",
    heroImage: "/images/sports/tennis.jpg",
    ageGroups: "Ages 6 to 18 + Adult Comp",
    trainingLevel: "Red Ball to ITF Junior Circuit",
    frequency: "3 to 6 Sessions / Week",
    leadCoach: "Elena Rostova (PTR Master Professional)",
    description: "6 tournament-grade acrylic hard courts with high-speed video stroke analysis, tailored footwork ladders, topspin generation, and pressure point play.",
    highlights: ["6 ITF-Certified Hard Courts", "Smart Court Video Analytics", "High-Performance Ball Machines", "Strength & Recovery Integration"],
    schedule: ["Daily Morning: 6:30 AM - 8:30 AM", "Evening: 4:30 PM - 6:30 PM", "Weekend Match Play"],
    equipment: ["Graphite Racquet (strung to tension)", "Hard-Court Tennis Shoes", "Academy Visor/Cap"]
  },
  {
    id: "badminton",
    name: "Badminton Excellence",
    slug: "badminton",
    tagline: "Lightning Reflexes & Deceptive Racket Skills",
    category: "Racquet",
    image: "/images/sports/badminton.jpg",
    heroImage: "/images/sports/badminton.jpg",
    ageGroups: "Ages 7 to 19 + Semi-Pro",
    trainingLevel: "Beginner to National Ranking",
    frequency: "4 Sessions / Week",
    leadCoach: "Viktor Lindgren (Badminton Master Coach)",
    description: "8 BWF-approved synthetic rubberized courts designed to cultivate rapid court coverage, explosive smashes, deceptive net play, and multi-shuttle endurance.",
    highlights: ["8 Air-Cushioned BWF Courts", "Anti-Glare LED Stadium Lighting", "Speed & Agility Multi-feed Feeders", "State Ranking Support"],
    schedule: ["Tue, Wed, Fri: 5:00 PM - 7:30 PM", "Sun: Ranking Match Simulations"],
    equipment: ["Non-Marking Badminton Shoes", "Dual Rackets", "Academy Athletic Tee"]
  },
  {
    id: "athletics",
    name: "Track & Field Sprint Hub",
    slug: "athletics",
    tagline: "Peak Acceleration, Pure Speed & Biomechanical Form",
    category: "Performance",
    image: "/images/sports/track.jpg",
    heroImage: "/images/sports/track.jpg",
    ageGroups: "Ages 8 to 22",
    trainingLevel: "Club to Olympic Hopefuls",
    frequency: "3 to 5 Sessions / Week",
    leadCoach: "Julian Becker (IAAF Senior Coach)",
    description: "Synthetic 400m 8-lane track training with electronic laser timing gates, resistance sled pulls, hurdle technique, and maximum velocity sprint mechanics.",
    highlights: ["8-Lane Synthetic Mondo Track", "Freelap Electronic Timing", "Optojump Plyometric Sensor", "Hurdle & Long Jump Pits"],
    schedule: ["Mon, Wed, Fri: 6:00 AM - 8:00 AM & 5:00 PM - 7:00 PM"],
    equipment: ["Sprint Spikes & Running Flats", "Foam Roller", "Hydration Pack"]
  },
  {
    id: "swimming",
    name: "Aquatic Speed & Stamina",
    slug: "swimming",
    tagline: "Hydrodynamic Efficiency & Aerobic Powerhouse",
    category: "Water",
    image: "/images/sports/swimming.jpg",
    heroImage: "/images/sports/swimming.jpg",
    ageGroups: "Ages 5 to 19 + Masters",
    trainingLevel: "Learn-to-Swim to National Meets",
    frequency: "4 to 6 Sessions / Week",
    leadCoach: "Sunita Rao (FINA Level 3)",
    description: "50-meter 10-lane Olympic temperature-controlled pool with underwater motion capture cameras to refine stroke efficiency, starts, and flip turns.",
    highlights: ["Olympic 50m Heated Pool", "Underwater Stroke Cameras", "Omega Touchpad Timing", "Dryland Conditioning Deck"],
    schedule: ["Tue to Sat: Morning 6:00 AM - 8:30 AM", "Evening 4:30 PM - 6:30 PM"],
    equipment: ["FINA-Approved Jammers / Suit", "Goggles & Silicone Cap", "Fins & Kickboard"]
  },
  {
    id: "strength",
    name: "Strength & Conditioning",
    slug: "strength",
    tagline: "Functional Power, Injury Resilience & Athletic Armor",
    category: "Performance",
    image: "/images/sports/strength.jpg",
    heroImage: "/images/sports/strength.jpg",
    ageGroups: "Ages 12+ to Elite Athletes",
    trainingLevel: "Youth Athletic Development to Pro",
    frequency: "2 to 4 Sessions / Week",
    leadCoach: "Dr. Alistair Ross (CSCS, Ph.D. Sports Science)",
    description: "12,000 sq ft performance gym featuring Olympic lifting platforms, force plates, velocity-based training sensors, and personalized periodization programs.",
    highlights: ["Eleiko Olympic Racks", "ForceDecks Jump Analysis", "Keiser Pneumatic Resistance", "Sports Physio Consultation"],
    schedule: ["Mon to Sat: Flexible Slot Booking 6:00 AM - 9:00 PM"],
    equipment: ["Cross-Training Shoes", "Lifting Straps (Optional)", "Academy Gym Apparel"]
  }
];

export const COACHES_DATA: CoachItem[] = [
  {
    id: "marcus-vance",
    name: "Marcus Vance",
    role: "Head of Football & Academy Technical Director",
    sport: "Football",
    experience: "16+ Years Pro Coaching",
    certifications: ["UEFA Pro License", "FA Advanced Youth Award", "B.Sc. Sports Science"],
    specialization: "High-Pressing Tactical Systems & Player Positional Intelligence",
    achievements: "Coached 18 players who signed professional academy contracts in Premier League & MLS clubs.",
    bio: "Former Southampton youth development coach, Marcus directs the unified athletic philosophy across all football age categories.",
    image: "/images/coaches/marcus_vance.jpg",
    quote: "True technique is not juggling 1,000 times in your garden. It is delivering the right ball at the split-second when three defenders close in."
  },
  {
    id: "devendra-patil",
    name: "Devendra Patil",
    role: "Master Cricket Coach & Fast Bowling Specialist",
    sport: "Cricket",
    experience: "14+ Years First-Class & Academy Coaching",
    certifications: ["BCCI Level 3 High Performance", "Cricket Australia Level 2", "Bio-mechanics Specialist"],
    specialization: "Bowling Run-Up Biomechanics, Seam Presentation & Pressure Bowling",
    achievements: "Mentored 4 state Ranji Trophy pacers and 2 India U-19 national tournament players.",
    bio: "Devendra played 48 First-Class matches before transitioning to elite coaching, known for reconstructing bowlers' actions to eliminate injury risks.",
    image: "/images/coaches/devendra_patil.jpg",
    quote: "Speed without control is wasted momentum. Build rhythm in your gather, release with intent, and let the seam do the talking."
  },
  {
    id: "elena-rostova",
    name: "Elena Rostova",
    role: "Director of Tennis Operations",
    sport: "Tennis",
    experience: "12+ Years WTA & Junior Tour Coaching",
    certifications: ["PTR Master Professional", "ITF Level 3", "Mental Toughness Institute Specialist"],
    specialization: "Heavy Modern Topspin, Open-Stance Kinetic Linkage, Break-Point Psychology",
    achievements: "Trained 7 national junior champions and 3 ITF top-150 junior ranked athletes.",
    bio: "Former WTA top-200 ranked singles athlete, Elena brings international tour rigor and modern kinetic chain efficiency to our championship courts.",
    image: "/images/coaches/elena_rostova.jpg",
    quote: "Tennis is played in the mind first, footwork second, and racket last. Master your breathe between points and you command the match."
  },
  {
    id: "tariq-hamilton",
    name: "Tariq Hamilton",
    role: "Head Basketball Coach & Skills Architect",
    sport: "Basketball",
    experience: "11+ Years NCAA & FIBA Development",
    certifications: ["FIBA Gold Coaching License", "USA Basketball Youth Development Director"],
    specialization: "Pick-and-Roll Decision Making, Perimeter Defense & Triple-Threat Speed",
    achievements: "Guided our U-18 squad to back-to-back National Youth Championships with a 24-2 record.",
    bio: "Played collegiate Division 1 basketball in North Carolina. Passionate about teaching spacing, footwork angles, and selfless team basketball.",
    image: "/images/coaches/tariq_hamilton.jpg",
    quote: "Great basketball players don't just react to the floor; they dictate where the defense must rotate before the pass is even thrown."
  },
  {
    id: "sarah-jenkins",
    name: "Sarah Jenkins",
    role: "Chief Aquatic Coach",
    sport: "Swimming",
    experience: "13+ Years Olympic Trials Mentorship",
    certifications: ["FINA Level 3 Coach", "American Swimming Coaches Association (ASCA) Level 4"],
    specialization: "Hydrodynamic Drag Minimization, Butterfly & Freestyle Propulsion",
    achievements: "Coached 11 swimmers to national medal podiums and 2 Tokyo Olympic trials qualifiers.",
    bio: "Former Commonwealth Games finalist, Sarah combines underwater motion sensors with aerobic threshold science to build unshakeable endurance.",
    image: "/images/coaches/sunita_rao.jpg",
    quote: "Water doesn't negotiate with wasted effort. The less resistance you produce, the faster the wall arrives."
  },
  {
    id: "dr-alistair-ross",
    name: "Dr. Alistair Ross",
    role: "Director of High Performance & Human Physiology",
    sport: "Fitness",
    experience: "18+ Years International Sports Science",
    certifications: ["CSCS *D (Distinction)", "Ph.D. Exercise Physiology", "EXOS Performance Specialist"],
    specialization: "Force-Velocity Profiling, Return-to-Play Rehabilitation & Plyometric Power",
    achievements: "Consultant for Premier League teams and Olympic sprint squads across 3 Olympic quadrennials.",
    bio: "Leading our 12,000 sq ft human performance laboratory, Dr. Ross ensures every academy athlete builds an injury-proof foundation.",
    image: "/images/coaches/alistair_ross.jpg",
    quote: "Strength isn't just about moving kilograms on a barbell. It is the ability to absorb, stabilize, and express force in chaotic athletic movements."
  }
];

export const FACILITIES_DATA: FacilityItem[] = [
  {
    id: "arena-turf",
    name: "FIFA-Pro Multi-Sport Turf Arena",
    category: "Outdoor Fields",
    tagline: "Natural feel turf with cryogenic rubber infill for zero knee stress",
    specs: ["105m x 68m Full Pitch", "Sub-Surface Drainage System", "1200 Lux LED Floodlights", "Dual 400-Seat Covered Stands"],
    description: "Designed to meet FIFA Quality Pro specifications, our flagship turf pitch supports full-field 11-a-side football, rugby drills, and multi-team field tactical scrimmages under broadcast-grade illumination.",
    image: "/images/facilities/turf_arena.jpg",
    features: ["4K Tactical Camera Towers", "Heated Dugout Benches", "Electronic Scoreboard", "Physio Quick-Response Station"],
    capacity: "800 Spectators"
  },
  {
    id: "cricket-pavilion",
    name: "Biomechanics Cricket Pavilion",
    category: "Outdoor Grounds",
    tagline: "8 dedicated turf nets with high-speed video capture and speed radars",
    specs: ["4 Natural Red Clay Pitches", "4 Imported Synthetic Pitch Tracks", "Automated Speed Radar Displays", "Full 65-Meter Boundary Oval"],
    description: "The premier cricket training center with full boundary simulation, dedicated slip-catching cradles, and automated bowling machine lanes with variable spin angle adjusters.",
    image: "/images/facilities/cricket_nets.jpg",
    features: ["Merlyn Two-Wheel Spin Simulators", "Run-up Laser Timing Gates", "Enclosed Indoor Wet-Weather Net", "Kit Locker Room"],
    capacity: "40 Players Simultaneously"
  },
  {
    id: "indoor-dome",
    name: "All-Weather Multi-Sport Dome",
    category: "Indoor Courts",
    tagline: "Climate-controlled maple wood courts for basketball, badminton, and futsal",
    specs: ["Robbins Bio-Channel Hardwood Floor", "BWF & FIBA Approved Markings", "Dual Full Basketball Courts", "8 Olympic Badminton Courts"],
    description: "Our 24,000 sq ft indoor dome allows uninterrupted training during monsoons, heatwaves, or winter conditions with filtered HEPA airflow and shock-absorbing sub-flooring.",
    image: "/images/facilities/indoor_dome.jpg",
    features: ["Drop-Down Retractable Hoops", "Acoustic Dampening Baffles", "Spectator Mezzanine Lounge", "Digital Score Displays"],
    capacity: "350 Spectators"
  },
  {
    id: "tennis-complex",
    name: "Grand Slam Hard Court Complex",
    category: "Racquet Arenas",
    tagline: "6 tournament-grade cushioned acrylic courts with Smart-Court video",
    specs: ["6 Cushioned DecoTurf Courts", "SmartCourt AI Line Calling & Analysis", "Court-side Cold Towel Coolers", "Umpire Chairs & Shade Canopies"],
    description: "Identical surface composition to international grand slam tour venues. Each court features high-resolution cameras that automatically track ball speed, spin rate, and player court positioning.",
    image: "/images/facilities/tennis_complex.jpg",
    features: ["Ball Machine Rental Station", "Stringing Workshop on-site", "Rebound Practice Walls", "Player Hydration Kiosks"],
    capacity: "150 Spectators"
  },
  {
    id: "performance-gym",
    name: "Olympic Strength & Conditioning Lab",
    category: "High Performance",
    tagline: "12,000 sq ft equipped with Eleiko barbell stations and ForceDecks",
    specs: ["10 Eleiko Olympic Lifting Platforms", "Dual Keiser Pneumatic Cable Racks", "ForceDecks Dual Jump Plates", "30-Meter Sled Sprint Turf Track"],
    description: "Every athlete undergoes biomechanical screening here. Equipped with velocity-based training sensors to measure bar speed in real-time, eliminating guesswork from youth athletic development.",
    image: "/images/facilities/strength_lab.jpg",
    features: ["Cardio Ergometer Suite", "Dumbbells up to 60kg", "Plyometric Box Complexes", "BFR Blood Flow Restriction Gear"],
    capacity: "60 Athletes"
  },
  {
    id: "recovery-hydro",
    name: "Cryotherapy & Hydro Recovery Suite",
    category: "Sports Medicine",
    tagline: "Cold plunges, infrared sauna, and NormaTec pneumatic compression",
    specs: ["Dual 8°C Cold Plunge Tubs", "40°C Contrast Mineral Pool", "Full-Spectrum Infrared Sauna", "8 NormaTec 3 Compression Lounges"],
    description: "Recovery is where performance gains are solidified. Athletes utilize contrast water therapy and active compression to accelerate muscle glycogen restoration and reduce post-match soreness.",
    image: "/images/facilities/recovery_suite.jpg",
    features: ["Sports Massage Therapy Tables", "Electrolyte Hydration Bar", "Hypervolt Percussion Guns", "Recovery Monitoring Kiosk"],
    capacity: "25 Athletes"
  }
];

export const MEMBERSHIP_PLANS: MembershipPlan[] = [
  {
    id: "starter",
    name: "Starter Athlete",
    subtitle: "For beginner to intermediate athletes building fundamental technique",
    monthlyPrice: 149,
    annualPriceMonthly: 119,
    level: "Foundation & Grassroots",
    sessionsPerWeek: "3 Structured Sessions / Week",
    features: [
      "Access to 1 primary sport discipline",
      "Certified coach-to-athlete ratio (1:10 max)",
      "Academy training kit (2 shirts, 1 short, bag)",
      "Quarterly fundamental progress report",
      "Weekend intra-academy friendly matches",
      "Locker room & equipment storage access"
    ],
    notIncluded: [
      "Video biomechanical stroke/stride analysis",
      "Dedicated high-performance gym access",
      "Personalized nutrition periodization plan",
      "Priority tournament squad selection"
    ]
  },
  {
    id: "performance",
    name: "Performance Pro",
    subtitle: "For dedicated competitive athletes aiming for state and national selection",
    monthlyPrice: 289,
    annualPriceMonthly: 239,
    level: "Competitive & State Track",
    recommended: true,
    sessionsPerWeek: "5 High-Intensity Sessions / Week",
    features: [
      "Access to primary sport + strength & conditioning",
      "Elite coach ratio (1:6 focused training)",
      "High-speed video analytics & motion capture review",
      "Full access to 12,000 sq ft Strength Lab",
      "Monthly 1-on-1 coach tactical review session",
      "Hydrotherapy & Cold Plunge access twice weekly",
      "Official tournament travel jersey & gear pack",
      "Direct entry to regional invitational tourneys"
    ],
    notIncluded: [
      "Dedicated personal sports nutritionist consultation",
      "Unlimited 24/7 private court booking"
    ]
  },
  {
    id: "elite",
    name: "Elite National Podium",
    subtitle: "All-inclusive high performance program for top-ranked & pro-bound athletes",
    monthlyPrice: 479,
    annualPriceMonthly: 399,
    level: "National & Pre-Professional",
    sessionsPerWeek: "Unlimited Training + 1-on-1 Mentorship",
    features: [
      "Unrestricted multi-sport academy facilities access",
      "Dedicated lead coach mentorship (1:3 or 1:1)",
      "Weekly ForceDecks jump & biomechanical profiling",
      "Personal sports nutritionist & customized meal plans",
      "Unlimited Hydrotherapy & Cryo recovery suite access",
      "Pro agent & college scholarship showcase exposure",
      "Free tournament registration & travel stipends",
      "VIP parent matchday lounge with analytics stream",
      "Full year premium kit bundle & custom equipment"
    ],
    notIncluded: []
  }
];

export const EVENTS_DATA: AcademyEvent[] = [
  {
    id: "evt-national-youth-cup",
    title: "National Youth Invitational Football Cup",
    sport: "Football",
    date: "November 14-16, 2026",
    time: "9:00 AM - 6:00 PM Daily",
    location: "FIFA-Pro Multi-Sport Turf Arena",
    ageGroup: "U-14 & U-17 Teams",
    status: "REGISTRATION OPEN",
    type: "Tournament",
    description: "16 premier youth academies battle in a 3-day round robin and knockout tournament attended by top European and national league scouts.",
    coach: "Marcus Vance"
  },
  {
    id: "evt-summer-intensive",
    title: "High-Performance Cricket Masterclass",
    sport: "Cricket",
    date: "November 22-26, 2026",
    time: "8:00 AM - 1:00 PM Daily",
    location: "Cricket Pavilion & Turf Nets",
    ageGroup: "Ages 12 to 19",
    status: "FILLING FAST",
    type: "Camp",
    description: "Intensive 5-day batting against pace & spin clinic featuring BCCI coaches, speed gun calibration, and match situation pressure scenarios.",
    coach: "Devendra Patil"
  },
  {
    id: "evt-tennis-championship",
    title: "Metro Grand Prix Junior Tennis Open",
    sport: "Tennis",
    date: "December 05-07, 2026",
    time: "7:00 AM - 7:00 PM",
    location: "Grand Slam Hard Court Complex",
    ageGroup: "Boys & Girls U-12, U-14, U-18",
    status: "REGISTRATION OPEN",
    type: "Tournament",
    description: "Official ranking tournament featuring SmartCourt automated electronic scoring, prize trophies, and athletic gear scholarships for winners.",
    coach: "Elena Rostova"
  },
  {
    id: "evt-speed-combine",
    title: "Youth Athlete Speed & Vertical Combine",
    sport: "Performance",
    date: "December 12, 2026",
    time: "9:00 AM - 3:00 PM",
    location: "Track & Field Sprint Hub + Gym",
    ageGroup: "Ages 10 to 18 (All Sports)",
    status: "UPCOMING",
    type: "Trial",
    description: "Comprehensive athletic testing day: 40-yard dash with laser gates, vertical jump on ForceDecks, agility shuttle, and coach evaluations.",
    coach: "Dr. Alistair Ross"
  },
  {
    id: "evt-basketball-showcase",
    title: "Winter Hoop Showcase & 3x3 Battle",
    sport: "Basketball",
    date: "December 19-20, 2026",
    time: "10:00 AM - 8:00 PM",
    location: "All-Weather Multi-Sport Dome",
    ageGroup: "U-15 & U-19",
    status: "FILLING FAST",
    type: "Tournament",
    description: "Fast-paced FIBA 3x3 tournament on day one followed by 5v5 full court showcase finals with collegiate coaches in attendance.",
    coach: "Tariq Hamilton"
  }
];

export const ACHIEVEMENTS_DATA = {
  stats: [
    { number: "500+", label: "Active Academy Athletes", note: "Across 8 premier sport disciplines" },
    { number: "120+", label: "Tournaments Competed", note: "State, national & international circuits" },
    { number: "45+", label: "Championship Trophies", note: "Won over the last 4 seasons" },
    { number: "32", label: "Pro & National Selections", note: "Signed pro contracts or state squads" },
    { number: "$1.4M+", label: "Scholarships Secured", note: "College athletic grants won by alumni" },
    { number: "98%", label: "Athlete Retention Rate", note: "Long-term development focus" }
  ],
  trophies: [
    {
      year: "2026",
      title: "Champions — National Inter-Academy Football League",
      category: "Football U-17",
      venue: "Metro Olympic Stadium",
      story: "Undefeated through 14 match fixtures with 38 goals scored and only 5 conceded."
    },
    {
      year: "2025",
      title: "Gold Medalists — All-State Junior Athletics Championship",
      category: "Track & Field",
      venue: "Regional Sports Complex",
      story: "Swept 100m, 200m, and 4x100m relay podiums with two state record breakages."
    },
    {
      year: "2025",
      title: "Winners — Ranji U-19 Feeder Cricket Tournament",
      category: "Cricket U-19",
      venue: "Cricket Association Grounds",
      story: "Defended 240 runs in the final with a sensational 6-wicket haul by academy pacer Rohan V."
    },
    {
      year: "2024",
      title: "Title Champions — State Hard-Court Tennis Trophy",
      category: "Tennis Singles & Doubles",
      venue: "Grand Slam Centre",
      story: "Captured both Girls U-16 and Boys U-18 titles in straight sets."
    }
  ],
  wallOfFame: [
    {
      name: "Rohan Verma",
      sport: "Cricket (Fast Bowling)",
      badge: "Ranji Trophy Debutant",
      year: "Class of 2024",
      image: "/images/stories/rohan_cricket.jpg",
      quote: "The biomechanical coaching at the pavilion fixed my delivery stride, adding 8 km/h to my pace while eliminating my lower back strain entirely."
    },
    {
      name: "Ananya Deshmukh",
      sport: "Tennis",
      badge: "ITF Junior Top 90",
      year: "Class of 2025",
      image: "/images/stories/ananya_tennis.jpg",
      quote: "Coach Elena taught me how to turn pressure into clarity. Moving from club matches to international ITF draws was seamless because the academy trained us for the big stage."
    },
    {
      name: "Liam O'Connor",
      sport: "Football (Center Midfield)",
      badge: "Signed Pro Academy Contract",
      year: "Class of 2024",
      image: "/images/stories/liam_football.jpg",
      quote: "The GPS vest tracking and tactical video sessions every Tuesday showed me exactly where to create passing lanes. It felt like playing with a cheat code on matchday."
    },
    {
      name: "Maya Chen",
      sport: "Swimming (100m Freestyle)",
      badge: "National Gold Medalist",
      year: "Class of 2025",
      image: "/images/sports/swimming.jpg",
      quote: "The underwater cameras proved I was dropping my elbow during my catch phase. Correcting that shaved 1.2 seconds off my personal best in 8 weeks."
    }
  ]
};

export const ATHLETE_STORIES_DATA: AthleteStory[] = [
  {
    id: "rohan-verma-story",
    name: "Rohan Verma",
    sport: "Cricket",
    ageGroup: "U-19 State Team",
    headline: "FROM BACKYARD SPEED TO A 140 KM/H RANJI TROPHY CALL-UP",
    subheading: "How 24 months of scientific fast-bowling biomechanics transformed raw aggression into lethal accuracy.",
    startingPoint: "Arrived at age 15 with raw pace but chronic stress fractures and erratic direction.",
    journey: "Under Coach Devendra Patil, Rohan underwent 3D motion capture to overhaul his back-foot plant. Over two years, his bowling volume was periodized in the Strength Lab alongside Keiser cable training to build spinal stability.",
    achievement: "Clocked 142.4 km/h at the State U-19 finals, picking up 27 wickets in the season and signing a multi-year senior team contract.",
    coachQuote: "Rohan had the fire inside him; what he needed was structural armor so his body could withstand the kinetic force of elite bowling without breaking down.",
    athleteQuote: "This academy saved my bowling career. Instead of telling me to bowl slower, the coaches built the physical foundation so I could bowl faster safely.",
    coachName: "Devendra Patil",
    image: "/images/stories/rohan_cricket.jpg",
    yearJoined: "2023"
  },
  {
    id: "ananya-deshmukh-story",
    name: "Ananya Deshmukh",
    sport: "Tennis",
    ageGroup: "ITF Junior Ranked #88",
    headline: "THE GRIT BEHIND BREAKING INTO THE TOP 100 JUNIOR WORLD RANKINGS",
    subheading: "Balancing school, daily 6:30 AM hard-court drills, and international tour travel.",
    startingPoint: "Ranked outside the top 500 regionally with a passive baseline counter-punching style.",
    journey: "Coach Elena Rostova revamped Ananya's forehand into a modern heavy topspin weapon with a forward-leaping contact point. Integrated weekly sessions with the academy sports psychologist taught her to embrace break-point pressure.",
    achievement: "Won back-to-back ITF Junior J60 titles in Singapore and Colombo, earning a full athletic scholarship offer to an NCAA Division 1 university.",
    coachQuote: "Ananya's work ethic is relentless. She never questioned a 6:00 AM fitness block on cold winter mornings because she saw the long-term vision.",
    athleteQuote: "The coaches here don't just treat you like a player; they build you as a person. The mental routines I learned here work on court and in real life.",
    coachName: "Elena Rostova",
    image: "/images/stories/ananya_tennis.jpg",
    yearJoined: "2022"
  },
  {
    id: "liam-oconnor-story",
    name: "Liam O'Connor",
    sport: "Football",
    ageGroup: "Pro Club Academy Signing",
    headline: "FROM WEEKEND PLAYER TO PROFESSIONAL LEAGUE CONTRACT",
    subheading: "Mastering positional intelligence and high-speed decision making on the FIFA-Pro turf.",
    startingPoint: "A talented community league midfielder who lacked the physical endurance and tactical awareness for elite academies.",
    journey: "Joined the Performance Pro program in 2022. Weekly GPS vest feedback monitored his high-speed running meters, while video analyst sessions taught him scanning techniques before receiving the ball.",
    achievement: "Captained the Academy U-17 squad to the National Title and signed a professional development contract with a top-flight club academy.",
    coachQuote: "Liam learned that true speed is not just foot speed; it's how fast your brain identifies the passing passing window before the defender does.",
    athleteQuote: "The video breakdown room was a game changer for me. Seeing my own body angle on screen made me see passes I was previously blind to.",
    coachName: "Marcus Vance",
    image: "/images/stories/liam_football.jpg",
    yearJoined: "2022"
  }
];

export const MILESTONES_DATA = [
  { year: "2012", title: "Academy Founded", description: "Launched with 25 passionate grassroots footballers and one natural grass training pitch." },
  { year: "2016", title: "First Regional Championship", description: "Expanded to cricket and tennis; won our first state-level junior championship." },
  { year: "2019", title: "FIFA & ITF Facility Expansion", description: "Built the 105m FIFA-Pro turf arena and 6 tournament hard courts with smart camera tracking." },
  { year: "2022", title: "High-Performance Lab Launched", description: "Inaugurated the 12,000 sq ft biomechanics gym, hydrotherapy recovery suite, and sports science team." },
  { year: "2024", title: "500+ Athletes & Pro Pathway", description: "Surpassed 500 active youth athletes, securing 32 professional and national team squad signings." },
  { year: "2026", title: "Continental Expansion & Beyond", description: "Expanding athletic dormitory facilities and introducing automated AI tracking across all sport courts." }
];

export const TESTIMONIALS_DATA = [
  {
    name: "Vikram & Suman Singhania",
    role: "Parents of U-14 Cricket Pacer Aryan",
    quote: "What stands out most is the human care. The coaches don't treat kids as numbers. Aryan's confidence, fitness, and discipline have skyrocketed over the past 18 months.",
    sport: "Cricket Program",
    image: "/images/coaches/devendra_patil.jpg"
  },
  {
    name: "Claire & Thomas Mitchell",
    role: "Parents of U-16 Footballer Jordan",
    quote: "The facility is truly international standard. The GPS player tracking reports we receive every month show real data on his sprint volume and stamina development.",
    sport: "Football Performance",
    image: "/images/coaches/marcus_vance.jpg"
  },
  {
    name: "Rajeshwar Rao",
    role: "Former State Athlete & Tennis Father",
    quote: "I've visited academies across the country, and the coaching methodology here under Elena Rostova is unmatched. The warm light campus, the focus on mental strength, and the sports science lab are top tier.",
    sport: "Championship Tennis",
    image: "/images/coaches/elena_rostova.jpg"
  }
];
