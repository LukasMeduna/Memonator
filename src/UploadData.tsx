import React from "react";
import InsertText from "./InsertText";
import DictionaryItem from "./DictionaryItem";
import { sampleData } from "./sampleData";

export default function UploadData(props: {
  uploadDictionary: (uploadedData: DictionaryItem[]) => void;
}) {
  const createDictionaryFromData = (data: String) => {
    let items: DictionaryItem[] = [];
    for (let line of data.split("\n")) {
      if (line.trim() === "" || !line.includes(";")) continue;
      const [a, q] = line.split(";");
      items.push(new DictionaryItem(a, q));
    }
    if (items.length<1) {
      throw new Error("The file format is not correct.");
    }
    return items;
  };

  const uploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const readFile = new FileReader();
      readFile.readAsText(file, "UTF-8");
      readFile.onload = (readerEvent: ProgressEvent<FileReader>) => {
        try {
          if (readerEvent?.target?.result) {
            const data = readerEvent.target.result as String;
            const dictionary = createDictionaryFromData(data);

            props.uploadDictionary(dictionary);
          }
        } catch (error) {
          (document.getElementById("cardsFileInput") as HTMLInputElement).value =
            "";
          alert(error);
        }
      };
    }
  };

  const loadSampleDictionary = () => {
    const sampleDictionary = createDictionaryFromData(sampleData);
    props.uploadDictionary(sampleDictionary);
  };

  const loadTextDictionary = (text: String) => {
    const dictionary = createDictionaryFromData(text);
    props.uploadDictionary(dictionary);
  };

  return (
    <div className="uploadData">
      Upload file:
      <br />
      <input type="file" id="cardsFileInput" onChange={uploadFile} />
      <br />
      <br /> --------- OR --------- <br />
      <br />
      Insert text: <InsertText loadTextDictionary={loadTextDictionary} />
      <br />
      <br /> --------- OR --------- <br />
      <br />
      <button onClick={loadSampleDictionary}>Load sample dictionary</button>
    </div>
  );
}
