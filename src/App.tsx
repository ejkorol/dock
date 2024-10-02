import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { digitMap, symbols } from "./dots";

interface TimeBlock {
  hh: number[][][];
  mm: number[][][];
  ss: number[][][];
}

function App() {
  const [_sec, setSec] = useState<boolean>(false);
  const [timeBlocks, setTimeBlocks] = useState<TimeBlock>({
    hh: [],
    mm: [],
    ss: [],
  });

  // const blink = (col: number): string => (col && sec ? "bg-light" : "bg-dark");

  const formatTime = () => {
    const d = new Date();
    const [hh, mm, ss] = [d.getHours(), d.getMinutes(), d.getSeconds()].map(
      (unit) => String(unit).padStart(2, "0").split(""),
    );

    setTimeBlocks({
      hh: hh.map((h) => digitMap.get(Number(h)) || []),
      mm: mm.map((m) => digitMap.get(Number(m)) || []),
      ss: ss.map((s) => digitMap.get(Number(s)) || []),
    });
  };

  useEffect(() => {
    formatTime();
    const intervalId = setInterval(() => {
      formatTime();
      setSec((prev) => !prev);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const renderDots = (block: number[][]) =>
    block.map((row, idx) => (
      <div key={idx} className="flex gap-2 mb-2">
        {row.map((col, idx) => (
          <motion.div
            key={idx}
            style={{ height: 12, width: 12, borderRadius: 6 }}
            className={col ? "bg-light" : "bg-dark"}
            initial={{ opacity: 0 }}
            animate={{ opacity: col ? 1 : 0.5 }}
            transition={{ duration: 0.5 }}
          />
        ))}
      </div>
    ));

  return (
    <main className="bg-black flex h-screen w-full justify-center items-center">
      <div className="flex gap-2">
        <div>
          <div className="flex gap-2 w-fit">
            {timeBlocks.hh.map((block, idx) => (
              <div key={idx}>{renderDots(block)}</div>
            ))}

            <div className="flex flex-col">{renderDots(symbols.get(":")!)}</div>

            {timeBlocks.mm.map((block, idx) => (
              <div key={idx}>{renderDots(block)}</div>
            ))}

            <div className="flex flex-col">{renderDots(symbols.get(":")!)}</div>

            {timeBlocks.ss.map((block, idx) => (
              <div key={idx}>{renderDots(block)}</div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}

export default App;
