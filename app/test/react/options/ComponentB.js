'use client'
import { useState, useContext } from 'react';
import {getOptions, setOptionsMethod} from './OptionsProvider.js';

export default function ComponentB() {
  const tasks = getOptions();
  // Нужно для того, чтобы где-то там наверху изменить значение tasks
  const dispatch = setOptionsMethod();
  return (
    <div>
      Title = {tasks.title}
      <button onClick={() => {
        dispatch({
          type: 'deleted',
          id: task.id
        });
      }}>
        Delete
      </button>
      <button onClick={() => {
        dispatch({title: 'New title'});
      }}>
        Set title
      </button>
    </div>
  );
}

