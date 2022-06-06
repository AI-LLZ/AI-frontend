import { useRef, useState } from "react";
import type { ChangeEventHandler } from "react";
import RecordRTC from "recordrtc";

import ProgressBar from "./components/ProgressBar";
import "./App.css";

const App = () => {
  const [recording, setRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [progress, setProgress] = useState(0);

  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleRecord = async () => {
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

    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch (e) {
      console.error("cannot access microphone, please upload file instead");
      return;
    }
    const recorder = new RecordRTC(stream, recorderOptions);

    setRecording(true);
    recorder.startRecording();

    for (let i = 1; i <= 20; i++) {
      await new Promise(r => setTimeout(r, 300));
      setProgress(i * 5);
    }

    recorder.stopRecording(() => {
      setAudioBlob(recorder.getBlob());
      setRecording(false);
      recorder.destroy();
    });
  };

  const handleUpload: ChangeEventHandler<HTMLInputElement> = e => {
    const filelist = e.target.files;
    if (filelist === null) return;
    const file = filelist[0];
    if (!file.type.match(/audio\/(x-)?wav/)) {
      console.error(file.type, "is not an wav file");
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      const data = e.target!.result;
      if (data === null) return;
      setProgress(100);
      setAudioBlob(new Blob([data]));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    if (audioBlob === null) return;
    if (process.env.REACT_APP_API_URL === undefined) {
      console.error("REACT_APP_API_URL is not defined");
      return;
    }
    const response = await fetch(process.env.REACT_APP_API_URL, {
      body: audioBlob,
      method: "POST",
      mode: "cors"
    });
    if (!response.ok) {
      console.error(response);
      return;
    }
    console.log(response);
  };

  return (
    <div className="App">
      <header className="App__header">
        <div className="App__title">Frontend Title</div>
        <ProgressBar completed={progress} />
        <div className="App__buttons">
          <button
            className="App__button"
            hidden={audioBlob !== null}
            disabled={recording}
            onClick={handleRecord}
          >
            {recording ? "recording..." : "record"}
          </button>
          <button
            className="App__button"
            hidden={audioBlob !== null}
            onClick={() => fileRef.current?.click()}
          >
            upload <sup>*</sup>
          </button>
          <button
            className="App__button"
            hidden={audioBlob === null}
            onClick={handleSubmit}
          >
            submit
          </button>
          <input
            type="file"
            ref={fileRef}
            hidden={true}
            onChange={handleUpload}
          />
        </div>
        <div className="App__comment" hidden={audioBlob !== null}>
          <sup>*</sup> currently supports wav only
        </div>
      </header>
    </div>
  );
};

export default App;
