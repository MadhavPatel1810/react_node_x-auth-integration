import { motion } from "framer-motion";
import { useEffect, useState } from "react";
const timelineEvents = [
  {
    year: "2006",
    event: "Twitter was founded",
    description: "Jack Dorsey, Biz Stone, and Evan Williams launched Twitter.",
  },
  {
    year: "2010",
    event: "Hashtags introduced",
    description:
      "Hashtags became an essential feature of Twitter conversations.",
  },
  {
    year: "2013",
    event: "Went Public on NYSE",
    description: "Twitter launched its IPO, raising $1.8 billion.",
  },
  {
    year: "2015",
    event: "Moments feature added",
    description: "Twitter introduced 'Moments' to highlight trending topics.",
  },
  {
    year: "2020",
    event: "Fleets launched",
    description: "Twitter introduced Fleets (disappearing tweets).",
  },
  {
    year: "2021",
    event: "Super Follows introduced",
    description: "Creators could monetize content via 'Super Follows'.",
  },
  {
    year: "2022",
    event: "Elon Musk acquired Twitter",
    description:
      "Musk bought Twitter for $44 billion, triggering major changes.",
  },
  {
    year: "2023",
    event: "Rebranded as X",
    description:
      "Twitter rebranded to 'X' under Musk’s vision for an 'everything app'.",
  },
];

function Timeline() {
  const [currentTimeline, setCurrentTimeline] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentTimeline((prev) => (prev + 1) % timelineEvents.length);
        setIsVisible(true);
      }, 2000);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="xauth-timeline"
      initial={{ opacity: 0, y: -100 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : -100,
      }}
      exit={{ opacity: 0, y: -100 }}
      transition={{ duration: 1 }}
    >
      <h4>{timelineEvents[currentTimeline]?.year}</h4>
      <p>{timelineEvents[currentTimeline]?.event}</p>
      <small>{timelineEvents[currentTimeline]?.description}</small>
    </motion.div>
  );
}

export default Timeline;
