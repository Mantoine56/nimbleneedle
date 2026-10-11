export const GOOGLE_MAPS_HOURS_MESSAGE =
  "Please check our Google Maps profile for the most up-to-date business hours.";

export const LOCATION_LINKS = {
  preston: {
    // Verified public business listing; address taps stay separate from directions.
    businessUrl: "https://www.google.com/maps/place/Nimble+Needle+Tailoring/@45.407481,-75.7133338,678m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4cce09edd30388c9:0x8df3e1739cca8606!8m2!3d45.407481!4d-75.7133338!16s%2Fg%2F11s5984p36?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
    name: "Nimble Needle Tailoring, Preston",
    hoursUrl:
      "https://www.google.com/maps/search/?api=1&query=Nimble+Needle+Tailoring+Preston+141+Preston+St+Ottawa",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=141+Preston+St,+Ottawa,+ON+K1R+7P4",
  },
  riverside: {
    // Verified public business listing; address taps stay separate from directions.
    businessUrl: "https://www.google.com/maps/place/Nimble+Needle+Tailoring/@45.343508,-75.6904025,678m/data=!3m2!1e3!4b1!4m6!3m5!1s0x4cce072f3d8d3b09:0xb3871253df97108!8m2!3d45.343508!4d-75.6904025!16s%2Fg%2F11ycy_b9mr?entry=ttu&g_ep=EgoyMDI2MTAwNy4wIKXMDSoASAFQAw%3D%3D",
    name: "Nimble Needle Tailoring, Riverside Drive",
    hoursUrl:
      "https://www.google.com/maps/search/?api=1&query=Nimble+Needle+Tailoring+Riverside+Drive+3681+Riverside+Dr+Ottawa",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=3681+Riverside+Dr,+Ottawa,+ON+K1V+1H7",
  },
} as const;
