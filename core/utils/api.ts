import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { ApiRequestOutput, RequestAutoRunConfig, REQUEST_API } from "./typing/api";

export const useApiRequest = <OutputData, RequestBody>(baseURL: string, autoRun: RequestAutoRunConfig<RequestBody>, initialValue: RequestBody) : ApiRequestOutput<OutputData> => {
    const [data, setData] = useState<RequestBody | null>(initialValue);
    const [isLoading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const RequestReject = (error: string) => {
        setData(null);
        setError(error);
    }

    const RequestResolve = (data: RequestBody) => {
        setData(data);
        setError(null);
    }

    const RequestReset = () => {
        setError(null);
        setData(null);
    }

    const makeRequest = useCallback(( method: REQUEST_API, data: any ) => {
        setLoading(true);
        setError(null);
        axios({
            method,
            baseURL,
            data,
        })  .then(response => RequestResolve(response.data))
            .catch(error => RequestReject(error))
            .finally(RequestReset);
        setLoading(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [autoRun.method, baseURL, autoRun.body]);

    
    useEffect(() => {
        if (autoRun.isRun) {
            makeRequest(autoRun.method, autoRun.body);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [ autoRun.isRun ]);

    
    return {
        data: {...data} as OutputData,
        isLoading,
        error,

        makeRequest: <RequestData>(method: REQUEST_API, data: RequestData) => makeRequest(method, data)
    }
}