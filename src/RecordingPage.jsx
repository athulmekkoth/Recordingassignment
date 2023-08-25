import { useReactMediaRecorder } from "react-media-recorder";
import { useState, useRef, useEffect } from "react";

const RecordingPage = () => {
  const [recordingOptions, setRecordingOptions] = useState({
    videoChoice: false,
    audioChoice: false,
    screenChoice: false,
  });
  const [startBtn, setStartBtn] = useState('Start Recording');

  const videoRef = useRef(null);

  const { videoChoice, audioChoice, screenChoice } = recordingOptions;

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    previewStream,
  } = useReactMediaRecorder({
    screen: screenChoice,
    video: videoChoice,
    audio: audioChoice,
  });

  useEffect(() => {
    if (previewStream && videoRef.current) {
      videoRef.current.srcObject = previewStream;
    }
  }, [previewStream]);

  useEffect(() => {
    if (status === 'recording') {
      setStartBtn('Recording');
    }
  }, [status]);
  const handleSaveToLocal = () => {
    if (mediaBlobUrl) {
      localStorage.setItem('recordedMedia', mediaBlobUrl);
      alert('Recording saved to Local Storage');
    }
  };
  const handleChange = (e) => {
    const { value } = e.target;
    if (value === 'video') {
      setRecordingOptions({
        screenChoice: true,
        videoChoice: true,
        audioChoice: false,
      });
    } else if (value === 'videoaudio') {
      setRecordingOptions({
        videoChoice: false,
        screenChoice: true,
        audioChoice: true,
      });
    }
    else if (value === 'camera') {
        setRecordingOptions({
          videoChoice: true,
          screenChoice: false,
          audioChoice: false,
        });
      }
      else if (value === 'cameraaudio') {
        setRecordingOptions({
          videoChoice: true,
          screenChoice: false,
          audioChoice: true,
        });
      }
  };

  const handleRecordingBtn = (val) => {
    if (val === 'start') {
      if (
        recordingOptions.audioChoice ||
        recordingOptions.videoChoice ||
        recordingOptions.screenChoice
      ) {
        startRecording();
      } else {
        alert('Please Select a Recording Choice');
      }
    } else if (val === 'stop') {
      stopRecording();
      setStartBtn('Start Recording');
    }
  };

  const styles = {
    mainRecorder: {
      display: 'flex',
      flexDirection: 'row',
    },
    leftMainRecorder: {
      flex: 1,
      padding: '20px',
      borderRight: '1px solid #ccc',
    },
    recordingOptions: {
      marginBottom: '20px',
    },
    recHeading: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    options: {
      marginTop: '10px',
    },
    option: {
      marginBottom: '10px',
    },
    recordingBtn: {
      marginTop: '20px',
    },
    startRecordingBtn: {
      backgroundColor: '#007bff',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    recordingStatusPreview: {
      display: 'flex',
      flexDirection: 'column',
    },
    recordingStatus: {
      marginBottom: '10px',
    },
    previewHeading: {
      fontSize: '18px',
      fontWeight: 'bold',
    },
    videoPreview: {
      marginTop: '10px',
    },
    stopRecordingBtn: {
      backgroundColor: '#dc3545',
      color: '#fff',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    rightMainRecorder: {
      flex: 1,
      padding: '20px',
    },
    heading: {
      fontSize: '20px',
      fontWeight: 'bold',
      marginBottom: '10px',
    },
    recordedVideos: {
      display: 'flex',
      flexDirection: 'column',
    },
    indVideo: {
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.mainRecorder}>
      <div style={styles.leftMainRecorder}>
        <div style={styles.recordingOptions}>
          <p style={styles.recHeading}>Recording Choice</p>
          <div style={styles.options}>
            <div style={styles.option}>
              <input
                type="radio"
                onChange={handleChange}
                name="recordingoption"
                id="recordingoptiono1"
                value="videoaudio"
              />
              <label htmlFor="recordingoptiono1">Video and Audio</label>
            </div>

            <div style={styles.option}>
              <input
                type="radio"
                onChange={handleChange}
                name="recordingoption"
                id="recordingoptiono3"
                value="video"
              />
              <label htmlFor="recordingoptiono3">Video</label>
            </div>
            <div style={styles.option}>
              <input
                type="radio"
                onChange={handleChange}
                name="recordingoption"
                id="recordingoptiono3"
                value="camera"
              />
              <label htmlFor="recordingoptiono3">Camera</label>
            </div>

            <div style={styles.option}>
              <input
                type="radio"
                onChange={handleChange}
                name="recordingoption"
                id="recordingoptiono3"
                value="cameraaudio"
              />
              <label htmlFor="recordingoptiono3">Camera and Audio</label>
            </div>
          </div>
          <div style={styles.recordingBtn}>
            <button
              style={styles.startRecordingBtn}
              onClick={() => handleRecordingBtn('start')}
            >
              {startBtn}
            </button>
          </div>
        </div>

        <div style={styles.recordingStatusPreview}>
          <div style={styles.recordingStatus}>
            Recording Status: <b>{status === 'recording' ? "status" : null} {status}</b>
          </div>

          <div style={styles.recordPreview}>
            <p style={styles.previewHeading}>Preview</p>
            <div style={styles.videoPreview}>
              {status === 'recording' && (
                <video
                  ref={videoRef}
                  style={{ display: 'block', maxWidth: '100%' }}
                  autoPlay
                  muted
                />
              )}
            </div>

            {status === 'recording' && (
              <div style={styles.recordingBtn}>
                <button
                  style={styles.stopRecordingBtn}
                  onClick={() => handleRecordingBtn('stop')}
                >
                  Stop
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={styles.rightMainRecorder}>
        <div style={styles.heading}>Recorded Items</div>
        <div style={styles.recordedVideos}>
          <div style={styles.indVideo}>
            {mediaBlobUrl ? (
              <>
                <video src={mediaBlobUrl} controls />
                <button style={styles.saveToLocalBtn} onClick={handleSaveToLocal}>
                  Save to Local Storage
                </button>
              </>
            ) : (
              <p>No Recording Found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecordingPage;
