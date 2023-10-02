import { vi } from 'vitest'
import { rest } from 'msw'
import bookSearchDataReact from './bookSearchResultsReact.json'
import bookSearchDataConan from './bookSearchResultsConan.json'

export const searchBooksHandler = vi.fn((req, res, ctx) => {
  if (req.url.searchParams.get('q')?.trim()?.toLowerCase() === 'react')
    return res(ctx.status(200), ctx.json(bookSearchDataReact))
  return res(ctx.status(200), ctx.json(bookSearchDataConan))
})

export const handlers = [
  rest.get('https://www.googleapis.com/books/v1/volumes', searchBooksHandler)
]