export default function TestPage() {
  return (
    <div style={{ backgroundColor: '#f0f0f0', padding: '50px', minHeight: '100vh' }}>
      <h1>DEBUG: Image Test Page</h1>
      <p>If you see the images below, the files exist and are served correctly.</p>
      
      <div style={{ border: '2px solid red', padding: '20px', margin: '20px 0' }}>
        <h3>Door Image</h3>
        <p>Path: /images/studioDoors/door-concrete-window.jpg</p>
        <img 
          src="/images/studioDoors/door-concrete-window.jpg" 
          alt="Door Test"
          style={{ maxWidth: '300px', display: 'block' }} 
        />
      </div>

      <div style={{ border: '2px solid blue', padding: '20px', margin: '20px 0' }}>
        <h3>Accessory Image</h3>
        <p>Path: /images/studioAccessories/accessory-hardware-style-2.jpg</p>
        <img 
          src="/images/studioAccessories/accessory-hardware-style-2.jpg" 
          alt="Accessory Test"
          style={{ maxWidth: '300px', display: 'block' }} 
        />
      </div>
    </div>
  );
}
