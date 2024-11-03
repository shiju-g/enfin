import AvailabilitySchedule from "@/app/features/Availability";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10">
      <div className="md:h-[400px] md:overflow-y-auto ">
        <AvailabilitySchedule />
      </div>
    </div>
  );
}
