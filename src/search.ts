let contributorElements: HTMLElement[] = [];
let noResultsElement: HTMLElement | null = null;

export function cacheContributorElements() {
  try {
    // GitHubのUI更新に対応するため、セレクタを '.contrib-person' から 'li.Box-row' に変更
    const nodes = document.querySelectorAll('li.Box-row');
    if (nodes.length === 0) {
      // 要素が見つからない場合は警告を出し、処理を中断
      console.warn(
        '[GitHub Contributor Searcher] No contributor elements found to cache.'
      );
      return;
    }
    contributorElements = Array.from(nodes).filter(
      (node): node is HTMLElement => node instanceof HTMLElement
    );

    // 「結果なし」メッセージを一度だけ作成・挿入する
    if (contributorElements.length > 0 && !noResultsElement) {
      const listParent = contributorElements[0].parentElement;
      if (listParent) {
        noResultsElement = document.createElement('div');
        // GitHubの既存クラスを利用してスタイルを合わせる
        noResultsElement.className = 'Box-row text-center p-3';
        noResultsElement.textContent = 'No matching contributors found.';
        noResultsElement.style.display = 'none'; // 初期状態では非表示
        listParent.prepend(noResultsElement);
      } else {
        console.warn(
          '[GitHub Contributor Searcher] Could not find parent element to insert "no results" message.'
        );
      }
    }
  } catch (error) {
    console.error(
      '[GitHub Contributor Searcher] Failed to cache contributor elements:',
      error
    );
  }
}

export function filterContributors(keyword: string) {
  try {
    let visibleCount = 0;
    contributorElements.forEach((el) => {
      // ログイン名 (例: gaearon) は color-fg-muted クラスを持つspan内にあるため、
      // こちらを対象にすることで、表示名ではなくログイン名で検索できるようにする。
      const usernameElement = el.querySelector('a span.color-fg-muted');
      const username = usernameElement?.textContent?.trim().toLowerCase() || '';

      const isVisible = username.includes(keyword);
      el.style.display = isVisible ? '' : 'none';
      if (isVisible) {
        visibleCount++;
      }
    });

    // 表示されている要素が0件の場合にメッセージを表示する
    if (noResultsElement) {
      noResultsElement.style.display = visibleCount === 0 ? 'block' : 'none';
    }
  } catch (error) {
    console.error(
      '[GitHub Contributor Searcher] Failed to filter contributors:',
      error
    );
  }
}
