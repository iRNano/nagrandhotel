import { http, HttpResponse } from 'msw'
import { URL } from '../config/index'
import roomsResponse from './responses/rooms.json'

function shouldPassthrough(request) {
  if (request.url.includes('health=1')) return true
  if (typeof window !== 'undefined' && window.__USE_BACKEND__ === true) return true
  return false
}

export const handlers = [
  http.get(`${URL}/rooms`, ({ request }) => {
    if (shouldPassthrough(request)) return HttpResponse.passthrough()
    return HttpResponse.json(roomsResponse)
  }),
  http.get(`${URL}/rooms/:id`, ({ request, params }) => {
    if (shouldPassthrough(request)) return HttpResponse.passthrough()
    return HttpResponse.json(roomsResponse.find(room => room._id === params.id))
  }),
]