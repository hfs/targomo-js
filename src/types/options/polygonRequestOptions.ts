import { UseCacheRequestOptions, TravelRequestOptions } from './../requestOptions';
import { SRID } from '../types'

export interface PolygonRequestOptions extends TravelRequestOptions, UseCacheRequestOptions {
  minPolygonHoleSize?: number
  buffer?: number
  simplify?: number
  srid?: SRID
  travelEdgeWeights: number[]
  quadrantSegments?: number
  intersectionMode?: 'average' | 'union' | 'intersection' | 'none'
  decimalPrecision?: number
}
