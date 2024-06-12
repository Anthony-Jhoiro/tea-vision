import App from './App.svelte';
import 'tailwind-config/index.css';

const app = new App({
  target: document.getElementById('app') as HTMLElement,
});

export default app;
export { useCreateTea } from './services/storage';
export { useGetTeaById } from './services/storage';
export { useListTeas } from './services/storage';
