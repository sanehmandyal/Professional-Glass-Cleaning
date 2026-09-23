import Gallery from '../components/Gallery';
import CTASection from '../components/CTASection';

const GalleryPage = () => (
  <div>
    <section className="py-16 bg-grid-fade">
      <div className="container-x text-center max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-navy-900 mb-4">Our Work</h1>
        <p className="text-navy-800/70">A look at completed glass cleaning, repair and water tank cleaning jobs.</p>
      </div>
    </section>
    <section className="py-16">
      <div className="container-x">
        <Gallery />
      </div>
    </section>
    <CTASection />
  </div>
);

export default GalleryPage;
