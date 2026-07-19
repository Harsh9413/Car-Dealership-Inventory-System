import Navbar from "../components/layout/Navbar";

function Dashboard() {
  return (
    <>
      <Navbar />

      <main className="mx-auto max-w-7xl p-6">
        <h2 className="mb-6 text-3xl font-bold">
          Vehicle Dashboard
        </h2>

        <div className="rounded-lg bg-white p-6 shadow">
          Vehicle table will come here...
        </div>
      </main>
    </>
  );
}

export default Dashboard;