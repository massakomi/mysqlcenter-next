'use client';
import {useSelector} from 'react-redux';

export default function BackDrop() {

  const globalParams = useSelector((state) => state.params.value)

  let className = 'pointer-events-none fixed inset-0 z-[999] grid h-screen w-screen place-items-center bg-black bg-opacity-60 transition-opacity duration-300';
  if (globalParams.loading) {
    className += ' opacity-50'
  } else {
    className += ' opacity-0'
  }

  return (
    <>
      <div
        data-dialog-backdrop="modal-xs"
        data-dialog-backdrop-close="true"
        className={className}
      >
      </div>
    </>
  );
}