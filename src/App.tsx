import { useCallback, useEffect, useRef, useState } from "react";

import ProgressBar from "./components/ProgressBar";
import "./App.css";

const App = () => {
  const [recording, setRecording] = useState(false);
  const [canSubmit, setCanSubmit] = useState(false);
  const [recorder, setRecorder] = useState<MediaRecorder | null>(null);

  const audioChunks = useRef<Blob[]>([]);
  const timer = useRef<NodeJS.Timeout | null>(null);
  const fileRef = useRef<HTMLInputElement | null>(null);

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
        r.ondataavailable = e => {
          if (e.data.size > 0) audioChunks.current.push(e.data);
        };
        setRecorder(r);
      } else console.error("media API not supported");
    };
    init();
  }, []);

  const record = useCallback(() => {
    if (!canSubmit) {
      if (recorder) {
        const stopRecording = () => {
          recorder.stop();
          setRecording(false);
          setCanSubmit(true);
        };
        if (!recording) {
          recorder.start();
          setRecording(true);
          timer.current = setTimeout(stopRecording, 5000);
        } else {
          if (timer.current) {
            clearTimeout(timer.current);
            timer.current = null;
          }
          stopRecording();
        }
      }
    } else {
      const blob = new Blob(audioChunks.current, {
        type: audioChunks.current[0].type
      });
      const req = new XMLHttpRequest();
      req.open("POST", `${process.env.HOST}/api/upload`, true);
      req.setRequestHeader("Content-Type", blob.type);
      req.setRequestHeader("Content-Transfer-Encoding", "base64");
      req.onload = () => {
        if (req.status === 200) {
          console.log("uploaded");
        } else {
          console.error("upload failed");
        }
      };
      req.send(blob);
    }
  }, [canSubmit, recorder, recording]);

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__title">Frontend Title</div>
        <ProgressBar completed={40} />
        <div className="App__buttons">
          <button className="App__button" onClick={record}>
            {recorder ? (recording ? "stop" : "record") : "loading..."}
          </button>
          <button
            className="App__button"
            onClick={() => fileRef.current?.click()}
          >
            upload
          </button>
          <input
            type="file"
            ref={fileRef}
            style={{ display: "none" }}
            onChange={() => {}}
          />
        </div>
      </header>
    </div>
  );
};

export default App;
