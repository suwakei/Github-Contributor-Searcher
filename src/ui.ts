import { debounce } from './utils.ts'
import './ui.css'

export function insertSearchBar(onSearch: (keyword: string) => void) {
    const container = document.createElement('div');
    container.className = 'gcs-container';

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Search UserName';
    input.className = 'gcs-input';

    input.addEventListener('input', debounce(() => {
    onSearch(input.value.toLowerCase());
    }, 300));

    container.appendChild(input);

    const target = document.querySelector('.js-details-container');
    if (target?.parentElement) {
    target.parentElement.insertBefore(container, target);
    }
}
