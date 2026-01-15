
import { GrStatusGood } from "react-icons/gr";
import { Link } from "react-router-dom";
import { motion } from "motion/react"

const Commodities = () => {
  return (
    <div>
      <motion.div
      initial={{ scale: 0 }}
      whileInView={{ scale: 1 }}
      transition={{ duration: 0.7, ease: "easeIn" }}
      viewport={{ once: true, amount: 0.3 }} 
      className="text-center mb-8">
        <p className="text-2xl">Trade across 3,500 instruments</p>
        <p className="text-lg">
          Assess your trading tactics and analysis on a diverse range of global
          markets.{" "}
        </p>
      </motion.div>

      <div className="bg-[#242424]">
        <section className="md:w-[80%] w-[90%] m-auto flex flex-wrap gap-10 py-20">
          <motion.div
           initial={{ opacity: 0, y: -90 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           viewport={{ once: true, amount: 0.2 }}
          className="bg-[#494949] shadow-md shadow-[#4e4e4e] grow basis-[200px] rounded-2xl  p-5">
            <h4 className="text-white text-xl mb-2">Stocks</h4>
            <p className="md:text-lg text-md text-[#f0efef] mb-4">
              This Package offers great Stock Markets.
            </p>

            <span>
              <p className="text-xl text-white">$15,000</p>
            </span>

            <Link to="/signup">
            <button className="border rounded-2xl border-[#dad5d5] w-full p-1 text-white mt-3 bg-[#d5b775]">
              Get Started
            </button>
            </Link>

            <div>
              <div className="our-courses">
                <hr />
                <span className="text-[#f0efef]">Features </span>
                <hr />
              </div>

              <div>
                <span className="flex items-center text-white mb-2">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">40% ROI</p>
                </span>

                <span className="flex items-center text-white">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">Quarterly Profit Withdrawal</p>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
          initial={{ opacity: 0, y: -80 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#494949] grow shadow-md shadow-[#4e4e4e] basis-[200px] rounded-2xl  p-5">
            <h4 className="text-white md:text-2xl text-xl mb-2">Bonds</h4>
            <p className="md:text-lg text-md text-[#f0efef] mb-4">
              This Package offers great Bonds Markets.
            </p>

            <span>
              <p className="md:text-2xl text-xl text-white">$10,000</p>
            </span>

            <Link to="/signup">
            <button className="border rounded-2xl border-[#dad5d5] w-full p-1 text-white mt-3 bg-[#d5b775]">
              Get Started
            </button>
            </Link>

            <div>
              <div className="our-courses">
                <hr />
                <span className="text-[#f0efef]">Features </span>
                <hr />
              </div>

              <div>
                <span className="flex items-center text-white mb-2">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">30% ROI</p>
                </span>

                <span className="flex items-center text-white">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">Quarterly Profit Withdrawal</p>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
          initial={{ opacity: 0, y: -70 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#494949] shadow-md shadow-[#4e4e4e] grow basis-[200px] rounded-2xl p-5">
            <h4 className="text-white md:text-2xl text-xl mb-2">Crypto</h4>
            <p className="md:text-lg text-md text-[#f0efef] mb-4">
              This Package offers great crypto Markets.
            </p>

            <span>
              <p className="md:text-2xl text-xl text-white">$7000</p>
            </span>

            <Link to="/signup">
            <button className="border rounded-2xl border-[#dad5d5] w-full p-1 text-white mt-3 bg-[#d5b775]">
              Get Started
            </button>
            </Link>

            <div>
              <div className="our-courses">
                <hr />
                <span className="text-[#f0efef]">Features </span>
                <hr />
              </div>

              <div>
                <span className="flex items-center text-white mb-2">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">30% ROI</p>
                </span>

                <span className="flex items-center text-white">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">10 days Profit Withdrawal</p>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#494949] shadow-md shadow-[#4e4e4e] grow basis-[200px] rounded-2xl  p-5">
            <h4 className="text-white md:text-2xl text-xl mb-2">Crypto Compounding</h4>
            <p className="md:text-lg text-md text-[#f0efef] mb-4">
              This Package offers great Crypto Markets.
            </p>

            <span>
              <p className="md:text-2xl text-xl text-white">$5000</p>
            </span>

            <Link to="/signup">
            <button className="border rounded-2xl border-[#dad5d5] w-full p-1 text-white mt-3 bg-[#d5b775]">
              Get Started
            </button>
            </Link>
            <div>
              <div className="our-courses">
                <hr />
                <span className="text-[#f0efef]">Features </span>
                <hr />
              </div>

              <div>
                <span className="flex items-center text-white mb-2">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">70% ROI</p>
                </span>

                <span className="flex items-center text-white">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">45 days Profit Withdrawal</p>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#494949] shadow-md shadow-[#4e4e4e] grow basis-[200px] rounded-2xl  p-5">
            <h4 className="text-white md:text-2xl text-xl mb-2">Digital Healthcare Stocks</h4>
            <p className="md:text-lg text-md text-[#f0efef] mb-4">
              This Package offers great Digital Healthcare Markets.
            </p>

            <span>
              <p className="md:text-2xl text-xl text-white">$3,500</p>
            </span>

            <Link to="/signup">
            <button className="border rounded-2xl border-[#dad5d5] w-full p-1 text-white mt-3 bg-[#d5b775]">
              Get Started
            </button>
            </Link>

            <div>
              <div className="our-courses">
                <hr />
                <span className="text-[#f0efef]">Features </span>
                <hr />
              </div>

              <div>
                <span className="flex items-center text-white mb-2">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">30% ROI</p>
                </span>

                <span className="flex items-center text-white">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">Quarterly Profit Withdrawal</p>
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
          className="bg-[#494949] shadow-md shadow-[#4e4e4e] grow basis-[200px] rounded-2xl p-5">
            <h4 className="text-white md:text-2xl text-xl mb-2">Real Estate</h4>
            <p className="md:text-lg text-md text-[#f0efef] mb-4">
              This Package offers great real estates Markets.
            </p>

            <span>
              <p className="md:text-2xl text-xl text-white">$3,000</p>
            </span>

           
            <Link to="/signup">
            <button className="border rounded-2xl border-[#dad5d5] w-full p-1 text-white mt-3 bg-[#d5b775]">
              Get Started
            </button>
            </Link>

            <div>
              <div className="our-courses">
                <hr />
                <span className="text-[#f0efef]">Features </span>
                <hr />
              </div>

              <div>
                <span className="flex items-center text-white mb-2">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">30% ROI</p>
                </span>

                <span className="flex items-center text-white">
                  <GrStatusGood className="mr-2" />
                  <p className="text-white">Quarterly Profit Withdrawal</p>
                </span>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
    </div>
  );
};

export default Commodities;
