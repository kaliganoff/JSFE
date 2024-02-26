export interface NewsResponse {
    status: Status;
    totalResults: number;
    articles: Article[];
}

export interface Article {
    author: string;
    content: string;
    description: string;
    publishedAt: string;
    source: {
        id: string;
        name: string;
    };
    title: string;
    url: string;
    urlToImage: string;
}

export interface SourcesResponse {
    sources: Source[];
    status: Status;
}

export interface Source {
    category: string;
    country: string;
    description: string;
    id: string;
    language: string;
    name: string;
    url: string;
}

enum Status {
    ok,
    error,
}
