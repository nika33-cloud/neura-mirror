import { MdStars } from "react-icons/md";
import { TbTrendingUp2 } from "react-icons/tb";
import { FaUserLarge } from "react-icons/fa6";
import bg from "../assets/jamie-street-VP4WmibxvcY-unsplash-removebg-preview.png";
import { Link } from "react-router-dom";
import {motion} from "motion/react"

const Features = () => {
  return (
    <div>
      <motion.div

       initial={{ scale: 0 }}
       whileInView={{ scale: 1 }}
       transition={{ duration: 0.7, ease: "easeIn" }}
       viewport={{ once: true, amount: 0.3 }}
      className="md:flex my-10 flex-wrap gap-8 px-10">
        <div className="flex grow basis-[200px] flex-col justify-center items-center text-center mb-5">
          <div className="bg-[#d5b775] px-2 py-1 rounded-[6px] shadow-md mb-6 shadow-[#665339]">
            <TbTrendingUp2 />
          </div>
          <h3 className="font-semibold text-xl">Automatic trade</h3>
          <p className="text-lg">
            Skip the market research and technical analysis let&apos;s trade on
            your behalf
          </p>
        </div>

        <div className="flex grow basis-[200px] flex-col justify-center items-center text-center mb-5">
          <div className="bg-[#d5b775] w-8 h-8 flex items-center justify-center rounded-full shadow-md mb-6 shadow-[#665339]">
            <TbTrendingUp2 size={18} />
          </div>
          <h3 className="font-semibold text-xl">Access Experienced traders</h3>
          <p className="text-lg">
            Expand and diversify your portfolio by leveraging traders&apos;
            expertise.
          </p>
        </div>

        <div className="flex grow basis-[200px] flex-col justify-center items-center text-center mb-5">
          <div className="mb-5">
            <FaUserLarge size={20} />
          </div>
          <h3 className="font-semibold text-xl">Global Community</h3>
          <p className="text-lg">
            Join the world winning trading company and socialize with traders
            from all over the world
          </p>
        </div>

        <div className="flex grow basis-[200px] flex-col justify-center items-center text-center mb-5">
          <div className="mb-4">
            <MdStars size={27} />
          </div>
          <h3 className="font-semibold text-xl">Earn as a Investor</h3>
          <p className="text-lg">
            Earn additional income from the comfort of your home.
          </p>
        </div>
      </motion.div>

      <div className="md:w-[90%] w-[95%] max-w-[1200px] m-auto rounded-xl flex flex-col lg:flex-row mb-10 justify-between bg-[#0b111d]">
        <motion.div
         initial={{ opacity: 0, y: -50 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.8, ease: "easeOut" }}
         viewport={{ once: true, amount: 0.2 }}
        className="m-10 max-w-[600px]:">
          <h2 className="md:text-4xl text-xl  text-white font-bold">Neura Mirror</h2>
          <p className="md:text-2xl text-lg text-white font-semibold">Where you earn without stress</p>

          <div className="flex items-center my-8" >
            <div className="mr-5">
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.00292969"
                  width="40"
                  height="40"
                  rx="20"
                  fill="#213045"
                />
                <path
                  d="M11.832 21.1696L16.4987 25.8362L28.1654 14.1696"
                  stroke="#5EE15A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-white md:text-2xl text-lg">Innovative Tool</p>
              <p className="text-white md:text-xl text-md">Backtest trading strategies</p>
            </div>
          </div>

          <div className="flex items-center mb-8">
            <div className="mr-5">
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.00292969"
                  width="40"
                  height="40"
                  rx="20"
                  fill="#213045"
                />
                <path
                  d="M11.832 21.1696L16.4987 25.8362L28.1654 14.1696"
                  stroke="#5EE15A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-white md:text-2xl text-lg">Strategy Consulting</p>
              <p className="text-white md:text-xl text-md">A social assistant.</p>
            </div>
          </div>

          <div className="flex items-center mb-8">
            <div className="mr-5"> 
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.00292969"
                  width="40"
                  height="40"
                  rx="20"
                  fill="#213045"
                />
                <path
                  d="M11.832 21.1696L16.4987 25.8362L28.1654 14.1696"
                  stroke="#5EE15A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div >
              <p className="text-white md:text-2xl text-lg"> Financial Advisory</p>
              <p className="text-white md:text-xl text-md">Improving Decision Making</p>
            </div>
          </div>

          <div className="flex items-center mb-8">
            <div className="mr-5">
              <svg
                width="30"
                height="30"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="0.00292969"
                  width="40"
                  height="40"
                  rx="20"
                  fill="#213045"
                />
                <path
                  d="M11.832 21.1696L16.4987 25.8362L28.1654 14.1696"
                  stroke="#5EE15A"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <p className="text-white md:text-2xl text-lg">Marketing Consulting</p>
              <p className="text-white md:text-xl text-md">Price Notification module Processes</p>
            </div>
          </div>

            <Link to="/signup">
          <button className="bg-[#d5b775] px-3 py-3 text-white font-semibold rounded-xl">Create Account</button>
          </Link>
        </motion.div>

        <motion.div
        initial={{ opacity: 0, x: 80 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.2 }}
        className="w-full md:w-[600px] max-w-full h-auto flex justify-center items-center">
       <img className=" w-full h-auto object-contain" src={bg} alt="background" loading="lazy" />
        </motion.div>
      </div>
    </div>
  );
};

export default Features;
