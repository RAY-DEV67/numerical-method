import { useState, useEffect, useCallback } from "react";

function Tick() {
  const [delta, setdelta] = useState(20 - Math.random() * 100);
  const [loopNumber, setloopNumber] = useState(0);
  const [isDeleting, setisDeleting] = useState(false);
  const [text, settext] = useState(" ");
  const period = 500;
  const toChange = ["Services", "Products", "Events", "Easy Life"];

  let i = loopNumber % toChange.length;
  let fulltext = toChange[i];

  const tick = useCallback(() => {
    let updatedText = isDeleting
      ? fulltext.substring(0, text.length - 1)
      : fulltext.substring(0, text.length + 1);
    settext(updatedText);

    if (isDeleting) {
      setdelta((prevdelta) => prevdelta / 2);
    }

    if (!isDeleting && updatedText === fulltext) {
      setisDeleting(true);
      setdelta(period);
    } else if (isDeleting && updatedText === "") {
      setisDeleting(false);
      setloopNumber(loopNumber + 1);
      setdelta(200);
    }
  }, [isDeleting, loopNumber, text.length, fulltext]);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  }, [text, delta, tick]);

  return text;
}

export default Tick;
