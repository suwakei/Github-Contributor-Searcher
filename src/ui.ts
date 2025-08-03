import { debounce } from './utils';
import './ui.css';

const DEBOUNCE_DELAY_MS = 300;
const SEARCH_PLACEHOLDER = 'Search UserName';
// コントリビューターリストのセレクタ。この要素を基準に挿入位置を決定します。
const PREFERRED_INSERT_TARGET_SELECTOR =
  '.d-flex.flex-wrap.flex-justify-between .d-flex.gap-2';
const FALLBACK_INSERT_TARGET_SELECTOR = '#contributors';

export function insertSearchBar(onSearch: (keyword: string) => void) {
  const container = document.createElement('div');
  // スタイル用のクラスはロジック内で動的に付与する
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

  try {
    // --- 挿入ロジック ---
    // Periodボタンを含むコンテナを探す
    const preferredTarget = document.querySelector(
      PREFERRED_INSERT_TARGET_SELECTOR
    );

    if (preferredTarget) {
      // 見つかったら、そのコンテナに検索バーを追加
      preferredTarget.appendChild(container);
    } else {
      // フォールバック：以前のロジック（グラフの下）
      console.warn(
        `[GitHub Contributor Searcher] Could not find preferred target ('${PREFERRED_INSERT_TARGET_SELECTOR}'). Falling back to block display.`
      );
      container.classList.add('gcs-container--block');
      const fallbackTarget = document.querySelector(
        FALLBACK_INSERT_TARGET_SELECTOR
      );

      if (!fallbackTarget) {
        throw new Error(
          `Fallback target ('${FALLBACK_INSERT_TARGET_SELECTOR}') not found.`
        );
      }

      const chartElement = fallbackTarget.previousElementSibling;
      if (chartElement) {
        chartElement.after(container);
      } else if (fallbackTarget.parentElement) {
        fallbackTarget.parentElement.insertBefore(container, fallbackTarget);
      }
    }
  } catch (error) {
    console.error(
      '[GitHub Contributor Searcher] Failed to insert search bar:',
      error
    );
  }
}
