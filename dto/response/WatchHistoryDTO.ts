type WatchHistoryDTO = {
    id: string,
    userID: string,
    currentWatchTime: string
}

interface WatchHistoryResponse extends ResponseDTO{
    data : WatchHistoryDTO
}