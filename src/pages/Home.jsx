import Hero from '../components/Hero/Hero';
import About from '../components/About/About';
import WhyAttend from '../components/WhyAttend/WhyAttend';
import Parallax from '../components/Parallax/Parallax';
import ProjectPreparation from '../components/ProjectPreparation/ProjectPreparation';
import Sponsors from '../components/Sponsors/Sponsors';
import News from '../components/News/News';
import BookingForm from '../components/BookingForm/BookingForm';

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WhyAttend />
      <Parallax />
      <ProjectPreparation />
      <Sponsors />
      <News />
      <BookingForm />
    </>
  );
}
