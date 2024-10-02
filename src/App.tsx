import { useState, useEffect } from "react";
import { digitMap, symbols } from "./dots";

interface TimeBlock {
  hh: number[][][];
  mm: number[][][];
  ss: number[][][];
}

function App() {
  const [sec, setSec] = useState<boolean>(false);

  const blink = (col: number): string => {
    if (col && sec) {
      return "bg-light";
    } else if (col && !sec) {
      return "bg-dark";
    } else {
      return "bg-dark";
    }
  };

  const [timeBlocks, setTimeBlocks] = useState<TimeBlock>({
    hh: [],
    mm: [],
    ss: [],
  });

  const getTime = () => {
    const d = new Date();
    const hh = d.getHours();
    const mm = d.getMinutes();
    const ss = d.getSeconds();

    formatTime(hh, mm, ss);
  };

  const formatTime = (hours: number, minutes: number, seconds: number) => {
    const hh = String(hours).padStart(2, "0");
    const mm = String(minutes).padStart(2, "0");
    const ss = String(seconds).padStart(2, "0");

    const hhs = hh.split("");
    const mms = mm.split("");
    const sss = ss.split("");

    const hourBlocks = hhs.map((h) => digitMap.get(Number(h)) || []);
    const minuteblocks = mms.map((m) => digitMap.get(Number(m)) || []);
    const secondBlocks = sss.map((s) => digitMap.get(Number(s)) || []);

    setTimeBlocks(() => ({
      hh: hourBlocks,
      mm: minuteblocks,
      ss: secondBlocks,
    }));
  };

  useEffect(() => {
    getTime();
    const intervalId = setInterval(() => {
      getTime();
      setSec((pre) => !pre);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <main className="bg-black flex h-svh w-full justify-center items-center">
      <div className="flex gap-2">
        <div className="flex flex-col w-fit">
          {symbols.get("col")!.map((row, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              {row.map((col, idx) => (
                <div
                  key={idx}
                  style={{ height: 12, width: 12, borderRadius: 6 }}
                  className={col ? "bg-light" : "bg-dark"}
                />
              ))}
            </div>
          ))}
        </div>

        <div>
          <div className="flex flex-col w-fit">
            {symbols.get("row")!.map((row, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                {row.map((col, idx) => (
                  <div
                    key={idx}
                    style={{ height: 12, width: 12, borderRadius: 6 }}
                    className={col ? "bg-light" : "bg-dark"}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex gap-2 w-fit">
            {timeBlocks.hh.map((block, idx) => (
              <div key={idx}>
                {block.map((row, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    {row.map((col, idx) => (
                      <div
                        key={idx}
                        style={{ height: 12, width: 12, borderRadius: 6 }}
                        className={col ? "bg-light" : "bg-dark"}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex flex-col">
              {symbols.get(":")!.map((row, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  {row.map((col, idx) => (
                    <div
                      key={idx}
                      style={{ height: 12, width: 12, borderRadius: 6 }}
                      className={blink(col)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {timeBlocks.mm.map((block, idx) => (
              <div key={idx}>
                {block.map((row, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    {row.map((col, idx) => (
                      <div
                        key={idx}
                        style={{ height: 12, width: 12, borderRadius: 6 }}
                        className={col ? "bg-light" : "bg-dark"}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}

            <div className="flex flex-col">
              {symbols.get(":")!.map((row, idx) => (
                <div key={idx} className="flex gap-2 mb-2">
                  {row.map((col, idx) => (
                    <div
                      key={idx}
                      style={{ height: 12, width: 12, borderRadius: 6 }}
                      className={blink(col)}
                    />
                  ))}
                </div>
              ))}
            </div>

            {timeBlocks.ss.map((block, idx) => (
              <div key={idx}>
                {block.map((row, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    {row.map((col, idx) => (
                      <div
                        key={idx}
                        style={{ height: 12, width: 12, borderRadius: 6 }}
                        className={col ? "bg-light" : "bg-dark"}
                      />
                    ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
          <div className="flex flex-col w-fit">
            {symbols.get("row")!.map((row, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                {row.map((col, idx) => (
                  <div
                    key={idx}
                    style={{ height: 12, width: 12, borderRadius: 6 }}
                    className={col ? "bg-light" : "bg-dark"}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col w-fit">
          {symbols.get("col")!.map((row, idx) => (
            <div key={idx} className="flex gap-2 mb-2">
              {row.map((col, idx) => (
                <div
                  key={idx}
                  style={{ height: 12, width: 12, borderRadius: 6 }}
                  className={col ? "bg-light" : "bg-dark"}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}

export default App;
