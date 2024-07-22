import React, { useState, useRef, } from 'react';
import List from './Components/List';
import MyContext from './Components/My_context';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

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
      setData(data => [...data, { id: newId, value: newItemValue }])
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
    <MyContext.Provider value={theme}>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: theme === 'light' ? 'white' : 'black',
          color: theme === 'light' ? 'black' : 'white',
          transition: 'background-color 0.3s ease, color 0.3s ease',
        }}
      >
        <div
          style={{
            backgroundColor: theme === 'light' ? 'white' : '#333',
            padding: '2rem',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            transition: 'background-color 0.3s ease, color 0.3s ease',
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
                backgroundColor: theme === 'light' ? 'white' : '#333',
                color: theme === 'light' ? 'black' : 'white',
                transition: 'background-color 0.3s ease, color 0.3s ease',
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
                transition: 'background-color 0.3s ease, color 0.3s ease',
              }}
            >
              Добавить
            </button>
            <div className={`test-container ${theme}`}>
              <h1>Test Component</h1>
              <button
                onClick={toggleTheme}
                style={{
              backgroundColor: theme === 'light' ? 'black' : 'white',
              color: theme === 'light' ? 'white' : 'black',
              padding: '10px 20px',
              border: 'none',
              cursor: 'pointer',
              marginLeft: '60px',
              transition: 'background-color 0.3s ease, color 0.3s ease',
                }}
              >
              Toggle Theme
            </button>
          </div>
        </div>
        <List data={data} />
      </div>
    </div>
    </MyContext.Provider >
  );
}

export default App;
