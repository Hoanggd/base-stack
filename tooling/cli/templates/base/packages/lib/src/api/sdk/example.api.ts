import { queryOptions } from '@tanstack/react-query'
import { AxiosInstance } from 'axios'
import { ExampleResponse } from './example.type'

export class ExampleApi {
    constructor(private readonly client: AxiosInstance) {}

    hello() {
        return queryOptions({
            queryKey: ['hello'],
            queryFn: () => {
                const response: ExampleResponse = {
                    message: 'Hello World',
                }

                return response
            },
        })
    }
}
