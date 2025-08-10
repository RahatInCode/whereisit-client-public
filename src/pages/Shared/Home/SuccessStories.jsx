import React, { useEffect, useRef } from "react";
import gsap from "gsap";

const successStories = [
  {
    name: "Ayesha Rahman",
    message: "Thanks to Where Is It, I found my lost passport within 2 days!",
    image: "https://randomuser.me/api/portraits/women/68.jpg"
  },
  {
    name: "Tanvir Hasan",
    message: "Lost my wallet in Gulshan. Got it back with all my cards intact!",
    image: "https://randomuser.me/api/portraits/men/45.jpg"
  },
  {
    name: "Nadia Karim",
    message: "Your team is amazing! I never thought I'd see my lost cat again.",
    image: "https://randomuser.me/api/portraits/women/55.jpg"
  },
  {
    name: "Rifat Chowdhury",
    message: "Got my laptop back within 3 hours. Unbelievable service!",
    image: "https://randomuser.me/api/portraits/men/78.jpg"
  }
];

const SuccessStories = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".story-card",
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.3,
          ease: "power3.out"
        }
      );

      // Infinite horizontal scroll
      gsap.to(".slider-track", {
        xPercent: -100,
        duration: 15,
        repeat: -1,
        ease: "linear"
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="bg-emerald-50  py-10 overflow-hidden"
    >
      <h2 className="text-3xl font-bold text-center text-black mb-8">
         Success Stories ❤️
      </h2>

      <div className="slider-container relative w-full overflow-hidden">
        <div className="slider-track flex gap-8 px-8">
          {successStories.map((story, index) => (
            <div
              key={index}
              className="story-card min-w-[300px] max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-pink-400 shadow-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {story.name}
              </h3>
              <p className="text-gray-600 italic mt-2">"{story.message}"</p>
            </div>
          ))}

          {/* Duplicate for infinite loop */}
          {successStories.map((story, index) => (
            <div
              key={`dup-${index}`}
              className="story-card min-w-[300px] max-w-xs bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300"
            >
              <img
                src={story.image}
                alt={story.name}
                className="w-20 h-20 rounded-full object-cover border-4 border-pink-400 shadow-md mb-4"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {story.name}
              </h3>
              <p className="text-gray-600 italic mt-2">"{story.message}"</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStories;
