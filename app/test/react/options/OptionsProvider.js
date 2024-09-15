import { createContext, useContext, useReducer } from 'react';

// зачем их два
const OptionsContext = createContext(null);
const OptionsDispatchContext = createContext(null);

// Главный компонент, в который будет обернут весь код
// Имеет смысл в tasks хранить сразу все что нужно в виде объекта, т.к. тянуть такую портянку для каждого случая - глупо
export function OptionsProvider({ children }) {
  // важен порядок [новое значение, метод-там] = useReducer(метод-здесь, начальное значение)
  const [options, dispatch] = useReducer(
    optionsReducer,
    defaultOptions
  );

  return (
    <OptionsContext.Provider value={options}>
      <OptionsDispatchContext.Provider
        value={dispatch}
      >
        {children}
      </OptionsDispatchContext.Provider>
    </OptionsContext.Provider>
  );
}

// Получим все значения
export function getOptions() {
  return useContext(OptionsContext);
}

// Получим метод для изменения свойств
export function setOptionsMethod() {
  return useContext(OptionsDispatchContext);
}

// Непосредственно меняет значение
function optionsReducer(options, action) {
  let newOptions = {}
  Object.assign(newOptions, options)
  switch (action.type) {
    // можно вызывать как dispatch({title: 'New title'});
    case undefined: {
      Object.assign(newOptions, action)
      break;
    }
    default: {
      newOptions.tasks = changeArray(options.tasks, action)
    }
  }
  return newOptions;
}

function changeArray(options, action) {
  switch (action.type) {
    case 'added': {
      return [...options, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return options.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return options.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


const defaultOptions = {
  title: 'Start',
  count: 1,
  tasks: [
    { id: 0, text: 'Philosopher’s Path', done: true },
    { id: 1, text: 'Visit the temple', done: false },
    { id: 2, text: 'Drink matcha', done: false }
  ]
};