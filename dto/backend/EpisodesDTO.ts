type EpisodesDTO = {
    id: string | undefined,
    packageID: string,
    episode: number,
    sources: Array<SourcesDTO>
}

interface ResponseEpisodes extends ResponseDTO {
    data: EpisodesDTO | undefined
}