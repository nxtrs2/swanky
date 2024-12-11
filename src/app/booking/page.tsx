import Booking from "@/components/booking";

export default function Home() {
  return (
    <main className="flex  flex-col items-center justify-between p-24">
      <h1 className="text-4xl font-bold">Welcome to Swanky Shears</h1>

      <Booking />
    </main>
  );
}
