import {http, HttpResponse} from 'msw'
import {URL} from '../../src/config/index'
import roomsResponse from './responses/rooms.json'
export const handlers = [
    http.get(`${URL}/rooms`, () => {

        return HttpResponse.json(roomsResponse)
    })
]