export type REQUEST_API = 'GET' | 'POST' | 'DELETE' | 'PUT'

export interface ApiRequestOutput<OutputData> {
    data: OutputData,
    error: string | null,
    isLoading: boolean,

    makeRequest: <RequestData>(method: REQUEST_API, data: RequestData) => void
}

export interface RequestAutoRunConfig<RequestBody> {
    method: REQUEST_API, 
    body: RequestBody,
    isRun: boolean
}