import { FaArrowDownUpAcrossLine } from "react-icons/fa6";
import mouse from "../assets/ClickbuttonW.svg";
import contact from "../assets/ClientSuppoerW.svg";
import security from "../assets/OwnershipW.svg"
import trade from "../assets/tradew.svg"
import books from "../assets/BooksW.svg";
import map from "../assets/LocationsMap.svg";
import { motion } from "motion/react";

const Results = () => {
  return (
    <div className="w-[90%] m-auto">
        <section>
           <h3 className="text-center text-2xl font-semibold">Why You Should Choose Us</h3>

           <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
           className="flex gap-5 items-center flex-wrap my-14">
                <div className="grow basis-[200px]">
                <FaArrowDownUpAcrossLine className="text-[#d5b775] mb-6" size={25}/>
                    <p className="text-xl text-[#d5b775] font-semibold mb-6">Tight Spreads</p>
                    <p className="text-lg">Enjoy lower trading costs and potential higher returns with out tight spreads.</p>
                </div>

                <div className="grow basis-[200px]">
                    <img src={contact} alt="icon" className="text-[#d5b775] mb-6" />
                    <p className="text-xl text-[#d5b775] font-semibold mb-6">24/7 client support</p>
                    <p className="text-lg">Our client support team speaks 20+ languages and is available anytime you need.</p>
                </div>

                <div className="grow basis-[200px]">
                <img src={security} alt="icon" className="text-[#d5b775] mb-6" />
                    <p className="text-xl text-[#d5b775] font-semibold mb-6">Data security</p>
                    <p className="text-lg">Trade with a secure broker that employs the latest encryption technology.</p>
                </div>
           </motion.div>

           <motion.div
            initial={{ opacity: 0, y: -80 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
           className="flex gap-5 items-center flex-wrap my-14">
                <div className="grow basis-[200px]">
                    <img src={mouse} alt="icon"  className="text-[#d5b775] mb-6 " />
                    <p className="text-xl text-[#d5b775] font-semibold mb-6">Reliable execution</p>
                    <p className="text-lg">Receive reliable execution with our data partner, Equinix, one of the world’s largest data centres.</p>
                </div>

                <div className="grow basis-[200px]">
                    <img src={trade} alt="icon" className="text-[#d5b775] mb-6" />
                    <p className="text-xl text-[#d5b775] font-semibold mb-6">3,500+ instruments
                    </p>
                    <p className="text-lg">Trade on a global scale with 3,500 instruments available across global markets.</p>
                </div>

                <div className="grow basis-[200px]">
                <img src={books} alt="icon" className="text-[#d5b775] mb-6" />
                    <p className="text-xl text-[#d5b775] font-semibold mb-6">Free education</p>
                    <p className="text-lg">Discover free in-depth articles and videos to enhance your trading knowledge.</p>
                </div>
           </motion.div>

        </section>

        <section className="my-8">
                <div>
                    <h2 className="text-center md:text-2xl text-xl font-semibold">A brand with a global presence</h2>
                    <p className="text-center text-lg mb-7">Our global team is here to support you every step of the way</p>
                    <div>
                    <img src={map} alt="maps" />
                    </div>
                </div>
        </section>
    </div>
  )
}

export default Results