'use client'
import {getOptions, setOptionsMethod} from './OptionsProvider.js';

export default function ComponentA() {
  const tasks = getOptions();
  // Нужно для того, чтобы где-то там наверху изменить значение tasks
  const dispatch = setOptionsMethod();
  let text = 'some'
  return (
    <div>
      Title = {tasks.title}
      <button onClick={() => {
        dispatch({
          type: 'added',
          id: nextId++,
          text: text,
        });
      }}>Add</button>
    </div>
  );
}

let nextId = 3;
