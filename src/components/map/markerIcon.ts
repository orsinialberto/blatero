import L from "leaflet";

export function createTravelMarkerIcon() {
  return L.divIcon({
    html: `
      <svg width="28" height="36" viewBox="0 0 28 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.268 21.732 0 14 0Z" fill="#dc2626"/>
        <circle cx="14" cy="14" r="6" fill="#ffffff"/>
        <path d="M14 0C6.268 0 0 6.268 0 14C0 24.5 14 36 14 36C14 36 28 24.5 28 14C28 6.268 21.732 0 14 0Z" stroke="#ffffff" stroke-width="2"/>
      </svg>
    `,
    className: "travel-marker-wrapper",
    iconSize: [28, 36],
    iconAnchor: [14, 36],
    popupAnchor: [0, -36],
  });
}

