import { Route } from './types';

export const ROUTE: Route = {
  id: "old-soul-new-city",
  name: "Old Soul, New City",
  tagline: "Walk the seam between KL's past and future",
  duration: "2–3 hours",
  distance: "1.4 km",
  theme: "Heritage, Art & Coffee",
  heroImage: "/assets/hero.png",
  stops: [
    {
      id: 1,
      name: "Yellow Brick Road",
      subtitle: "Specialty Coffee by a World Barista Champion",
      address: "Jalan Petaling, Chinatown, KL",
      lat: 3.14327,
      lng: 101.69652,
      hours: "8am – 6pm daily",
      description: "Start your crawl at this airy shophouse café helmed by Malaysia's 4-time Barista Champion. The pour-overs here are architectural in their precision. Grab a seat by the window and watch Chinatown wake up.",
      tip: "Try the single-origin Ethiopian hand pour. Ask the barista about the sourcing.",
      category: "Coffee",
      stampIcon: "☕",
      color: "#C9A84C"
    },
    {
      id: 2,
      name: "Kwai Chai Hong (鬼仔巷)",
      subtitle: "The Little Ghost Alley — Heritage Murals & Street Art",
      address: "Lorong Panggung, off Jalan Petaling",
      lat: 3.14580,
      lng: 101.69777,
      hours: "9am – 12am daily",
      description: "Duck into this lovingly restored 1960s back lane — ten shophouses with floor-to-ceiling murals depicting old KL life. The alley smells of incense and plum juice. Every wall tells a story.",
      tip: "Spot the mural of the old 'roti man' bicycle delivery boy — it's the most photographed piece.",
      category: "Street Art",
      stampIcon: "🎨",
      color: "#8B1A1A"
    },
    {
      id: 3,
      name: "REXKL",
      subtitle: "A Bookstore Maze Inside a 1940s Cinema",
      address: "Jalan Sultan, off Petaling Street",
      lat: 3.14750,
      lng: 101.69850,
      hours: "10am – 10pm daily",
      description: "BookXcess turned a derelict 1940s cinema into an impossible labyrinth of books. Five floors of stacked titles, mismatched furniture, and a cinema screen still intact. Lose yourself here for an hour.",
      tip: "Take the escalator to the top floor cinema balcony — best secret reading nook in KL.",
      category: "Books & Culture",
      stampIcon: "📚",
      color: "#2D5A8B"
    },
    {
      id: 4,
      name: "Bang Bang Vintage",
      subtitle: "Curated Vintage Fashion & Local Designers",
      address: "REXKL, Jalan Sultan",
      lat: 3.14780,
      lng: 101.69830,
      hours: "11am – 8pm (Tue–Sun)",
      description: "On the ground floor of REXKL, Bang Bang stocks hand-picked vintage pieces — Japanese denim, 90s Malaysian football jerseys, silk kebaya fragments turned into scarves. Half museum, half wardrobe.",
      tip: "Prices are fixed but fair. The scarves (RM35–60) make perfect lightweight souvenirs.",
      category: "Vintage & Fashion",
      stampIcon: "👗",
      color: "#5B3A7E"
    },
    {
      id: 5,
      name: "Merdeka 118 Viewpoint",
      subtitle: "The World's Second Tallest Building — Up Close",
      address: "Jalan Stadium, Kuala Lumpur",
      lat: 3.14220,
      lng: 101.68700,
      hours: "Open access (exterior viewpoint)",
      description: "Walk 15 minutes south from REXKL and arrive at the base of a building that makes you feel small in the best possible way. At 679 metres, Malaysia's statement to the world. The Park Hyatt lobby on L75 is open to visitors.",
      tip: "Come at golden hour (5:30–6:30pm) — the glass facade turns into fire.",
      category: "Architecture & Views",
      stampIcon: "🏙️",
      color: "#1A7A4A"
    }
  ]
};
