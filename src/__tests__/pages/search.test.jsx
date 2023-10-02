import Search from '../../pages/search'
import { searchBooksHandler } from '../util/mocks/handlers'
import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import bookSearchResultsReact from '../util/mocks/bookSearchResultsReact.json'
import bookSearchResultsConan from '../util/mocks/bookSearchResultsConan.json'

describe('Search Page Component', () => {
  it('should render title and search bar', async () => {
    render(<Search />)
    await act(() => new Promise(r => setTimeout(r, 0)))
    expect(screen.getByText(/Book Search/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Search by author, title, and\/or keywords:/i)).toBeInTheDocument()
  })
  describe('Initial Page Load Search', () => {
    it('should show initial query of "React" in input field', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      expect(input.value).toMatch(/react/i)
    })
    it('should show title of each result', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      for (const { volumeInfo: { title } } of bookSearchResultsReact.items) {
        expect(await screen.findByText(title)).toBeInTheDocument()
      }
    })
    it('should show image of each result with title as alt text when searching', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      for (const { volumeInfo: { title, imageLinks: { thumbnail } } } of bookSearchResultsReact.items) {
        const img = await screen.findByAltText(title)
        expect(img).toBeInTheDocument()
        expect(img.src).toBe(thumbnail)
      }
    })
    it('should render preview link of each result when searching', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      for (const { volumeInfo: { title, previewLink } } of bookSearchResultsReact.items) {
        const preview = await screen.findByText(title)
        const containingLink = preview.closest('a')
        expect(containingLink.href).toBe(previewLink)
      }
    })
    it('should show authors of each result when searching', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      for (const { volumeInfo: { title, authors } } of bookSearchResultsReact.items) {
        const preview = await screen.findByText(title)
        const containingLink = preview.closest('a')
        for (const author of authors) {
          expect(containingLink.innerHTML.includes(author)).toBeTruthy()
        }
      }
    })
  })
  describe('Subsequent User Searches', () => {
    it('should call Books API once when searching', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      searchBooksHandler.mockClear()
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      fireEvent.change(input, { target: { value: 'conan' } })
      fireEvent.click(screen.getByText(/submit/i))
      await act(() => new Promise(r => setTimeout(r, 0)))
      expect(searchBooksHandler).toHaveBeenCalledTimes(1)
    })
    it('should not call Books API again if query is unchanged', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      searchBooksHandler.mockClear()
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      fireEvent.change(input, { target: { value: 'conan' } })
      fireEvent.click(screen.getByText(/submit/i))
      fireEvent.click(screen.getByText(/submit/i))
      fireEvent.click(screen.getByText(/submit/i))
      await act(() => new Promise(r => setTimeout(r, 0)))
      expect(searchBooksHandler).toHaveBeenCalledTimes(1)
    })
    it('should not call Books API again until previous request is done', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      searchBooksHandler.mockClear()
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      fireEvent.change(input, { target: { value: 'con' } })
      fireEvent.click(screen.getByText(/submit/i))
      fireEvent.change(input, { target: { value: 'cona' } })
      fireEvent.click(screen.getByText(/submit/i))
      fireEvent.change(input, { target: { value: 'conan' } })
      fireEvent.click(screen.getByText(/submit/i))
      await act(() => new Promise(r => setTimeout(r, 0)))
      expect(searchBooksHandler).toHaveBeenCalledTimes(1)
    })
    it('should NOT call Books API when search field is blank', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      searchBooksHandler.mockClear()
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      fireEvent.change(input, { target: { value: '' } })
      fireEvent.click(screen.getByText(/submit/i))
      await act(() => new Promise(r => setTimeout(r, 0)))
      expect(searchBooksHandler).not.toHaveBeenCalled()
    })
    it('should show title of each result when searching', async () => {
      render(<Search />)
      searchBooksHandler.mockClear()
      await act(() => new Promise(r => setTimeout(r, 0)))
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      fireEvent.change(input, { target: { value: 'conan' } })
      fireEvent.click(screen.getByText(/submit/i))
      for (const { volumeInfo: { title } } of bookSearchResultsConan.items) {
        expect(await screen.findByText(title)).toBeInTheDocument()
      }
    })
    it('should show image of each result with title as alt text when searching', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      searchBooksHandler.mockClear()
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      fireEvent.change(input, { target: { value: 'conan' } })
      fireEvent.click(screen.getByText(/submit/i))
      for (const { volumeInfo: { title, imageLinks: { thumbnail } } } of bookSearchResultsConan.items) {
        const img = await screen.findByAltText(title)
        expect(img).toBeInTheDocument()
        expect(img.src).toBe(thumbnail)
      }
    })
    it('should render preview link of each result when searching', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      searchBooksHandler.mockClear()
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      fireEvent.change(input, { target: { value: 'conan' } })
      fireEvent.click(screen.getByText(/submit/i))
      for (const { volumeInfo: { title, previewLink } } of bookSearchResultsConan.items) {
        const preview = await screen.findByText(title)
        const containingLink = preview.closest('a')
        expect(containingLink.href).toBe(previewLink)
      }
    })
    it('should show authors of each result when searching', async () => {
      render(<Search />)
      await act(() => new Promise(r => setTimeout(r, 0)))
      searchBooksHandler.mockClear()
      const input = screen.getByLabelText(/Search by author, title, and\/or keywords:/i)
      fireEvent.change(input, { target: { value: 'conan' } })
      fireEvent.click(screen.getByText(/submit/i))
      for (const { volumeInfo: { title, authors } } of bookSearchResultsConan.items) {
        const preview = await screen.findByText(title)
        const containingLink = preview.closest('a')
        for (const author of authors) {
          expect(containingLink.innerHTML.includes(author)).toBeTruthy()
        }
      }
    })
  })
})