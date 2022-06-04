import React, { useEffect, useState } from "react";

import "./App.css";

const App = () => {
  const [recording, setRecording] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const [recorder, setRecorder] = useState<MediaRecorder>(null);

  useEffect(() => {
    const init = async () => {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        let s: MediaStream;
        try {
          s = await navigator.mediaDevices.getUserMedia({
            audio: { sampleRate: 44100, sampleSize: 16, channelCount: 1 }
          });
        } catch (e) {
          console.error(e);
          return;
        }
        const r = new MediaRecorder(s, { mimeType: "audio/webm" });
        r.ondataavailable = e => setAudioChunks([...audioChunks, e.data]);
        setRecorder(r);
      } else console.error("media API not supported");
    };
    init();
  }, []);

  const record = () => {
    if (!canSubmit) {
      if (recorder) {
        if (!recording) {
          recorder.start();
          setRecording(true);
        } else {
          recorder.stop();
          setRecording(false);
          setCanSubmit(true);
        }
      }
    } else {
      const url = URL.createObjectURL(new Blob(audioChunks));

      // TODO: send to server
      const a = document.createElement("a");
      a.href = url;
      a.download = "audio.webm";
      a.click();
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__title">Frontend Title</div>
        <button className="App__record" onClick={record}>
          {recorder
            ? canSubmit
              ? "submit"
              : recording
              ? "stop"
              : "record"
            : "loading..."}
        </button>
      </header>
    </div>
  );
};

export default App;
