/* exportable interfaces */
export interface Game {
    id: number;
    background_image: string;
    name: string;
    released: string;
    metacritic_url: string;
    website: string;
    description: string;
    metacritic: number; // changed metacritic_score to metacritic as it must match external API
    genres: Array<Genre>;
    parent_platforms: Array<ParentPlatform>;
    publishers: Array<Publishers>;
    ratings: Array<Rating>;
    screenshots: Array<Screenshots>;
    trailers: Array<Trailer>;
}

export interface APIResponse<T> { // T = generic type
    results: Array<T>;
}

/* end of exportable interfaces */

/* local only interfaces */
interface Genre {
    name: string;
}

interface ParentPlatform {
    platform: {
        name: string;
        slug: string;
    }
}

interface Publishers {
    name: string;
}

interface Rating {
    id: number;
    count: number;
    title: string;
}

interface Screenshots {
    image: string;
}

interface Trailer {
    data: {
        max: string;
    };
}
/* end of local only interfaces */