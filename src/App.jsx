import React, { useState, useEffect } from 'react';

const happyCatGifs = [
  "https://media.tenor.com/Qq1hnouswVwAAAAj/peach-cat-dancing.gif",
  "https://media.tenor.com/VDMk4K-ZC5kAAAAj/mochipeachcat-mochi-cat.gif",
  "https://media.tenor.com/dg7Th23TzFUAAAAj/cat_-vodk.gif",
  "https://media.tenor.com/pqx__VdGqfYAAAAj/yelynn-yelynn-hun-hun.gif",
  "https://media.tenor.com/C2fEiayc_0EAAAAj/peachcat-cat.gif",
  "https://media.tenor.com/7nkPhBs1tWMAAAAj/4.gif",
  "https://media.tenor.com/zkaB7Dlry8YAAAAj/hug.gif",
  "https://media.tenor.com/9Y-eDAjvU1sAAAAj/love-you.gif",
  "https://media.tenor.com/3otRG1fx8j8AAAAj/tkthao219-peach.gif"
];

const sadCatGifs = [
  "https://media.tenor.com/hFWtw7c5Z4QAAAAM/sad-cat-crying-cat.gif",
  "https://media.tenor.com/T-Prp7sAoAEAAAAj/good.gif",
  "https://media.tenor.com/UyrzwesbArIAAAAM/cat.gif",
  "https://media.tenor.com/ng7Rspov9EoAAAAM/single.gif",
  "https://media.tenor.com/lJM9VqwnsJIAAAAM/i-want-kisses-cat-cat.gif",
  "https://media.tenor.com/qODEmtkMXUIAAAAM/cat-meow-sad.gif"
];

const askCatGifs = [
  "https://media.tenor.com/HSxxt1scQXYAAAAM/cat-hugs.gif",
  "https://media.tenor.com/KWiXNaZ2OzkAAAAM/shironeko-cat-holding-a-flower-shironeko.gif",
  "https://media.tenor.com/gD1awOKldpcAAAAM/nanobombs-cat.gif"
];

const sarcasticCatGifs = [
  "https://media.tenor.com/zlKoX5HPPu8AAAAM/cat-annoyed.gif",
  "https://media.tenor.com/0eg7MZS_Q_YAAAAM/cat-cats.gif",
  "https://media.tenor.com/yo2Vzfau4G0AAAAM/cat-stare-angry-cat.gif",
  "https://media.tenor.com/-86-Ozt9ZR0AAAAM/wow.gif"
];

const yesMessages = [
  'My Baba pulls through yet again',
  'Yes to incest! (To the jury, this is in fact a joke alluding to the fact that we are twins of a non-related nature)',
  'I was never in doubt, dont click the no button :)',
  'Thank you for granting me custody of your heart',
  'Praise master Jesus, She said yes!',
  'Crusty ass Ibadan niggas stay losing, hazzah!',
  "To the first of many 🥂",
  "You are the hearth of my heart and I will always cherish you",
  "I start my day dreaming of you and end it thinking of you"
];

const noMessages = {
  'Noted ✍️': 'tease',
  'Not even for chinks?': 'sad',
  'I require compensation for a broken heart': 'sad',
  'I knew I wasn’t top of your roster': 'sad',
  'Be like say you misclick?': 'tease',
  'My baba don finally fail me': 'sad',
  "It's fine, Valentine's is a colonial construct anyways": 'tease',
  'I blame Ibadan': 'sad',
  "After grooming me?": "tease"
};

const getUniqueRandomItem = (arr, lastItem) => {
  let newItem;
  do {
    newItem = arr[Math.floor(Math.random() * arr.length)];
  } while (newItem === lastItem);
  return newItem;
};
const App = () => {
  const [message, setMessage] = useState('Will you be my valentine?');
  const [gif, setGif] = useState(getUniqueRandomItem(askCatGifs, null));
  const [seenMessages, setSeenMessages] = useState(new Set());
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const totalMessages = yesMessages.length + Object.keys(noMessages).length;
    if (seenMessages.size >= 0.8 * totalMessages) {
      setShowModal(true);
    }
  }, [seenMessages]);

  const handleYes = () => {
    const newMessage = getUniqueRandomItem(yesMessages, message);
    setMessage(newMessage);
    setGif(getUniqueRandomItem(happyCatGifs, gif));
    setSeenMessages(prev => new Set(prev).add(newMessage));
  };

  const handleNo = () => {
    const noKeys = Object.keys(noMessages);
    const selectedNoMessage = getUniqueRandomItem(noKeys, message);
    const category = noMessages[selectedNoMessage];
    
    setMessage(selectedNoMessage);
    setGif(category === 'sad' ? getUniqueRandomItem(sadCatGifs, gif) : getUniqueRandomItem(sarcasticCatGifs, gif));
    setSeenMessages(prev => new Set(prev).add(selectedNoMessage));
  };

  const downloadNote = () => {
    const blob = new Blob(["Hello my most beautiful and lovely valentine of whom I am well pleased. \n Here's a coupon for lunch! \n bleh bleh"], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "secret_note.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-red-100 text-center p-4">
      <img src={gif} alt="Reaction GIF" className="w-48 h-48 mb-6" />
      <h1 className="text-4xl font-pacifico text-rose-900 mix-blend-multiply mb-6">{message}</h1>
      <div className="flex space-x-4">
        <button onClick={handleYes} className="bg-rose-700 text-neutral-100 px-5 py-2.5 rounded-md text-md font-bold hover:bg-rose-800 transition transform hover:scale-105 shadow-md hover:shadow-lg">Yes</button>
        <button onClick={handleNo} className="bg-neutral-300 text-rose-900 px-5 py-2.5 rounded-md text-md font-bold hover:bg-neutral-400 transition transform hover:scale-105 shadow-md hover:shadow-lg">No</button>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-2 rounded-full"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">You found the secret note!</h2>
            <button onClick={downloadNote} className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">Download Note</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;

