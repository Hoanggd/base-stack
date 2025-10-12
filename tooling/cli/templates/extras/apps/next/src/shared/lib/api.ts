import axios from 'axios'
import { Api } from '@workspace/lib/api'

export type * from '@workspace/lib/api'

export const api = new Api(
    axios.create({
        baseURL: 'http://localhost:8080', // TODO: move to env
    }),
)
