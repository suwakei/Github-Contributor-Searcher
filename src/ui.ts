import { debounce } from './utils';
import './ui.css';

const DEBOUNCE_DELAY_MS = 300;
const SEARCH_PLACEHOLDER = 'Search UserName';
// コントリビューターリストのセレクタ。この要素を基準に挿入位置を決定します。
const CONTRIBUTOR_LIST_SELECTOR = '.js-details-container';

export function insertSearchBar(onSearch: (keyword: string) => void) {
  const container = document.createElement('div');
  // ブロック要素としてスタイルを適用するためのクラスを追加
  container.className = 'gcs-container gcs-container--block';
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

  // --- 挿入ロジック ---
  const contributorList = document.querySelector(CONTRIBUTOR_LIST_SELECTOR);
  // グラフ要素は通常、コントリビューターリストの直前にある要素です。
  const chartElement = contributorList?.previousElementSibling;

  if (chartElement) {
    // グラフ要素の直後に検索バーを挿入します。
    chartElement.after(container);
  } else if (contributorList?.parentElement) {
    // フォールバック: グラフが見つからない場合、リストの直前に挿入します。
    console.warn(
      `[GitHub Contributor Searcher] Could not find the chart element. Inserting before the contributor list as a fallback.`
    );
    contributorList.parentElement.insertBefore(container, contributorList);
  } else {
    console.error(
      `[GitHub Contributor Searcher] Could not find any target element to insert search bar.`
    );
  }
}
