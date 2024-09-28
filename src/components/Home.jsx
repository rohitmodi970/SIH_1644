import React, { useState, useEffect } from 'react';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCard, setCurrentCard] = useState(0);

  const slides = [
    '/images/image1.jpg',
    '/images/image2.jpg',
    '/images/image3.jpg',
    '/images/image4.jpg',
    '/images/image5.jpg',
    '/images/image6.jpg',
  ];

  const coalUpdates = [
    {
      title: "Emission Reduction",
      description: "Implement innovative technologies to minimize emissions and ensure compliance with environmental standards.",
      image: "/images/image4.jpg",
    },
    {
      title: "Community Engagement",
      description: "Work closely with local communities to promote safety, health, and environmental awareness.",
      image: "/images/image3.jpg",
    },
    {
      title: "Innovation in Mining",
      description: "Leverage cutting-edge technology for smarter resource extraction and improved operational efficiency.",
      image: "/images/image6.jpg",
    },
    {
      title: "Renewable Energy Integration",
      description: "Incorporate renewable energy sources into coal mining operations to reduce reliance on fossil fuels.",
      image: "/images/image5.jpg",
    },
  ];
  // Automatically change slides after 5 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(slideInterval); // Clean up on unmount
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  const nextCard = () => {
    setCurrentCard((currentCard + 1) % coalUpdates.length);
  };

  const prevCard = () => {
    setCurrentCard((currentCard - 1 + coalUpdates.length) % coalUpdates.length);
  };

  useEffect(() => {
    if (coalUpdates.length > 3) {
      const cardInterval = setInterval(() => {
        setCurrentCard((prevCard) => (prevCard + 1) % coalUpdates.length);
      }, 5000); // Change card every 5 seconds

      return () => clearInterval(cardInterval); // Clean up on unmount
    }
  }, [coalUpdates.length]);

  return (
    <div>
      {/* Full-Screen Carousel */}
      <div className="relative h-[90vh] w-screen overflow-hidden">
        <div className="absolute inset-0 transition-transform duration-1000 ease-in-out">
          <img
            src={slides[currentSlide]}
            alt={`Slide ${currentSlide + 1}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Controls for manual change */}
        <button
          className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-500 z-10"
          onClick={prevSlide}
        >
          &#10094;
        </button>
        <button
          className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white p-4 rounded-full hover:bg-gray-500 z-10"
          onClick={nextSlide}
        >
          &#10095;
        </button>

        {/* Indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full cursor-pointer ${currentSlide === index ? 'bg-white' : 'bg-gray-500'}`}
              onClick={() => setCurrentSlide(index)}
            ></div>
          ))}
        </div>
      </div>

      {/* New Section Below Carousel (60% Screen Height) */}
      <div className="h-[50vh] bg-gray-100 flex items-center justify-center">
        <div className="container mx-auto p-4 flex flex-col gap-3">
          <div className="flex flex-col gap-2 text-5xl">
            <h2 className=" flex justify-start text-5xl font-bold text-gray-800 mb-4 text-center">What is E-Coal?</h2>

          </div>
          <p className="text-gray-600 text-left text-2xl font-sans flex justify-start">
            E-Coal is a cutting-edge digital platform that revolutionizes coal mining by promoting sustainability and leveraging advanced technology.
            This platform helps coal mines monitor, measure, and reduce carbon emissions, allowing them to adopt eco-friendly practices such as cleaner mining technologies and renewable energy integration.
            Through AI-driven insights and real-time data, E-Coal provides actionable strategies to optimize energy usage and improve operational efficiency.
            Ultimately, E-Coal facilitates the coal sector’s journey toward carbon neutrality, ensuring a responsible, greener future for the mining industry while maintaining productivity.
          </p>
          <p className="text-gray-600 text-left text-2xl font-sans flex justify-start">E-Coal reduces carbon emissions by up to 35% through AI and real-time tracking. It helps coal mines cut energy consumption by 25%, while calculating afforestation needs, contributing to a global goal of reducing emissions by 50% by 2050. Additionally, E-Coal can predict emissions with 90% accuracy using machine learning algorithms.</p>
        </div>
      </div>

      {/* New Section Related to Coal */}
      <div className="container mx-auto my-16 p-6 bg-white rounded-lg shadow-lg">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Sustainable Coal Mining Practices</h2>
        <p className="text-gray-600 text-center mb-8">
          Our commitment to sustainability ensures that coal mining operations not only meet energy demands but also protect the environment.
        </p>

        {/* Carousel for Coal Updates */}
        {coalUpdates.length > 3 ? (
          <div className="relative">
            <div className="flex justify-between items-center">
              <button
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-500"
                onClick={prevCard}
              >
                &#10094;
              </button>
              <div className="flex flex-col items-center">
                <img
                  src={coalUpdates[currentCard].image}
                  alt={coalUpdates[currentCard].title}
                  className="w-64 h-64 object-cover rounded-lg mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{coalUpdates[currentCard].title}</h3>
                <p className="text-gray-600 text-center">
                  {coalUpdates[currentCard].description}
                </p>
              </div>
              <button
                className="bg-gray-800 text-white p-2 rounded-full hover:bg-gray-500"
                onClick={nextCard}
              >
                &#10095;
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {coalUpdates.map((update, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{update.title}</h3>
                <p className="text-gray-600">{update.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
        
    </div>
  );
};

export default Home;
