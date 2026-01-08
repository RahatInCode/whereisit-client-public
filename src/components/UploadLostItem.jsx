// client/src/components/UploadLostItem.jsx
import React, { useEffect, useState } from 'react';
import api from '../api/client';

function UploadLostItem() {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [serverResponse, setServerResponse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleFileChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!f.type.startsWith('image/')) {
      setError('Please select an image file (jpg, png, etc.)');
      setFile(null);
      setPreviewUrl(null);
      return;
    }

    setError(null);
    setFile(f);
    setServerResponse(null);
    const localUrl = URL.createObjectURL(f);
    setPreviewUrl(localUrl);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setError('Choose an image before uploading.');
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setError(null);
      setServerResponse(null);

      const formData = new FormData();
      formData.append('image', file);

      const res = await api.post('/api/uploads/lost', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (evt) => {
          if (evt.total) {
            const pct = Math.round((evt.loaded * 100) / evt.total);
            setProgress(pct);
          }
        },
      });

      setServerResponse(res.data);
    } catch (err) {
      const msg =
        err?.response?.data?.message ||
        err?.message ||
        'Upload failed. Please try again.';
      setError(msg);
    } finally {
      setUploading(false);
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setProgress(0);
    setServerResponse(null);
    setError(null);
  };

  return (
    <>
      <style>{keyframes}</style>
      <div style={styles.wrap}>
        <div style={styles.header}>
          <h2 style={styles.title}>Upload Lost Item</h2>
          <div style={styles.icon}>📸</div>
          <p style={styles.subtitle}>
            Upload an image to help us find visual matches using AI-powered recognition
          </p>
        </div>

        <form onSubmit={handleSubmit} style={styles.card}>
          <label style={styles.fileLabel}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              style={{ display: 'none' }}
            />
            <div style={styles.fileButton} className="file-button">
              <svg style={styles.uploadIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              <span style={styles.fileButtonText}>Choose Image</span>
              <span style={styles.fileButtonSubtext}>or drag and drop</span>
            </div>
          </label>

          {file && !previewUrl && (
            <div style={styles.fileName} className="fade-in">
              <span style={styles.fileNameText}>📄 {file.name}</span>
            </div>
          )}

          {previewUrl && (
            <div style={styles.previewContainer} className="fade-in">
              <div style={styles.previewWrapper}>
                <img
                  src={previewUrl}
                  alt="Preview"
                  style={styles.previewImage}
                  className="scale-in"
                />
                <div style={styles.imageOverlay}>
                  <span style={styles.imageName}>{file?.name}</span>
                </div>
              </div>
            </div>
          )}

          <div style={styles.buttonGroup}>
            <button 
              type="submit" 
              disabled={!file || uploading} 
              style={{
                ...styles.primaryBtn,
                ...((!file || uploading) && styles.btnDisabled)
              }}
              className="primary-button"
            >
              {uploading ? (
                <>
                  <span style={styles.spinner} className="spinner"></span>
                  Uploading...
                </>
              ) : (
                <>
                  <svg style={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                  </svg>
                  Upload
                </>
              )}
            </button>
            <button 
              type="button" 
              onClick={reset} 
              disabled={uploading} 
              style={{
                ...styles.secondaryBtn,
                ...(uploading && styles.btnDisabled)
              }}
              className="secondary-button"
            >
              <svg style={styles.btnIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>

          {uploading && (
            <div style={styles.progressContainer} className="fade-in">
              <div style={styles.progressHeader}>
                <span style={styles.progressLabel}>Uploading</span>
                <span style={styles.progressPercent}>{progress}%</span>
              </div>
              <div style={styles.progressOuter}>
                <div 
                  style={{ ...styles.progressInner, width: `${progress}%` }}
                  className="progress-bar"
                />
              </div>
            </div>
          )}

          {error && (
            <div style={styles.alertError} className="fade-in slide-down">
              <svg style={styles.alertIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
              </svg>
              <div>
                <div style={styles.alertTitle}>Error</div>
                <div style={styles.alertMessage}>{error}</div>
              </div>
            </div>
          )}

          {serverResponse?.ok && (
            <div style={styles.alertSuccess} className="fade-in slide-down">
              <svg style={styles.alertIcon} viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
              </svg>
              <div style={{ flex: 1 }}>
                <div style={styles.alertTitle}>Upload Successful</div>
                <div style={styles.alertMessage}>Your image has been uploaded successfully</div>
                {serverResponse.fileUrl && (
                  <a 
                    href={serverResponse.fileUrl} 
                    target="_blank" 
                    rel="noreferrer"
                    style={styles.link}
                    className="link-hover"
                  >
                    View uploaded file →
                  </a>
                )}
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
}

const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideDown {
    from { 
      opacity: 0;
      transform: translateY(-10px);
    }
    to { 
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from { 
      opacity: 0;
      transform: scale(0.95);
    }
    to { 
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes spin {
    to { transform: rotate(360deg); }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  .fade-in {
    animation: fadeIn 0.3s ease-in;
  }

  .slide-down {
    animation: slideDown 0.4s ease-out;
  }

  .scale-in {
    animation: scaleIn 0.3s ease-out;
  }

  .spinner {
    animation: spin 0.8s linear infinite;
  }

  .progress-bar {
    transition: width 0.3s ease;
    animation: shimmer 2s infinite;
    background: linear-gradient(
      90deg,
      #000 0%,
      #333 50%,
      #000 100%
    );
    background-size: 1000px 100%;
  }

  .file-button {
    transition: all 0.3s ease;
  }

  .file-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.12);
    border-color: #000;
  }

  .primary-button {
    transition: all 0.3s ease;
  }

  .primary-button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
    background: #000;
  }

  .primary-button:not(:disabled):active {
    transform: translateY(0);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }

  .secondary-button {
    transition: all 0.3s ease;
  }

  .secondary-button:not(:disabled):hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    background: #f9fafb;
    border-color: #000;
  }

  .secondary-button:not(:disabled):active {
    transform: translateY(0);
  }

  .link-hover {
    transition: all 0.2s ease;
  }

  .link-hover:hover {
    transform: translateX(4px);
  }
`;

const styles = {
  wrap: { 
    maxWidth: 580, 
    margin: '48px auto', 
    padding: '0 20px',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
    position: 'relative',
  },
  title: {
    fontSize: 32,
    fontWeight: 700,
    margin: '0 0 12px 0',
    color: '#000',
    letterSpacing: '-0.5px',
  },
  icon: {
    fontSize: 48,
    margin: '16px 0',
    display: 'inline-block',
    filter: 'grayscale(100%)',
  },
  subtitle: {
    fontSize: 15,
    color: '#666',
    margin: 0,
    lineHeight: 1.6,
    maxWidth: 420,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  card: {
    border: '1px solid #e5e7eb',
    borderRadius: 16,
    padding: 28,
    background: '#fff',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.02), 0 12px 24px rgba(0, 0, 0, 0.04)',
  },
  fileLabel: { 
    display: 'block',
    width: '100%',
  },
  fileButton: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 20px',
    background: '#fafafa',
    borderRadius: 12,
    cursor: 'pointer',
    border: '2px dashed #d1d5db',
    textAlign: 'center',
    position: 'relative',
  },
  uploadIcon: {
    width: 48,
    height: 48,
    marginBottom: 12,
    color: '#000',
    strokeWidth: 1.5,
  },
  fileButtonText: {
    fontSize: 16,
    fontWeight: 600,
    color: '#000',
    marginBottom: 4,
  },
  fileButtonSubtext: {
    fontSize: 13,
    color: '#9ca3af',
    fontWeight: 400,
  },
  fileName: {
    marginTop: 16,
    padding: 12,
    background: '#f9fafb',
    borderRadius: 8,
    border: '1px solid #e5e7eb',
  },
  fileNameText: {
    fontSize: 14,
    color: '#374151',
  },
  previewContainer: {
    marginTop: 20,
  },
  previewWrapper: {
    position: 'relative',
    borderRadius: 12,
    overflow: 'hidden',
    border: '1px solid #e5e7eb',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
  previewImage: {
    width: '100%',
    display: 'block',
    maxHeight: 400,
    objectFit: 'cover',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
    padding: '24px 16px 12px',
  },
  imageName: {
    color: '#fff',
    fontSize: 13,
    fontWeight: 500,
  },
  buttonGroup: {
    display: 'flex',
    gap: 12,
    marginTop: 24,
  },
  primaryBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 24px',
    background: '#111827',
    color: '#fff',
    border: 'none',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  secondaryBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    padding: '12px 24px',
    background: '#fff',
    color: '#111827',
    border: '2px solid #e5e7eb',
    borderRadius: 10,
    cursor: 'pointer',
    fontSize: 15,
    fontWeight: 600,
    letterSpacing: '0.01em',
  },
  btnDisabled: {
    opacity: 0.5,
    cursor: 'not-allowed',
    transform: 'none !important',
  },
  btnIcon: {
    width: 18,
    height: 18,
    strokeWidth: 2,
  },
  spinner: {
    width: 16,
    height: 16,
    border: '2px solid rgba(255, 255, 255, 0.3)',
    borderTopColor: '#fff',
    borderRadius: '50%',
    display: 'inline-block',
  },
  progressContainer: {
    marginTop: 20,
    padding: 16,
    background: '#f9fafb',
    borderRadius: 10,
    border: '1px solid #e5e7eb',
  },
  progressHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  progressLabel: {
    fontSize: 13,
    fontWeight: 600,
    color: '#374151',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  progressPercent: {
    fontSize: 13,
    fontWeight: 700,
    color: '#000',
  },
  progressOuter: {
    width: '100%',
    height: 6,
    background: '#e5e7eb',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progressInner: {
    height: '100%',
    background: '#000',
    borderRadius: 10,
  },
  alertError: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    border: '1px solid #000',
    background: '#fff',
    display: 'flex',
    gap: 12,
    alignItems: 'start',
  },
  alertSuccess: {
    marginTop: 20,
    padding: 16,
    borderRadius: 10,
    border: '1px solid #000',
    background: '#000',
    color: '#fff',
    display: 'flex',
    gap: 12,
    alignItems: 'start',
  },
  alertIcon: {
    width: 24,
    height: 24,
    flexShrink: 0,
  },
  alertTitle: {
    fontSize: 14,
    fontWeight: 700,
    marginBottom: 4,
    letterSpacing: '0.01em',
  },
  alertMessage: {
    fontSize: 13,
    opacity: 0.8,
    lineHeight: 1.5,
  },
  link: {
    display: 'inline-block',
    marginTop: 8,
    fontSize: 13,
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 600,
    borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
  },
};

export default UploadLostItem;