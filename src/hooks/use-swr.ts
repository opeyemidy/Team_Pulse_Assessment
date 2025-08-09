import useSWR, { SWRConfiguration, SWRResponse } from 'swr';
import { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import client, { api } from '@/services';

export type GetRequest = AxiosRequestConfig | null;

interface Return<Data, Error>
  extends Pick<
    SWRResponse<AxiosResponse<Data>, AxiosError<Error>>,
    'isValidating' | 'error' | 'mutate' | 'isLoading'
  > {
  data: Data | undefined;
  response: AxiosResponse<Data> | undefined;
}

export interface Config<Data = unknown, Error = unknown>
  extends Omit<
    SWRConfiguration<AxiosResponse<Data>, AxiosError<Error>>,
    'fallbackData'
  > {
  fallbackData?: Data;
}

export default function useRequest<Data = unknown, Error = unknown>(
  url: string,
  { fallbackData, ...config }: Config<Data, Error> = {},
  isPublic?: boolean
): Return<Data, Error> {
  const request: GetRequest = {
    baseURL: process.env.NEXT_PUBLIC_BASE_URL,
    url,
    method: 'GET',
  };
  const {
    data: response,
    error,
    isValidating,
    isLoading,
    mutate,
  } = useSWR<AxiosResponse<Data>, AxiosError<Error>>(
    url,
    /**
     * NOTE: Typescript thinks `request` can be `null` here, but the fetcher
     * function is actually only called by `useSWR` when it isn't.
     */
    () =>
      isPublic ? client.request<Data>(request) : api.request<Data>(request),
    {
      ...config,
      fallbackData: fallbackData
        ? ({ data: fallbackData } as AxiosResponse<Data>)
        : undefined,
    }
  );

  return {
    data: response && response.data,
    response,
    error,
    isValidating,
    isLoading,
    mutate,
  };
}
