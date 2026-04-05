import bg from "../assets/jamie-street-VP4WmibxvcY-unsplash-removebg-preview.png";
import { Link } from "react-router-dom";
import {motion} from "motion/react"

const Features = () => {
  return (
    <div>

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
