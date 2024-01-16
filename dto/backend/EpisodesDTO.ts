type EpisodesDTO = {
    id: string | undefined,
    packageID: string,
    episode: number,
    summary: string,
    sources: SourcesDTO[]
}

interface ResponseEpisodes extends ResponseDTO {
    data: EpisodesDTO | undefined
}

interface ResponseEpisodesList extends ResponseDTO{
    data: EpisodesDTO[] | undefined
}