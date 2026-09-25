import Banner from "./components/Banner";
import Library from "./components/Library";
import Navbar from "./components/Navbar";
import Footer from "./Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#080808] text-white">
      <Navbar />
      <Banner />
      <Library />
      <Footer />
    </main>
  );
}