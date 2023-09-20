type PackagesDTO = {
    id: string | undefined,
    name: string,
    maxEpisode: string,
    malId: number,
    rating: number,
    synopsis: string,
    safeContent: string,
    genreList: Array<GenreDTO>
}