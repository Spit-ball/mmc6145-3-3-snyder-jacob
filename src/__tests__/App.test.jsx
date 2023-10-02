import { vi } from 'vitest'
const mockHeader = vi.fn()
const mockHome = vi.fn()
const mockSearch = vi.fn()
vi.mock('../components/header', () => ({default: mockHeader}))
vi.mock('../pages/home', () => ({default: mockHome}))
vi.mock('../pages/search', () => ({default: mockSearch}))
import App from '../App'
import { customRender } from './util/setup'

describe('App', () => {
  it('should render Home page and Header components on "/"', () => {
    customRender(<App/>, "/")
    expect(mockHeader).toHaveBeenCalledTimes(1)
    expect(mockHome).toHaveBeenCalledTimes(1)
    expect(mockSearch).toHaveBeenCalledTimes(0)
  })
  it('should work', () => {
    customRender(<App/>, "/search")
    expect(mockHeader).toHaveBeenCalledTimes(1)
    expect(mockHome).toHaveBeenCalledTimes(0)
    expect(mockSearch).toHaveBeenCalledTimes(1)
  })
})