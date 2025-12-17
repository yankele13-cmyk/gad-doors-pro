'use client';

import { useState, useRef, useEffect } from 'react';
import Moveable from 'react-moveable';
import { useLanguage } from '@/context/LanguageContext';
import { getProductsByCategory } from '@/services/business/productStore';

export default function DoorVisualizer() {
  const { t, language } = useLanguage();
  const [background, setBackground] = useState(null);
  const [selectedDoor, setSelectedDoor] = useState(null);
  const [doors, setDoors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPerspectiveMode, setIsPerspectiveMode] = useState(false);
  
  // Refs
  const fileInputRef = useRef(null);
  const targetRef = useRef(null);

  // Fetch real doors on mount
  useEffect(() => {
    const fetchDoors = async () => {
      try {
        const data = await getProductsByCategory('doors');
        const activeDoors = data.filter(p => !p.is_hidden);
        setDoors(activeDoors);
      } catch (err) {
        console.error("Failed to load doors for visualizer", err);
      } finally {
        setLoading(false);
      }
    };
    fetchDoors();
  }, []);

  const getDoorName = (door) => {
      return language === 'he' && door.name_he ? door.name_he : door.name;
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return '/images/placeholder.jpg';
    if (imagePath.startsWith('http')) return imagePath; 
    if (imagePath.startsWith('/images/')) return imagePath;
    if (imagePath.startsWith('studio')) return `/images/${imagePath}`;
    return imagePath;
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setBackground(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setBackground(null);
    setSelectedDoor(null);
    setIsPerspectiveMode(false);
  };

  return (
    <div className="visualizer-container" style={{ display: 'flex', flexDirection: 'column', gap: '20px', minHeight: '80vh' }}>
      
      {/* Controls / Door Selection */}
      <div className="visualizer-controls" style={{ padding: '20px', background: '#f5f5f5', borderRadius: '8px' }}>
        {loading ? (
             <div style={{ padding: '20px', textAlign: 'center' }}>Chargement des portes...</div>
        ) : (
            <div className="door-selector" style={{ display: 'flex', gap: '15px', overflowX: 'auto', padding: '10px 0' }}>
              {doors.map((door) => (
                <div 
                  key={door.id} 
                  onClick={() => setSelectedDoor(door)}
                  style={{ 
                    border: selectedDoor?.id === door.id ? '2px solid var(--accent-color)' : '1px solid #ddd',
                    padding: '10px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    background: 'white',
                    minWidth: '120px',
                    textAlign: 'center',
                    transition: 'all 0.2s',
                    opacity: selectedDoor?.id === door.id ? 1 : 0.7
                  }}
                >
                  <div style={{ width: '100px', height: '150px', margin: '0 auto 10px', position: 'relative' }}>
                     <img 
                        src={getImageUrl(door.image)} 
                        alt={getDoorName(door)}
                        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                     />
                  </div>
                  <p style={{ fontSize: '0.9rem', margin: 0, fontWeight: '500' }}>{getDoorName(door)}</p>
                </div>
              ))}
            </div>
        )}

        {/* Action Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                    className="btn btn-outline"
                    onClick={() => fileInputRef.current.click()}
                >
                    <i className="fas fa-camera"></i> Upload a picture
                </button>
                <input 
                    type="file" 
                    ref={fileInputRef} 
                    onChange={handleFileChange} 
                    accept="image/*" 
                    style={{ display: 'none' }} 
                />
                {background && (
                    <button className="btn" style={{ background: '#ff4d4f', color: 'white', border: 'none' }} onClick={handleReset}>
                    Reset
                    </button>
                )}
            </div>

            {/* Perspective Toggle - Only show if door is active */}
            {/* Perspective Toggle - Only show if door is active */}
            {selectedDoor && (
                <div style={{ display: 'flex', background: 'white', padding: '5px', borderRadius: '12px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                    <button
                        onClick={() => setIsPerspectiveMode(false)}
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '8px',
                            background: !isPerspectiveMode ? '#2d3436' : 'transparent',
                            color: !isPerspectiveMode ? 'white' : '#636e72',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <i className="fas fa-arrows-alt"></i> Simple
                    </button>
                    <button
                        onClick={() => setIsPerspectiveMode(true)}
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            borderRadius: '8px',
                            background: isPerspectiveMode ? 'linear-gradient(135deg, #ff4757 0%, #ff6b81 100%)' : 'transparent',
                            color: isPerspectiveMode ? 'white' : '#636e72',
                            fontWeight: 600,
                            cursor: 'pointer',
                            fontSize: '0.9rem',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            transition: 'all 0.2s'
                        }}
                    >
                        <i className="fas fa-cube"></i> Perspective 3D
                    </button>
                </div>
            )}
        </div>
      </div>

      {/* Workspace Area */}
      <div 
        className="visualizer-workspace" 
        style={{ 
          flex: 1, 
          background: '#333', 
          position: 'relative', 
          overflow: 'hidden',
          borderRadius: '8px',
          minHeight: '600px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          touchAction: 'none' // Crucial for mobile drag
        }}
      >
        {!background ? (
          <div style={{ color: '#aaa', textAlign: 'center' }}>
            <i className="fas fa-image" style={{ fontSize: '48px', marginBottom: '15px' }}></i>
            <p>Upload une photo pour commencer</p>
          </div>
        ) : (
          <div style={{ position: 'relative', width: '100%', height: '100%' }}>
             {/* Background Image */}
             <img 
               src={background} 
               alt="Room Background" 
               style={{ 
                 width: '100%', 
                 height: '100%', 
                 objectFit: 'contain',
                 pointerEvents: 'none',
                 userSelect: 'none'
               }} 
             />

             {/* Draggable Door Sticker (Target for Moveable) */}
             {selectedDoor && (
               <>
                   <div 
                        ref={targetRef}
                        className="door-target"
                        style={{
                            position: 'absolute',
                            top: '20%',
                            left: '40%',
                            width: '150px',
                            height: '300px',
                            transformOrigin: '0 0', // Important for matrix calculations
                        }}
                   >
                        <img 
                            src={getImageUrl(selectedDoor.image)} 
                            alt={selectedDoor.name} 
                            style={{ 
                                width: '100%', 
                                height: '100%', 
                                objectFit: 'fill', 
                                pointerEvents: 'none', // Allow clicks to pass to Moveable
                                filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.3))'
                            }} 
                        />
                   </div>

                   <Moveable
                        target={targetRef}
                        /* General Props */
                        draggable={true} /* Always allow dragging */
                        resizable={!isPerspectiveMode}
                        warpable={isPerspectiveMode}
                        rotatable={!isPerspectiveMode} 
                        
                        /* Styles */
                        throttleDrag={0}
                        throttleResize={0}
                        throttleWarp={0}
                        /* Don't restrict directions in perspective mode, let Warp handle it */
                        renderDirections={isPerspectiveMode ? undefined : ["nw","n","ne","w","e","sw","s","se"]}
                        edge={false}
                        zoom={1}
                        origin={false}
                        padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
                        
                        /* Colors */
                        controlBoxClassName={isPerspectiveMode ? "perspective-controls" : "simple-controls"}
                        
                        /* Events: DRAG (Standard + Warp) */
                        onDrag={({ target, transform }) => {
                            target.style.transform = transform;
                        }}
                        
                        /* Events: RESIZE (Standard) */
                        onResize={({ target, width, height, delta }) => {
                            delta[0] && (target.style.width = `${width}px`);
                            delta[1] && (target.style.height = `${height}px`);
                        }}

                        /* Events: ROTATE (Standard) */
                        onRotate={({ target, transform }) => {
                            target.style.transform = transform;
                        }}

                        /* Events: WARP (Perspective) */
                        onWarp={({ target, transform }) => {
                            target.style.transform = transform;
                        }}
                   />
               </>
             )}
          </div>
        )}
      </div>

      <div style={{ padding: '20px', textAlign: 'center', color: '#666', fontSize: '14px', fontStyle: 'italic' }}>
          {isPerspectiveMode 
            ? "💡 Mode 3D : Tirez les 4 coins pour ajuster la perspective de la porte." 
            : "💡 Mode Simple : Déplacez, redimensionnez ou pivotez la porte."}
      </div>
      
      {/* Custom Styles for Moveable Handles */}
      <style jsx global>{`
        .moveable-control-box {
            --moveable-color: var(--accent-color) !important;
        }
        .perspective-controls .moveable-line {
            background: #ff4757 !important; 
        }
        .perspective-controls .moveable-control {
            background: #ff4757 !important;
            border: 3px solid white !important;
            width: 20px !important; 
            height: 20px !important;
            margin-top: -10px !important; /* Center the larger handle */
            margin-left: -10px !important;
            border-radius: 50% !important;
            box-shadow: 0 2px 5px rgba(0,0,0,0.3) !important;
        }
      `}</style>
    </div>
  );
}
