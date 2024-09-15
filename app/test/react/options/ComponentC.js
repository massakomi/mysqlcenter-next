'use client'
import {getOptions} from './OptionsProvider.js';

export default function ComponentC() {
  const tasks = getOptions();
  return (
    <div>
      <ul>
        {tasks.tasks.map(task => (
          <li key={task.id}>
            {task.text}
          </li>
        ))}
      </ul>
    </div>
  );
}
