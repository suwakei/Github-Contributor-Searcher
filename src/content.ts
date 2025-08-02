import { insertSearchBar } from './ui'
import { filterContributors, cacheContributorElements } from './search'

function init() {
  // ContributorのDOMが出るまで待機
    const observer = new MutationObserver(() => {
    const contributors = document.querySelectorAll('.contrib-person');
    if (contributors.length > 0) {
        observer.disconnect();
      cacheContributorElements(); // キャッシュ
        insertSearchBar((keyword: string) => {
        filterContributors(keyword);
        });
    }
    });

    // より具体的な要素を監視することでパフォーマンスを向上させます
    const targetNode = document.querySelector('.application-main') || document.body;
    observer.observe(targetNode, { childList: true, subtree: true });
}

init();
