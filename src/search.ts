let contributorElements: HTMLElement[] = [];

export function cacheContributorElements() {
  const nodes = document.querySelectorAll('.contrib-person');
  contributorElements = Array.from(nodes).filter(
    (node): node is HTMLElement => node instanceof HTMLElement
  );
}

export function filterContributors(keyword: string) {
  contributorElements.forEach((el) => {
    const username =
      el.querySelector('a span')?.textContent?.toLowerCase() || '';
    el.style.display = username.includes(keyword) ? '' : 'none';
  });
}
