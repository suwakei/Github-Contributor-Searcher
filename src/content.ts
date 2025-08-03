import { insertSearchBar } from './ui';
import { filterContributors, cacheContributorElements } from './search';

// 拡張機能が既に初期化されたかを追跡するフラグ
let isInitialized = false;

function init() {
  console.log("starting searcher")
  // 既に初期化済みの場合は何もしない
  if (isInitialized) return;

  // ContributorのDOMが出るまで待機
  // GitHubのUI更新に対応するため、セレクタを '.contrib-person' から 'li.Box-row' に変更
  const observer = new MutationObserver(() => {
    const contributors = document.querySelectorAll('li.Box-row');
    if (contributors.length > 0) {
      observer.disconnect();
      cacheContributorElements(); // キャッシュ
      insertSearchBar((keyword: string) => {
        filterContributors(keyword);
      });
      isInitialized = true; // 初期化完了のフラグを立てる
    }
  });

  // より具体的な要素を監視することでパフォーマンスを向上させます
  const targetNode =
    document.querySelector('.application-main') || document.body;
  observer.observe(targetNode, { childList: true, subtree: true });
}

init();
