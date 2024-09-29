import React from 'react'
import { useEffect } from 'react'
const About = () => {
  useEffect(() => {
    document.title = "About Us";
  }, []);
  return (
    <>
      <div className="absolute top-0 z-[-2] min-h-full min-w-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      <div className="bg-gray-100 text-black">

        <header className="relative">
          <div className="flex justify-center items-center text-center absolute top-0 left-0 right-0 h-20 bg-cover bg-center filter blur-sm"
            style={{
              backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSgblc7BCEzELDrmBKcphn_AC8btg5wJjFcnQ&s')`
            }}
          ></div>
          <h1 className="relative text-center text-white text-4xl py-10 z-10">About Us</h1>
          {/* <nav className="bg-black py-3 z-10 relative">
          <ul className="flex justify-center space-x-8">
            <li><a href="#" className="text-white hover:text-gray-300">Home</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Features</a></li>
            <li><a href="#" className="text-white hover:text-gray-300">Contact</a></li>
          </ul>
        </nav> */}
        </header>

        <main className="p-6">
          <section className="bg-white p-6 my-6 rounded-lg shadow-md">
            <h2 className="text-gray-900 text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              At <strong>EcoMine Solutions</strong>, we aim to empower Indian coal mines with innovative tools to measure, manage, and mitigate their carbon emissions. Our web application provides comprehensive insights and actionable pathways toward carbon neutrality.
            </p>
          </section>

          <section className="bg-white p-6 my-6 rounded-lg shadow-md">
            <h2 className="text-gray-900 text-2xl font-semibold mb-4">Why Carbon Neutrality?</h2>
            <p>
              As the world grapples with climate change, the coal industry faces increasing scrutiny. Achieving carbon neutrality is not just a regulatory requirement but a moral imperative. We believe in supporting mines to transition towards sustainable practices while maintaining operational efficiency.
            </p>
          </section>

          <section className="bg-white p-6 my-6 rounded-lg shadow-md">
            <h2 className="text-gray-900 text-2xl font-semibold mb-4">Our Approach</h2>
            <p>
              Our platform utilizes advanced analytics and data visualization techniques to quantify carbon footprints. We provide customized reports and recommendations that help coal mines identify their emission sources and implement effective strategies for reduction.
            </p>
          </section>

          <section className="bg-white p-6 my-6 rounded-lg shadow-md">
            <h2 className="text-gray-900 text-2xl font-semibold mb-4">Join Us</h2>
            <p>
              Together, we can pave the way for a cleaner, greener future. Partner with us to take your first steps towards achieving carbon neutrality in your operations.
            </p>
          </section>

          <section className="text-center my-10">
            <h2 className="text-gray-900 text-2xl font-semibold mb-6">Our Team</h2>
            <div className="flex justify-center flex-wrap">
              {["Rohit Kumar Modi", "Ritika Shaw", "Rohit Sharma", "Vivek Kumar Shaw", "Rishu Raj", "Rudraksh Jaiswal"].map((name) => (
                <div
                  key={name}
                  className="bg-white border border-gray-200 rounded-lg p-6 m-3 w-40 shadow-md transform transition-transform duration-200 hover:scale-105"
                >
                  {name}
                </div>
              ))}
            </div>
          </section>
        </main>
        <div className="absolute top-0 z-[-2] min-h-full min-w-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
        <div className="fixed top-0 left-0 z-[-2] w-full h-full rotate-180 transform bg-green-100 bg-[radial-gradient(60%_120%_at_50%_50%,hsla(0,0%,100%,0)_0,rgba(252,205,238,.5)_100%)]"></div>
      </div>
    </>
  )
}

export default About
