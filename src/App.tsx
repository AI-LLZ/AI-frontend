import { useCallback, useEffect, useRef, useState } from "react";

import ProgressBar from "./components/ProgressBar";
import "./App.css";
import RecordRTC from "recordrtc";

const App = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [recorder, setRecorder] = useState<RecordRTC | null>(null);
  const [progress, setProgress] = useState(0);

  const fileRef = useRef<HTMLInputElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!navigator.mediaDevices) {
      console.error("media API not supported");
      return;
    }

    const recorderOptions: RecordRTC.Options = {
      disableLogs: true,
      mimeType: "audio/wav",
      numberOfAudioChannels: 1,
      sampleRate: 44100,
      recorderType: RecordRTC.StereoAudioRecorder,
      timeSlice: 1000,
      type: "audio"
    };

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(s => setRecorder(new RecordRTC(s, recorderOptions)))
      .catch(e => console.error(e));
  }, []);

  const handleRecord = useCallback(() => {
    if (!recorder) return;

    if (progress !== 100) {
      if (!recording) {
        recorder.reset();
        setProgress(0);
        recorder.startRecording();

        setRecording(true);
      } else {
        recorder.stopRecording(() => {
          setRecording(false);
          setAudioBlob(recorder.getBlob());
        });
      }
    } else {
    }
  }, [recorder, recording, progress]);

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__title">Frontend Title</div>
        <ProgressBar completed={progress} />
        <div className="App__buttons">
          <button
            className="App__button"
            disabled={recorder === null}
            onClick={handleRecord}
          >
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
