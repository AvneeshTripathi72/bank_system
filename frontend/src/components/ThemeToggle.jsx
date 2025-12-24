import { useState, useEffect } from 'react';
import { Moon, Sun } from 'lucide-react';
import { Button } from '../components/ui/button';

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && localStorage.getItem("theme")) {
      return localStorage.getItem("theme");
    }
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return "dark";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.setAttribute('data-theme', 'dark');
    } else {
      root.classList.remove('dark');
      root.setAttribute('data-theme', 'light');
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Button variant="ghost" size="icon" onClick={toggleTheme} className="rounded-full text-slate-500 hover:text-blue-600 transition-colors">
      {theme === 'light' ? <Moon className="w-5 h-5 text-slate-700 dark:text-slate-200" /> : <Sun className="w-5 h-5 text-yellow-500" />}
    </Button>
  );
};

export default ThemeToggle;
