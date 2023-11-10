type PackagesDTO = {
    id: string | undefined,
    name: string,
    maxEpisode: string,
    malId: number,
    rating: number,
    synopsis: string,
    safeContent: string,
    cover: string,
    genreList: Array<GenreDTO>
}

interface ResponsePackagesPage extends ResponseDTO {
    data: PageDTO<PackagesDTO>
}