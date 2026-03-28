import Hero from "@/components/Hero";
import CollectionIntro from "@/components/CollectionIntro";
import FeaturedPick from "@/components/FeaturedPick";
import MovieBrowse from "@/components/MovieBrowse";
import CategoryLinks from "@/components/CategoryLinks";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <CollectionIntro />
      <FeaturedPick />
      <MovieBrowse />
      <CategoryLinks />
      <Footer />
    </main>
  );
}
