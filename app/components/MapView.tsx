'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ROUTE } from '@/lib/data';
import { Stop } from '@/lib/types';
import { isCheckedIn, getDirectionsUrl } from '@/lib/utils';
import Link from 'next/link';

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

interface MapViewProps {
  selectedStopId?: number;
  onStopSelect?: (stop: Stop | null) => void;
}

export default function MapView({ selectedStopId, onStopSelect }: MapViewProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);
  const polylineRef = useRef<L.Polyline | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map
    const map = L.map(mapRef.current, {
      zoomControl: true,
    }).setView([3.1458, 101.6972], 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    mapInstanceRef.current = map;

    // Draw polyline connecting all stops
    const coordinates: [number, number][] = ROUTE.stops.map(stop => [stop.lat, stop.lng]);
    const polyline = L.polyline(coordinates, {
      color: '#C9A84C',
      weight: 3,
      opacity: 0.7,
      dashArray: '10, 10',
    }).addTo(map);

    polylineRef.current = polyline;

    // Add markers for each stop
    ROUTE.stops.forEach((stop) => {
      const isChecked = isCheckedIn(stop.id);

      // Create custom icon
      const iconHtml = `
        <div style="
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: ${isChecked ? stop.color : '#1A1D2E'};
          border: 3px solid ${stop.color};
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 20px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        ">
          ${isChecked ? stop.stampIcon : stop.id}
        </div>
      `;

      const icon = L.divIcon({
        html: iconHtml,
        className: 'custom-marker',
        iconSize: [40, 40],
        iconAnchor: [20, 20],
      });

      const marker = L.marker([stop.lat, stop.lng], { icon })
        .addTo(map)
        .on('click', () => {
          if (onStopSelect) {
            onStopSelect(stop);
          }
        });

      // Add popup
      const popupContent = `
        <div style="font-family: Inter, sans-serif; min-width: 200px;">
          <div style="font-weight: bold; font-size: 16px; margin-bottom: 4px; color: #0D0F1A;">
            ${stop.name}
          </div>
          <div style="font-size: 12px; color: #666; margin-bottom: 8px;">
            ${stop.category}
          </div>
          ${isChecked ? '<div style="color: #22c55e; font-size: 12px;">✓ Visited</div>' : ''}
        </div>
      `;

      marker.bindPopup(popupContent);
      markersRef.current.push(marker);
    });

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [onStopSelect]);

  // Handle selected stop highlighting
  useEffect(() => {
    if (mapInstanceRef.current && selectedStopId) {
      const stop = ROUTE.stops.find(s => s.id === selectedStopId);
      if (stop) {
        mapInstanceRef.current.setView([stop.lat, stop.lng], 17, {
          animate: true,
        });
      }
    }
  }, [selectedStopId]);

  // Get user location
  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos: [number, number] = [
            position.coords.latitude,
            position.coords.longitude,
          ];
          setUserLocation(userPos);

          if (mapInstanceRef.current) {
            // Remove old user marker if exists
            if (userMarkerRef.current) {
              userMarkerRef.current.remove();
            }

            // Add blue dot for user location
            const userIcon = L.divIcon({
              html: `
                <div style="
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background: #3b82f6;
                  border: 3px solid white;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                "></div>
              `,
              className: 'user-marker',
              iconSize: [16, 16],
              iconAnchor: [8, 8],
            });

            const marker = L.marker(userPos, { icon: userIcon }).addTo(mapInstanceRef.current);
            userMarkerRef.current = marker;

            mapInstanceRef.current.setView(userPos, 16, { animate: true });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
        }
      );
    }
  };

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full" />

      {/* User Location Button */}
      <button
        onClick={getUserLocation}
        className="absolute bottom-6 right-6 bg-[var(--color-gold)] text-[var(--color-navy)] p-4 rounded-full shadow-lg hover:shadow-[var(--shadow-glow)] transition-all z-[1000]"
        title="Show my location"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z"
          />
        </svg>
      </button>
    </div>
  );
}
