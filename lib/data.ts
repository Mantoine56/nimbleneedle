// Data constants moved from page.tsx to reduce bundle size
import { Heart, Shield, MessageCircle } from 'lucide-react';

export const testimonials = [
  {
    name: "Michael Chen",
    rating: 5,
    text: "Exceptional craftsmanship and attention to detail. My suits fit perfectly and the service was outstanding.",
    avatar: "/testimonials/michael.webp"
  },
  {
    name: "David Rodriguez",
    rating: 5,
    text: "Professional service from start to finish. The alterations were done perfectly and on time.",
    avatar: "/testimonials/david.webp"
  },
  {
    name: "James Wilson",
    rating: 5,
    text: "Best tailoring service in the city. They transformed my old suits into perfect fits.",
    avatar: "/testimonials/james.webp"
  },
  {
    name: "Robert Thompson",
    rating: 5,
    text: "Outstanding quality and customer service. Highly recommend for all tailoring needs.",
    avatar: "/testimonials/robert.webp"
  },
  {
    name: "Alexander Brown",
    rating: 5,
    text: "Incredible attention to detail and craftsmanship. My wedding suit was absolutely perfect.",
    avatar: "/testimonials/alexander.webp"
  }
];

export const heroReviews = [
  {
    name: "Sarah Johnson",
    rating: 5,
    text: "Amazing work! They made my dress fit like it was custom made for me.",
    avatar: "/testimonials/sarah.webp",
    timeAgo: "2 days ago"
  },
  {
    name: "Mark Thompson",
    rating: 5,
    text: "Best tailor in Ottawa! Professional service and perfect results every time.",
    avatar: "/testimonials/mark.webp",
    timeAgo: "1 week ago"
  },
  {
    name: "Emily Chen",
    rating: 5,
    text: "Exceptional quality and attention to detail. Highly recommend!",
    avatar: "/testimonials/emily.webp",
    timeAgo: "3 days ago"
  },
  {
    name: "David Wilson",
    rating: 5,
    text: "They transformed my old suit into something that looks brand new.",
    avatar: "/testimonials/david-w.webp",
    timeAgo: "5 days ago"
  }
];

export const services = [
  {
    title: "ALTERATIONS AND REPAIRS",
    subtitle: "Wedding Dresses, Jackets, Suits, Pants, Shirts, Dresses, Skirts, Fitting Bridalwear and Eveningwear, Patching and Repairing Household Textiles",
    image: "/services/Clothing Alterations.jpeg",
    delay: 0
  },
  {
    title: "CUSTOM AND RETAIL SUITS",
    subtitle: "We have a selection of retail suits or we can create a custom one for you",
    image: "/services/Custom and retail suits.jpeg",
    delay: 200
  },
  {
    title: "ZIPPER REPAIR",
    subtitle: "Clothing Zippers, Suitcase Zippers",
    image: "/Zipper2.webp",
    delay: 400
  }
];

// Comprehensive services list for all services page
export const allServices = [
  {
    title: "TAILORING",
    subtitle: "Traditional tailoring services",
    image: "/services/Tailoring.jpg",
    link: "/tailoring",
    delay: 0
  },
  {
    title: "CUSTOM MADE AND RETAIL SUITS",
    subtitle: "Bespoke suits and retail suit selection",
    image: "/services/Custom and retail suits.jpeg",
    link: "/custom-suits",
    delay: 100
  },
  {
    title: "DRY CLEANING",
    subtitle: "Professional dry cleaning services",
    image: "/services/Dry Cleaning.jpg",
    link: "/dry-cleaning",
    delay: 200
  },
  {
    title: "CLOTHING ALTERATIONS",
    subtitle: "Professional alterations for all types of clothing",
    image: "/services/Clothing Alterations.jpeg",
    link: "/clothing-alterations",
    delay: 300
  },
  {
    title: "PROM DRESS ALTERATIONS",
    subtitle: "Look stunning for your prom night",
    image: "/services/PromDress Alterations.jpeg",
    link: "/prom-dress-alterations",
    delay: 400
  },
  {
    title: "WEDDING DRESS ALTERATIONS",
    subtitle: "Expert alterations for your special day",
    image: "/services/WeddingDress Alterations.jpeg",
    link: "/wedding-dress-alterations",
    delay: 500
  },
  {
    title: "SEAMSTRESS SERVICES",
    subtitle: "Comprehensive sewing and repair services",
    image: "/services/Seamstress service.jpeg",
    link: "/seamstress-services",
    delay: 600
  },
  {
    title: "SUIT ALTERATIONS",
    subtitle: "Perfect fit for business and formal suits",
    image: "/services/Suit Alterations.jpeg",
    link: "/suit-alterations",
    delay: 700
  },
  {
    title: "DRESS AND SKIRT ALTERATIONS",
    subtitle: "Perfect fit for dresses and skirts",
    image: "/services/Dress Alterations.jpeg",
    link: "/dress-skirt-alterations",
    delay: 800
  },
  {
    title: "PANTS ALTERATIONS",
    subtitle: "Hemming, waist adjustments, and more",
    image: "/services/Pants Alterations.jpeg",
    link: "/pants-alterations",
    delay: 900
  },
  {
    title: "JACKET ALTERATIONS",
    subtitle: "Professional jacket fitting and alterations",
    image: "/services/Jacket Alterations.jpeg",
    link: "/jacket-alterations",
    delay: 1000
  },
  {
    title: "SHIRT ALTERATIONS",
    subtitle: "Tailored fit for dress and casual shirts",
    image: "/services/Shirt Alterations.jpeg",
    link: "/shirt-alterations",
    delay: 1100
  },
  {
    title: "ZIPPER REPAIR AND REPLACEMENT",
    subtitle: "Fix broken zippers on clothing and accessories",
    image: "/Zipper2.webp",
    link: "/zipper-repair",
    delay: 1200
  }
];

export const features = [
  {
    icon: Heart,
    title: "MEET WITH US",
    description: "Call or visit our location to review your needs. No need for an appointment. We can provide you options if needed and give you a fixed, clear cost for the work.",
    delay: 0
  },
  {
    icon: Shield,
    title: "SIT BACK AND RELAX",
    description: "Let our clothing experts work on your items quickly and efficiently to get the results you'll love, in the timeframe you need.",
    delay: 200
  },
  {
    icon: MessageCircle,
    title: "TEXT NOTIFICATIONS",
    description: "Get notified by text as soon as your order is ready for pickup.",
    delay: 400
  }
];

export const locations = [
  {
    name: "Downtown Ottawa - Preston",
    address: "141 Preston St, Ottawa, ON K1R 7P4",
    phone: "(343) 588-1300",
    hours: {
      weekdays: "Tue-Sat: 9am-9pm",
      saturday: "Tue-Sat: 9am-9pm", 
      sunday: "Sun-Mon: 10am-7pm"
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2800.4928542718835!2d-75.71163!3d45.4085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce04e7311278bd%3A0x65c3031023e94dc7!2s141%20Preston%20St%2C%20Ottawa%2C%20ON%20K1R%207P4%2C%20Canada!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca",
    directions: "https://www.google.com/maps/search/Nimble+Needle+Tailoring+141+Preston+St+Ottawa",
    delay: 0
  },
  {
    name: "New Location - Riverside",
    address: "3681 Riverside Dr, Ottawa, ON K1V 1H7",
    phone: "(343) 588-3182",
    hours: {
      weekdays: "Tue-Sat: 9am-9pm",
      saturday: "Tue-Sat: 9am-9pm",
      sunday: "Sun-Mon: 10am-7pm"
    },
    mapUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2804.2735842718835!2d-75.66663!3d45.3685!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4cce0759aa93a4c5%3A0x65c3031023e94dc8!2s3681%20Riverside%20Dr%2C%20Ottawa%2C%20ON%20K1V%201H7%2C%20Canada!5e0!3m2!1sen!2sca!4v1234567890123!5m2!1sen!2sca",
    directions: "https://www.google.com/maps/search/Nimble+Needle+Tailoring+3681+Riverside+Dr+Ottawa",
    delay: 300
  }
];

export const detailedReviews = [
  {
    name: "Sarah Mitchell",
    rating: 5,
    date: "2 weeks ago",
    text: "Absolutely incredible service! I brought in my wedding dress for alterations and they made it fit like a glove. The attention to detail was remarkable, and they completed everything ahead of schedule. The staff was so professional and understanding of how important this was to me. I couldn't be happier with the results!",
    avatar: "/testimonials/sarah-m.webp",
    service: "Wedding Dress Alterations"
  },
  {
    name: "Michael Thompson",
    rating: 5,
    date: "1 month ago",
    text: "I've been coming to Nimble Needle for over 3 years now, and they never disappoint. Whether it's suit alterations for work or casual clothing adjustments, they always deliver perfection. The turnaround time is excellent, and the pricing is very fair. Highly recommend to anyone in Ottawa!",
    avatar: "/testimonials/michael-t.webp",
    service: "Suit Alterations"
  },
  {
    name: "Jennifer Lee",
    rating: 5,
    date: "3 weeks ago",
    text: "Outstanding craftsmanship and customer service. They repaired a vintage jacket that other tailors said couldn't be fixed. Not only did they repair it beautifully, but they also gave me tips on how to care for it properly. This is true expertise and passion for their craft.",
    avatar: "/testimonials/jennifer.webp",
    service: "Vintage Clothing Repair"
  }
]; 