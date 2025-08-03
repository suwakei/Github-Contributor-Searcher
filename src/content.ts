import { insertSearchBar } from './ui';
import { filterContributors, cacheContributorElements } from './search';

// 拡張機能が既に初期化されたかを追跡するフラグ
let isInitialized = false;
// 監視のタイムアウト時間 (ミリ秒)
const OBSERVER_TIMEOUT_MS = 10000; // 10秒

function init() {
  console.log('starting searcher');
  // 既に初期化済みの場合は何もしない
  if (isInitialized) return;

  try {
    // より具体的な要素を監視することでパフォーマンスを向上させます
    const targetNode =
      document.querySelector('.application-main') || document.body;

    if (!targetNode) {
      console.error(
        '[GitHub Contributor Searcher] Could not find a target node to observe.'
      );
      return;
    }

    // ContributorのDOMが出るまで待機
    const observer = new MutationObserver(() => {
      const contributors = document.querySelectorAll('li.Box-row');
      if (contributors.length > 0) {
        clearTimeout(timeoutId); // 要素が見つかったのでタイムアウトを解除
        observer.disconnect();

        if (isInitialized) return;

        cacheContributorElements();
        insertSearchBar(filterContributors);
        isInitialized = true; // 初期化完了のフラグを立てる
        console.log('[GitHub Contributor Searcher] Initialized successfully.');
      }
    });

    // タイムアウト処理
    const timeoutId = setTimeout(() => {
      console.warn(
        `[GitHub Contributor Searcher] Timed out waiting for contributor elements after ${OBSERVER_TIMEOUT_MS}ms.`
      );
      observer.disconnect();
    }, OBSERVER_TIMEOUT_MS);

    observer.observe(targetNode, { childList: true, subtree: true });
  } catch (error) {
    console.error(
      '[GitHub Contributor Searcher] An unexpected error occurred during initialization:',
      error
    );
    // 念のためフラグを立てて再実行を防ぐ
    isInitialized = true;
  }
}

init();
