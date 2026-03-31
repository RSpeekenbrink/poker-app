import '@testing-library/jest-dom/vitest';
import { vi } from 'vitest';
import type { VotingOption } from '@/types';

// Mock window globals used by the app
window.VotingOptions = ['☕', '1', '2', '3', '5', '8', '13', '20', '?'] as VotingOption[];

window.refreshTheme = vi.fn();

window.toast = {
    info: vi.fn(),
    success: vi.fn(),
    error: vi.fn(),
    loading: vi.fn(),
    dismiss: vi.fn(),
} as any;

window.axios = {
    post: vi.fn(() => Promise.resolve({ data: {} })),
    get: vi.fn(() => Promise.resolve({ data: {} })),
    defaults: { headers: { common: {} }, withCredentials: false, withXSRFToken: false },
} as any;

window.Echo = {
    join: vi.fn(() => ({
        here: vi.fn().mockReturnThis(),
        joining: vi.fn().mockReturnThis(),
        leaving: vi.fn().mockReturnThis(),
        error: vi.fn().mockReturnThis(),
        listen: vi.fn().mockReturnThis(),
    })),
    leave: vi.fn(),
} as any;

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

// Mock localStorage
const store: Record<string, string> = {};
const localStorageMock = {
    getItem: vi.fn((key: string) => store[key] ?? null),
    setItem: vi.fn((key: string, value: string) => {
 store[key] = value; 
}),
    removeItem: vi.fn((key: string) => {
 delete store[key]; 
}),
    clear: vi.fn(() => {
 Object.keys(store).forEach(k => delete store[k]); 
}),
    get length() {
 return Object.keys(store).length; 
},
    key: vi.fn((i: number) => Object.keys(store)[i] ?? null),
};
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock ziggy route function
(globalThis as any).route = vi.fn((name: string, params?: any) => {
    if (params) {
return `/${name}/${params}`;
}

    return `/${name}`;
});
