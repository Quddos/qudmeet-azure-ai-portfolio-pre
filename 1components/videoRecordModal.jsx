// components/VideoRecordModal.js
import { useState, useRef } from 'react';

const VideoRecordModal = ({ isOpen, onClose }) => {
  const [recording, setRecording] = useState(false);
  const [videoURL, setVideoURL] = useState(null);
  const mediaRecorderRef = useRef(null);
  const videoRef = useRef(null);

  const startRecording = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
    mediaRecorderRef.current = new MediaRecorder(stream);
    
    mediaRecorderRef.current.ondataavailable = (event) => {
      const url = URL.createObjectURL(event.data);
      setVideoURL(url);
    };

    mediaRecorderRef.current.start();
    setRecording(true);
  };

  const stopRecording = () => {
    mediaRecorderRef.current.stop();
    setRecording(false);
  };

  const sendVideo = async () => {
    if (videoURL) {
      const response = await fetch(videoURL);
      const blob = await response.blob();

      const formData = new FormData();
      formData.append('video', blob, 'recorded_video.mp4');

      // Send the video to the email using your server-side API
      await fetch('/api/send-video', {
        method: 'POST',
        body: formData,
      });

      alert('Video sent successfully!');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>{recording ? 'Recording...' : 'Record a Video'}</h2>
        <video ref={videoRef} src={videoURL} controls autoPlay />
        <div>
          {!recording ? (
            <button onClick={startRecording}>Start Recording</button>
          ) : (
            <button onClick={stopRecording}>Stop Recording</button>
          )}
          <button onClick={sendVideo}>Send Video Now</button>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  );
};

export default VideoRecordModal;
