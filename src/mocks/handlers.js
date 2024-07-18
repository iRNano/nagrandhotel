import {http, HttpResponse} from 'msw'
import {URL} from '../../src/config/index'
import roomsResponse from './responses/rooms.json'
export const handlers = [
    http.get(`${URL}/rooms`, () => {

        return HttpResponse.json(roomsResponse)
    }),
    http.get(`${URL}/rooms/:id`, ({params}) => {
        return HttpResponse.json(roomsResponse.find(room => room._id === params.id));
    })
]