import { useState, useEffect } from "react";
import "./App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

let colors = ["#7052ff", "#d06aff", "#ff81ff", "#ff7360", "#ffff51"];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const App = () => {
  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [backgroundColor, setBackgroundColor] = useState(getRandomColor());

  useEffect(() => {
    fetchQuote();
  }, []);

  const fetchQuote = async () => {
    try {
      const response = await fetch("https://api.quotable.io/random");
      const data = await response.json();
      setQuote(data.content);
      setAuthor(data.author);
      setBackgroundColor(getRandomColor());
    } catch (error) {
      console.error("Error fetching quote:", error);
    }
  };

  const handleNewQuote = () => {
    fetchQuote();
  };

  const tweetQuote = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      `"${quote}" - ${author}`
    )}`;
    window.open(twitterUrl, "_blank");
  };

  const shareOnReddit = () => {
    const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(
      "URL_DE_TU_APLICACION" // Reemplaza con la URL de tu aplicación
    )}&title=${encodeURIComponent(`"${quote}" - ${author}`)}`;
    window.open(redditUrl, "_blank");
  };

  return (
    <main id="quote-box" style={{ backgroundColor }}>
      <article className="text-center">
        <h3 id="text">{quote}</h3>
        <h4 id="author">
          <i className="bi bi-feather"> {author}</i>
        </h4>
        <div className="enlace">
          <button id="new-quote" onClick={handleNewQuote}>
            <i className="bi bi-arrow-counterclockwise"> New Quote</i>
          </button>
          <div>
            <a className="enlace-redes" href="#" onClick={tweetQuote}>
              <i className="bi bi-twitter"> Twitter</i>
            </a>
            <a className="enlace-redes" href="#" onClick={shareOnReddit}>
              <i className="bi bi-reddit"> Reddit</i>
            </a>
          </div>
        </div>
      </article>
    </main>
  );
};

export default App;
