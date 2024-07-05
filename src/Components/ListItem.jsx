import React from 'react';

function ListItem({ id, value, onClick }) {
  return (
    <li>
      {value}
      <button onClick={() => onClick(id)}>Изменить</button>
    </li>
  );
}

export default ListItem;
