type GenreDTO = {
    id: string,
    name: string
}

interface ResponseGenresDTO extends ResponseDTO {
    data: Array<GenreDTO>
}