import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(num: number): string {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'k';
  return num.toString();
}

export function formatPercentage(num: number): string {
  return `${(num * 100).toFixed(1)}%`;
}

export function getThreatColor(probability: number): string {
  // 0.0 = green (hsl 120), 1.0 = red (hsl 0)
  const hue = 120 - (probability * 120);
  return `hsl(${hue}, 70%, ${35 + probability * 15}%)`;
}

export function highlightJson(json: string): string {
  if (typeof json !== 'string') {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
    let cls = 'text-blue-500';
    if (/^"/.test(match)) {
      if (/:$/.test(match)) {
        cls = 'text-indigo-400';
      } else {
        cls = 'text-green-500';
      }
    } else if (/true|false/.test(match)) {
      cls = 'text-orange-500';
    } else if (/null/.test(match)) {
      cls = 'text-slate-500';
    } else {
      cls = 'text-amber-500';
    }
    return '<span class="' + cls + '">' + match + '</span>';
  });
}
