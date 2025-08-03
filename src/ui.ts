import { debounce } from './utils'
import './ui.css'

const DEBOUNCE_DELAY_MS = 300;
const SEARCH_PLACEHOLDER = "Search UserName"
const INSERT_TARGET_SELECTOR = '.js-details-container';
export function insertSearchBar(onSearch: (keyword: string) => void) {
    const container = document.createElement('div');
    container.className = 'gcs-container';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = SEARCH_PLACEHOLDER;
    input.className = 'gcs-input';
    input.setAttribute('aria-label', 'Search contributors by username');

    input.addEventListener('input', debounce(() => {
    onSearch(input.value.toLowerCase());
    }, DEBOUNCE_DELAY_MS));

    container.appendChild(input);

    const target = document.querySelector(INSERT_TARGET_SELECTOR);
    if (target?.parentElement) {
        target.parentElement.insertBefore(container, target);
    } else {
        console.warn(`[GitHub Contributor Searcher] Could not find target element ('${INSERT_TARGET_SELECTOR}') to insert search bar.`);
    }
}
