'use client'
import ComponentA from './ComponentA.js';
import ComponentB from './ComponentB.js';
import { OptionsProvider } from './OptionsProvider.js';
import ComponentC from "@/app/test/react/options/ComponentC";

export default function Options() {
  return (
    <OptionsProvider>
      <h1>Day off in Kyoto</h1>
      <ComponentA />
      <ComponentB />
      <ComponentC />
    </OptionsProvider>
  );
}