import { useState } from "react";

interface useRecorderProps {
  constraints: MediaStreamConstraints;
}

const useRecorder = ({ constraints }: useRecorderProps) => {
  if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia(constraints).then(
      stream => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        // const node = audioContext.audioWorklet.addModule();
      },
      err => {
        console.error(err);
      }
    );
  }
};
