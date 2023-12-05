type EpisodesDTO = {
    id: string | undefined,
    packageID: string,
    episode: number,
    sources: SourcesDTO[]
}

interface ResponseEpisodes extends ResponseDTO {
    data: EpisodesDTO | undefined
}