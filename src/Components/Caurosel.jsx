import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Navbar from './Navbar';
// import './Carousel.css'; // You can create this CSS file to add custom styles

const Carousel = () => {
  const images = [
    '/src/Image/c1.jpg',
    '/src/Image/c2.jpg',
    '/src/Image/c3.jpg',
    '/src/Image/c4.jpg',
    '/src/Image/c5.jpg',
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <>
    {/* <Navbar/> */}
    <Slider {...settings} style={{height:'90vh'}}>
      {images.map((image, index) => (
        <div key={index} style={{height:"45vh"}}>
          <img src={image} alt={`slide ${index}`} style={{ height: '100vh', width:'100vw', objectFit:'cover'}}/>
        </div>
      ))}
    </Slider>
    </>
  );
};

export default Carousel;
