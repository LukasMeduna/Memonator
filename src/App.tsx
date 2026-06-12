import { useState } from "react";
import UploadData from "./UploadData";
import DictionaryItem from "./DictionaryItem";
import CardSet from "./CardSet";

function shuffle(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export default function App() {
  const [dictionary, setDictionary] = useState<DictionaryItem[] | null>();

  const restart = () => {
    setDictionary(null);
  };

  const uploadDictionary = (uploadedData: DictionaryItem[]) => {
    shuffle(uploadedData);
    setDictionary(uploadedData);
  };

  if (!dictionary) {
    return (
      <div className="App">
        <UploadData uploadDictionary={uploadDictionary} />
      </div>
    );
  }
  return (
    <div className="App">
      <CardSet cards={dictionary} restart={restart} />
    </div>
  );
}
