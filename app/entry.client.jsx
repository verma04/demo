import {hydrateRoot} from 'react-dom/client';
import {RemixBrowser} from '@remix-run/react';

const container = document.getElementById('root');
if (container) {
    hydrateRoot(container, <RemixBrowser/>);
} else {
    console.error('Failed to find the root element for hydration');
}