import React from 'react';
import { FaGithub, FaLinkedin, FaFacebook, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="mt-auto w-full bg-black py-2 px-[4vw] text-white">
      <section
        className="m-auto flex max-w-7xl
      flex-col"
      >
        <div className="contacts">
          <h2 className="mb-1 text-xl">Contacts</h2>
          <a
            href="https://github.com/Vishal-Kamath/Flight-Booking-System-Next"
            target="_blank"
            className="flex items-center gap-1 text-base text-gray-400 hover:text-white"
          >
            <FaGithub /> Github
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="flex items-center gap-1 text-base text-gray-400 hover:text-white"
          >
            <FaLinkedin /> LinkedIn
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="flex items-center gap-1 text-base text-gray-400 hover:text-white"
          >
            <FaFacebook /> FaceBook
          </a>
          <a
            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
            target="_blank"
            className="flex items-center gap-1 text-base text-gray-400 hover:text-white"
          >
            <FaInstagram /> Instagram
          </a>
        </div>
      </section>
    </footer>
  );
};

export default Footer;
