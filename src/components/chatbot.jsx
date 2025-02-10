import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Function to load the chatbot script
    const loadChatbotScript = () => {
      // Check if Chatbase is not initialized yet
      if (!window.chatbase || window.chatbase("getState") !== "initialized") {
        window.chatbase = (...args) => {
          if (!window.chatbase.q) {
            window.chatbase.q = [];
          }
          window.chatbase.q.push(args);
        };

        // Proxy to handle dynamic calls to chatbase
        window.chatbase = new Proxy(window.chatbase, {
          get(target, prop) {
            if (prop === "q") {
              return target.q;
            }
            return (...args) => target(prop, ...args);
          }
        });

        // Function to append the chatbot script
        const onLoad = () => {
          const script = document.createElement("script");
          script.src = "https://www.chatbase.co/embed.min.js";
          script.id = "fM-FEoRFMD_CM5zAt2G6I";
          script.domain = "www.chatbase.co";
          document.body.appendChild(script);
        };

        // Check if the document is loaded
        if (document.readyState === "complete") {
          onLoad();
        } else {
          window.addEventListener("load", onLoad);
        }
      }
    };

    // Call the function to load the chatbot script
    loadChatbotScript();

    // Cleanup when the component unmounts
    return () => {
      // Optionally remove the script if necessary
      const script = document.getElementById('fM-FEoRFMD_CM5zAt2G6I');
      if (script) {
        document.body.removeChild(script);
      }
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return (
    <div>
      <h1>Chatbot Integration</h1>
      <div id="chatbot-container">
        {/* The chatbot will likely initialize in the body or specific container */}
      </div>
    </div>
  );
};

export default Chatbot;
