import Image from "next/image";
import { RiArrowDownLine } from "react-icons/ri";
import { Link } from "react-scroll";
import { SocialIcons } from "../elements";
import { imageLoader, shimmer, toBase64 } from "../../lib/utils";
import { motion } from "framer-motion";
import { childrenAnimation } from "../../lib/motion";
import { useQuery } from "react-query";
import { getInformation } from "../../fetchers";
import ReactTyped from "react-typed";

const AboutDescription = ({ blurred, scroll = true, typed = true }) => {
  const { data } = useQuery("information", getInformation);

  if (!data) return null;

  return (
    <div className="container relative mx-auto">
      <div className="flex  w-full items-center justify-center">
        <div className="herosection-content w-full  text-center md:w-3/4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
            variants={childrenAnimation}
            className="herosection-imagewrapper relative mb-5 inline-block overflow-hidden rounded-full align-middle"
          >
            <span className="herosection-imageanimation absolute left-0 top-0 z-10 h-full w-full animate-spin rounded-full bg-gradient-to-tr from-primary to-transparent"></span>
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.4 }}
            variants={childrenAnimation}
            className="mb-5 text-heading"
          >
            <span className="block sm:inline">LEARN MORE</span>{" "}
            {typed ? (
              <ReactTyped
                loop
                typeSpeed={100}
                backSpeed={20}
                backDelay={2000}
                strings={["ABOUT ME", "ABOUT HOW I STARTED"]}
                className="text-primary"
              />
            ) : (
              <span className="text-primary">{data.fullName}</span>
            )}
          </motion.h2>
          <motion.p
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.6 }}
            variants={childrenAnimation}
            className="lead mb-0"
          >
            {/* {data.desc} */}
            Hello! My name is Enow Divine and I enjoy creating things that live
            on the internet. <br /> My interest in web development started back
            in 2018 when I had no clue of how websites functions or how they are
            being built and hosted on the internet, so I took an online coarse
            on HTML and CSS where i built my first four page static website
            running locally on my desktop  — turns out after putting together
            some HTML and CSS to form some few pages more, I just had the desire
            to keep learning and building more. <br />
            <br /> Fast-forward to today, and I’ve had the privilege of working
            at Summit Tech as a full stack developer and as the current acting
            CTO, Bridge Africa Ventures  as a Frontend developer and Zotech
            Company Ltd as a Frontend develoer. <br />
            My main focus these days is building accessible, inclusive products
            and digital experiences at Summit Tech  for a variety of clients.
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default AboutDescription;
