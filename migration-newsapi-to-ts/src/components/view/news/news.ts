import { Article } from '../../../interfaces';
import './news.css';

class News {
    draw(data: Article[]): void {
        const news: Article[] = data.length >= 10 ? data.filter((_item, idx) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone: HTMLElement = newsItemTemp.content.cloneNode(true) as HTMLElement;

            if (idx % 2) newsClone.querySelector('.news__item')?.classList.add('alt');

            const newsMetaPhoto: HTMLElement | null = newsClone.querySelector('.news__meta-photo');
            if (newsMetaPhoto) {
                newsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
            }
            const newsMetaAuthor: HTMLElement | null = newsClone.querySelector('.news__meta-author');
            newsMetaAuthor ? (newsMetaAuthor.textContent = item.author || item.source.name) : undefined;
            const newsMetaDate: HTMLElement | null = newsClone.querySelector('.news__meta-date');
            newsMetaDate
                ? (newsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-'))
                : undefined;
            const newsDescriptionTitle: HTMLElement | null = newsClone.querySelector('.news__description-title');
            const newsDescriptionSource: HTMLElement | null = newsClone.querySelector('.news__description-source');
            const newsDescriptionContent: HTMLElement | null = newsClone.querySelector('.news__description-content');
            newsDescriptionTitle ? (newsDescriptionTitle.textContent = item.title) : undefined;
            newsDescriptionSource ? (newsDescriptionSource.textContent = item.source.name) : undefined;
            newsDescriptionContent ? (newsDescriptionContent.textContent = item.description) : undefined;
            newsClone.querySelector('.news__read-more a')?.setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const newsElement: HTMLElement | null = document.querySelector('.news');
        newsElement ? (newsElement.innerHTML = '') : undefined;
        document.querySelector('.news')?.appendChild(fragment);
    }
}

export default News;
