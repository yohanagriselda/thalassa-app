export const dynamic = "force-dynamic";
export const runtime = "nodejs";

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
  captain: string;
  crewCount: number;
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
    captain: "Capt. James Anderson",
    crewCount: 25,
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
    captain: "Capt. Rina Siregar",
    crewCount: 18,
    accent: "blue",
  },
  {
    id: 3,
    name: "MV Maritime Express",
    type: "Tanker",
    status: "DELAYED",
    statusClass: "delayed",
    speed: 0.8,
    heading: 280,
    fuel: 62,
    location: "Batam Anchorage",
    lat: 1.0456,
    lng: 104.0305,
    captain: "Capt. Hendra Pratama",
    crewCount: 22,
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
    captain: "Capt. Maya Lestari",
    crewCount: 16,
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
    captain: "Capt. Budi Santoso",
    crewCount: 20,
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
    captain: "Capt. Ahmad Fauzi",
    crewCount: 24,
    accent: "cyan",
  },
];

function randomDelta(size: number) {
  return Math.random() * size * 2 - size;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
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
      updated.speed = Number(clamp(updated.speed + randomDelta(1.2), 8, 28).toFixed(1));
      updated.heading = wrapHeading(updated.heading);
      updated.fuel = Number(clamp(updated.fuel - Math.random() * 0.4, 10, 100).toFixed(1));
      updated.lat = Number((updated.lat + randomDelta(0.01)).toFixed(4));
      updated.lng = Number((updated.lng + randomDelta(0.01)).toFixed(4));
    }

    if (updated.statusClass === "inport") {
      updated.speed = 0;
      updated.heading = 0;
      updated.fuel = Number(clamp(updated.fuel + Math.random() * 0.2, 0, 100).toFixed(1));
    }

    if (updated.statusClass === "maintenance") {
      updated.speed = 0;
      updated.heading = 0;
    }

    if (updated.statusClass === "delayed") {
      updated.speed = Number(clamp(0.3 + Math.random() * 0.8, 0, 2).toFixed(1));
      updated.heading = wrapHeading(updated.heading);
      updated.fuel = Number(clamp(updated.fuel - Math.random() * 0.15, 10, 100).toFixed(1));
      updated.lat = Number((updated.lat + randomDelta(0.003)).toFixed(4));
      updated.lng = Number((updated.lng + randomDelta(0.003)).toFixed(4));
    }

    return updated;
  });
}

export async function GET(request: Request) {
  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    start(controller) {
      let closed = false;

      const send = (data: unknown) => {
        if (closed) return;
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      send({
        type: "connected",
        message: "Operator realtime stream connected",
        serverTime: new Date().toISOString(),
      });

      const pushFleetUpdate = () => {
        const vessels = updateVessels();

        const payload = {
          type: "fleet-update",
          serverTime: new Date().toISOString(),
          totalFleet: vessels.length,
          enRoute: vessels.filter((v) => v.statusClass === "enroute").length,
          inPort: vessels.filter((v) => v.statusClass === "inport").length,
          delayed: vessels.filter((v) => v.statusClass === "delayed").length,
          maintenance: vessels.filter((v) => v.statusClass === "maintenance").length,
          selectedVesselId: vessels[0]?.id ?? null,
          vessels,
        };

        send(payload);
      };

      pushFleetUpdate();

      const interval = setInterval(pushFleetUpdate, 3000);

      const heartbeat = setInterval(() => {
        if (closed) return;
        controller.enqueue(encoder.encode(`: heartbeat\n\n`));
      }, 15000);

      request.signal.addEventListener("abort", () => {
        closed = true;
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