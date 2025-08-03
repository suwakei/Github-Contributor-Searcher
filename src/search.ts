let contributorElements: HTMLElement[] = [];
let noResultsElement: HTMLElement | null = null;

export function cacheContributorElements() {
  const nodes = document.querySelectorAll('.contrib-person');
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
    }
  }
}

export function filterContributors(keyword: string) {
  let visibleCount = 0;
  contributorElements.forEach((el) => {
    const username =
      el.querySelector('a span')?.textContent?.toLowerCase() || '';
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
}
