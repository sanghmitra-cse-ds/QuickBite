export default function Toast({ message }) {
  if (!message) return null;

  return (
    <div
      id="toast"
      style={{
        position: 'fixed',
        bottom: '28px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: 'linear-gradient(135deg,#FF4B2B,#FF416C)',
        color: 'white',
        padding: '12px 28px',
        borderRadius: '30px',
        fontWeight: 600,
        fontSize: '14px',
        zIndex: 300,
        animation: 'fadeUp 0.3s ease both',
        fontFamily: "'DM Sans',sans-serif",
        boxShadow: '0 8px 24px rgba(255,75,43,0.4)',
      }}
    >
      {message}
    </div>
  );
}
