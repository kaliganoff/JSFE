import News from './news/news';
import Sources from './sources/sources';
import { NewsResponse, SourcesResponse, Source, Article } from 'interfaces';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: NewsResponse | undefined) {
        const values: Article[] = data?.articles ? data.articles : [];
        this.news.draw(values);
    }

    drawSources(data: SourcesResponse | undefined) {
        const values: Source[] = data?.sources ? data.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;
