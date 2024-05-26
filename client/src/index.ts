import App from './App.svelte';
import 'tailwind-config/index.css';

const app = new App({
  target: document.getElementById('app') as HTMLElement,
});

export default app;
