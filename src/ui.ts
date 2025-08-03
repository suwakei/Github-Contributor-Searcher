import { debounce } from './utils';
import './ui.css';

const DEBOUNCE_DELAY_MS = 300;
const SEARCH_PLACEHOLDER = 'Search UserName';
const FALLBACK_INSERT_TARGET_SELECTOR = '.js-details-container';
// Selector for the container holding the "Period" and "Contributions" buttons.
const PREFERRED_INSERT_TARGET_SELECTOR = '.Box-header .d-flex.gap-2';

export function insertSearchBar(onSearch: (keyword: string) => void) {
  const container = document.createElement('div');
  container.className = 'gcs-container';

  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = SEARCH_PLACEHOLDER;
  input.className = 'gcs-input';
  input.setAttribute('aria-label', 'Search contributors by username');

  input.addEventListener(
    'input',
    debounce(() => {
      onSearch(input.value.toLowerCase());
    }, DEBOUNCE_DELAY_MS)
  );

  container.appendChild(input);

  // Try to insert next to the filter buttons first
  const preferredTarget = document.querySelector(
    PREFERRED_INSERT_TARGET_SELECTOR
  );
  if (preferredTarget) {
    preferredTarget.appendChild(container);
  } else {
    // Fallback to the original position if the preferred target is not found
    console.warn(
      `[GitHub Contributor Searcher] Could not find preferred target ('${PREFERRED_INSERT_TARGET_SELECTOR}'). Falling back to default position.`
    );
    const fallbackTarget = document.querySelector(
      FALLBACK_INSERT_TARGET_SELECTOR
    );
    if (fallbackTarget?.parentElement) {
      fallbackTarget.parentElement.insertBefore(container, fallbackTarget);
    } else {
      console.error(
        `[GitHub Contributor Searcher] Could not find any target element to insert search bar.`
      );
    }
  }
}
