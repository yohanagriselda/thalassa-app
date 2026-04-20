export const dynamic = "force-dynamic";

type Vessel = {
  id: number;
  name: string;
  type: string;
  status: string;
  statusClass: "enroute" | "inport" | "delayed" | "maintenance";
  speed: number;
  heading: number;
  fuel: number;
  location: string;
  lat: number;
  lng: number;
  accent: string;
};

const baseVessels: Vessel[] = [
  {
    id: 1,
    name: "MV Pacific Star",
    type: "Container Ship",
    status: "EN ROUTE",
    statusClass: "enroute",
    speed: 21.4,
    heading: 149,
    fuel: 70,
    location: "Singapore",
    lat: -6.2206,
    lng: 106.838,
    accent: "cyan",
  },
  {
    id: 2,
    name: "MV Ocean Voyager",
    type: "Bulk Carrier",
    status: "IN PORT",
    statusClass: "inport",
    speed: 0,
    heading: 0,
    fuel: 75,
    location: "Port of Surabaya",
    lat: -7.2165,
    lng: 112.7298,
    accent: "blue",
  },
  {
    id: 3,
    name: "MV Maritime Express",
    type: "Tanker",
    status: "DELAYED",
    statusClass: "delayed",
    speed: -1.1,
    heading: 280,
    fuel: 62,
    location: "Batam Anchorage",
    lat: 1.0456,
    lng: 104.0305,
    accent: "yellow",
  },
  {
    id: 4,
    name: "MV Cargo Master",
    type: "Container Ship",
    status: "MAINTENANCE",
    statusClass: "maintenance",
    speed: 0,
    heading: 0,
    fuel: 30,
    location: "Tanjung Priok Dock",
    lat: -6.1048,
    lng: 106.8803,
    accent: "red",
  },
  {
    id: 5,
    name: "MV Nusantara Wave",
    type: "Cargo Vessel",
    status: "EN ROUTE",
    statusClass: "enroute",
    speed: 17.8,
    heading: 96,
    fuel: 66,
    location: "Makassar Strait",
    lat: -2.4,
    lng: 118.1,
    accent: "cyan",
  },
  {
    id: 6,
    name: "MV Eastern Pearl",
    type: "Cargo Vessel",
    status: "EN ROUTE",
    statusClass: "enroute",
    speed: 19.2,
    heading: 121,
    fuel: 81,
    location: "Java Sea",
    lat: -5.8,
    lng: 110.4,
    accent: "cyan",
  },
];

function jitter(value: number, min: number, max: number) {
  const next = value + (Math.random() * 2 - 1) * max;
  return Math.max(min, Number(next.toFixed(1)));
}

function wrapHeading(value: number) {
  let next = value + Math.floor(Math.random() * 9 - 4);
  if (next < 0) next += 360;
  if (next >= 360) next -= 360;
  return next;
}

function updateVessels() {
  return baseVessels.map((vessel) => {
    const updated = { ...vessel };

    if (updated.statusClass === "enroute") {
      updated.speed = jitter(updated.speed, 8, 1.2);
      updated.heading = wrapHeading(updated.heading);
      updated.fuel = Math.max(10, Number((updated.fuel - Math.random() * 0.4).toFixed(1)));
      updated.lat = Number((updated.lat + (Math.random() * 0.02 - 0.01)).toFixed(4));
      updated.lng = Number((updated.lng + (Math.random() * 0.02 - 0.01)).toFixed(4));
    }

    if (updated.statusClass === "inport") {
      updated.speed = 0;
      updated.heading = 0;
      updated.fuel = Math.min(100, Number((updated.fuel + Math.random() * 0.2).toFixed(1)));
    }

    if (updated.statusClass === "maintenance") {
      updated.speed = 0;
      updated.heading = 0;
    }

    if (updated.statusClass === "delayed") {
      updated.speed = Number((-1 * Math.random()).toFixed(1));
    }

    return updated;
  });
}

export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      const send = (data: unknown) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      send({
        type: "connected",
        message: "Operator realtime stream connected",
        serverTime: new Date().toISOString(),
      });

      const interval = setInterval(() => {
        const vessels = updateVessels();

        const payload = {
          type: "fleet-update",
          serverTime: new Date().toISOString(),
          totalFleet: vessels.length,
          enRoute: vessels.filter((v) => v.statusClass === "enroute").length,
          inPort: vessels.filter((v) => v.statusClass === "inport").length,
          delayed: vessels.filter((v) => v.statusClass === "delayed").length,
          maintenance: vessels.filter((v) => v.statusClass === "maintenance").length,
          selectedVesselId: 1,
          vessels,
        };

        send(payload);
      }, 3000);

      const heartbeat = setInterval(() => {
        controller.enqueue(encoder.encode(`: heartbeat\n\n`));
      }, 15000);

      request.signal.addEventListener("abort", () => {
        clearInterval(interval);
        clearInterval(heartbeat);
        controller.close();
      });
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}