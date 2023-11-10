type ResponseDTO = {
    errCode: number,
    message: string,
    data: any
}

type PageDTO<T> = {
    totalElements: number,
    totalPages: number,
    size: number,
    content: T,
}
interface ResponsePageDTO extends ResponseDTO{
    data: PageDTO<any>
}
