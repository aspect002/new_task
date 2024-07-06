import React, { useState, useRef } from 'react';
import List from './Components/List';

function App() {
  const [data, setData] = useState([
    { id: crypto.randomUUID(), value: 'Item 1' },
    { id: crypto.randomUUID(), value: 'Item 2' },
    { id: crypto.randomUUID(), value: 'Item 3' },
  ]);
  const [newItemValue, setNewItemValue] = useState('');
  const inputRef = useRef(null);
  const [isFocused, setIsFocused] = useState(false);
  const [isButtonActive, setIsButtonActive] = useState(false);

  const handleAddItem = () => {
    if (newItemValue.trim() !== '') {
      const newId = crypto.randomUUID();
      setData(data =>[...data, { id: newId, value: newItemValue }])
      setNewItemValue('');
      inputRef.current.focus();
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddItem();
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: '#8b58ff',
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          padding: '2rem',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1>My List App</h1>
        <div style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            ref={inputRef}
            value={newItemValue}
            onChange={(e) => setNewItemValue(e.target.value)}
            onKeyDown={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Введите новый элемент"
            style={{
              padding: '0.5rem',
              marginRight: '0.5rem',
              borderRadius: '4px',
              border: `1px solid ${isFocused ? '#8b58ff' : '#ccc'}`,
            }}
          />
          <button
            onClick={handleAddItem}
            onMouseDown={() => setIsButtonActive(true)}
            onMouseUp={() => setIsButtonActive(false)}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: `${isButtonActive ? '#6f3de0' : '#8b58ff'}`,
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Добавить
          </button>
        </div>
        <List data={data} />
      </div>
    </div>
  );
}

export default App;
