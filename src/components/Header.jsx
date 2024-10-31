export default function Header() {
    return (
      <header className="bg-blue-600 p-4 shadow-lg text-white">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-3xl font-bold">Flood Tracker</h1>
          <p className="text-sm md:text-lg text-gray-200 italic">
            Stay updated with real-time flood alerts
          </p>
        </div>
      </header>
    );
  }
  