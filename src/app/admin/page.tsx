import { getBookings, getReviews } from "@/app/actions";
import AdminDashboardClient from "./AdminDashboardClient";

export const metadata = {
  title: "Admin Dashboard | Life Care Homeopathic Clinic",
  description: "Clinic management portal for patient appointments and reviews.",
};

// Disable static page caching for real-time admin data
export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const initialBookings = await getBookings();
  const initialReviews = await getReviews();

  return (
    <div className="py-10 max-w-7xl mx-auto px-4 md:px-8 w-full">
      <AdminDashboardClient 
        initialBookings={initialBookings.map(b => ({
          ...b,
          createdAt: b.createdAt.toISOString()
        }))}
        initialReviews={initialReviews.map(r => ({
          ...r,
          createdAt: r.createdAt.toISOString()
        }))}
      />
    </div>
  );
}
